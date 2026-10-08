import { useEffect, useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';
import './HandMagic.css';

type Gesture = 'WAITING' | 'OPEN' | 'PINCH' | 'INDEX' | 'TWO' | 'FIST' | 'HAND';

type Landmark = { x: number; y: number; z: number };

type HandResults = { multiHandLandmarks?: Landmark[][] };

type MediaPipeHands = {
  setOptions: (options: {
    maxNumHands: number;
    modelComplexity: number;
    minDetectionConfidence: number;
    minTrackingConfidence: number;
  }) => void;
  onResults: (callback: (results: HandResults) => void) => void;
  send: (input: { image: HTMLVideoElement }) => Promise<void>;
  close: () => void;
};

declare global {
  interface Window {
    Hands?: new (options: { locateFile: (file: string) => string }) => MediaPipeHands;
  }
}

type HandMagicProps = { onClose: () => void };

type HandFrame = {
  landmarks: Landmark[];
  palm: { x: number; y: number };
  gesture: Gesture;
};

let handsLibraryPromise: Promise<void> | undefined;

function loadHandsLibrary() {
  if (window.Hands) return Promise.resolve();
  if (handsLibraryPromise) return handsLibraryPromise;

  handsLibraryPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js';
    script.async = true;
    script.onload = () => window.Hands ? resolve() : reject(new Error('Hand tracking could not be initialized.'));
    script.onerror = () => reject(new Error('Hand tracking could not be loaded. Check your internet connection.'));
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    handsLibraryPromise = undefined;
    throw error;
  });

  return handsLibraryPromise;
}

const connections: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8],
  [0, 9], [9, 10], [10, 11], [11, 12], [0, 13], [13, 14], [14, 15],
  [15, 16], [0, 17], [17, 18], [18, 19], [19, 20], [5, 9], [9, 13], [13, 17],
];

const gestureCopy: Record<Gesture, { name: string; description: string }> = {
  WAITING: { name: 'Waiting for hand', description: 'Place your hand in front of the camera' },
  OPEN: { name: 'Portal open', description: 'Your palm is bending the energy field' },
  PINCH: { name: 'Energy charge', description: 'Hold the pinch to compress the field' },
  INDEX: { name: 'Arcane drawing', description: 'Move your index finger through space' },
  TWO: { name: 'Dual rings', description: 'Move your hand up or down to scroll the page' },
  FIST: { name: 'Impact', description: 'Release the stored energy' },
  HAND: { name: 'Hand detected', description: 'Move your hand to manipulate the field' },
};

function distance(first: Landmark, second: Landmark) {
  return Math.hypot(first.x - second.x, first.y - second.y);
}

function isFingerExtended(points: Landmark[], tip: number, pip: number) {
  return distance(points[tip], points[0]) > distance(points[pip], points[0]) * 1.15;
}

function detectGesture(points: Landmark[]): Gesture {
  const index = isFingerExtended(points, 8, 6);
  const middle = isFingerExtended(points, 12, 10);
  const ring = isFingerExtended(points, 16, 14);
  const pinky = isFingerExtended(points, 20, 18);

  if (distance(points[4], points[8]) < 0.055) return 'PINCH';
  if (index && middle && ring && pinky) return 'OPEN';
  if (index && middle && !ring && !pinky) return 'TWO';
  if (index && !middle && !ring && !pinky) return 'INDEX';
  if (!index && !middle && !ring && !pinky) return 'FIST';
  return 'HAND';
}

export default function HandMagic({ onClose }: HandMagicProps) {
  const [started, setStarted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [status, setStatus] = useState('CAMERA OFF');
  const [gesture, setGesture] = useState<Gesture>('WAITING');
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<HandFrame | null>(null);
  const gestureRef = useRef<Gesture>('WAITING');
  const previousPalmYRef = useRef<number | null>(null);

  useEffect(() => {
    if (!started) return undefined;

    let disposed = false;
    let tracker: MediaPipeHands | undefined;
    let animationFrame = 0;
    let processing = false;
    let lastSend = 0;

    const startCamera = async () => {
      try {
        setStatus('REQUESTING CAMERA');
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        });
        if (disposed) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        const video = videoRef.current;
        if (!video) throw new Error('Camera preview is unavailable.');
        video.srcObject = stream;
        await video.play();

        setStatus('LOADING TRACKER');
        await loadHandsLibrary();
        if (disposed || !window.Hands) return;

        tracker = new window.Hands({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });
        tracker.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.65,
          minTrackingConfidence: 0.65,
        });
        tracker.onResults((results) => {
          const points = results.multiHandLandmarks?.[0];
          if (!points) {
            frameRef.current = null;
            previousPalmYRef.current = null;
            if (gestureRef.current !== 'WAITING') {
              gestureRef.current = 'WAITING';
              setGesture('WAITING');
            }
            document.documentElement.classList.remove('hand-magic-scroll-active');
            setStatus('SEARCHING FOR HAND');
            return;
          }

          const width = window.innerWidth;
          const height = window.innerHeight;
          const palm = {
            x: ((1 - points[0].x) + (1 - points[5].x) + (1 - points[9].x) + (1 - points[13].x) + (1 - points[17].x)) * width / 5,
            y: (points[0].y + points[5].y + points[9].y + points[13].y + points[17].y) * height / 5,
          };
          const nextGesture = detectGesture(points);
          frameRef.current = { landmarks: points, palm, gesture: nextGesture };
          setStatus('HAND TRACKING');

          if (gestureRef.current !== nextGesture) {
            gestureRef.current = nextGesture;
            setGesture(nextGesture);
          }

          if (nextGesture === 'TWO') {
            document.documentElement.classList.add('hand-magic-scroll-active');
            if (previousPalmYRef.current !== null) {
              const movement = palm.y - previousPalmYRef.current;
              if (Math.abs(movement) > 0.8) {
                const scrollRoot = document.scrollingElement;
                if (scrollRoot) scrollRoot.scrollTop += movement * 4;
                else window.scrollBy(0, movement * 4);
              }
            }
            previousPalmYRef.current = palm.y;
          } else {
            previousPalmYRef.current = null;
            document.documentElement.classList.remove('hand-magic-scroll-active');
          }
        });
        setStatus('SEARCHING FOR HAND');

        const render = (now: number) => {
          if (disposed) return;
          const canvas = canvasRef.current;
          const context = canvas?.getContext('2d');
          if (canvas && context) {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const width = window.innerWidth;
            const height = window.innerHeight;
            if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
              canvas.width = width * dpr;
              canvas.height = height * dpr;
              canvas.style.width = `${width}px`;
              canvas.style.height = `${height}px`;
            }
            context.setTransform(dpr, 0, 0, dpr, 0, 0);
            const current = frameRef.current;
            context.fillStyle = `rgba(2, 3, 5, ${current?.gesture === 'TWO' ? 0.045 : 0.2})`;
            context.fillRect(0, 0, width, height);

            const centerX = current?.palm.x ?? width / 2;
            const centerY = current?.palm.y ?? height / 2;
            const ambient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.45);
            ambient.addColorStop(0, 'rgba(0, 255, 200, 0.045)');
            ambient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            context.fillStyle = ambient;
            context.fillRect(0, 0, width, height);

            for (let index = 0; index < 180; index += 1) {
              const angle = index * 2.399 + now * 0.00004;
              const radius = 35 + (index * 67 % Math.max(100, Math.min(width, height) * 0.48));
              const x = centerX + Math.cos(angle) * radius;
              const y = centerY + Math.sin(angle) * radius;
              context.beginPath();
              context.arc(x, y, index % 5 === 0 ? 1.4 : 0.8, 0, Math.PI * 2);
              context.fillStyle = `rgba(91, 255, 224, ${0.12 + (index % 7) * 0.035})`;
              context.fill();
            }

            if (current) {
              const pulse = 1 + Math.sin(now * 0.003) * 0.06;
              const radius = current.gesture === 'OPEN' ? 155 : current.gesture === 'PINCH' ? 70 : 105;
              context.save();
              context.translate(centerX, centerY);
              context.rotate(now * 0.00015);
              for (let ring = 0; ring < 3; ring += 1) {
                context.beginPath();
                context.arc(0, 0, radius * pulse + ring * 16, now * 0.0007 + ring, now * 0.0007 + Math.PI * 1.65 + ring);
                context.strokeStyle = `rgba(50, 255, 220, ${0.2 - ring * 0.04})`;
                context.lineWidth = 1.5;
                context.stroke();
              }
              context.restore();

              if (current.gesture === 'TWO') {
                for (const offset of [-58, 58]) {
                  context.beginPath();
                  context.ellipse(centerX + offset, centerY, 54 * pulse, 23 * pulse, now * 0.001, 0, Math.PI * 2);
                  context.strokeStyle = 'rgba(73, 255, 224, 0.55)';
                  context.lineWidth = 1.5;
                  context.stroke();
                }
              }

              context.beginPath();
              context.arc(centerX, centerY, 23 * pulse, 0, Math.PI * 2);
              const core = context.createRadialGradient(centerX - 6, centerY - 6, 1, centerX, centerY, 28 * pulse);
              core.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
              core.addColorStop(0.3, 'rgba(130, 255, 235, 0.65)');
              core.addColorStop(1, 'rgba(0, 255, 200, 0)');
              context.fillStyle = core;
              context.fill();

              context.beginPath();
              for (const [first, second] of connections) {
                const pointA = current.landmarks[first];
                const pointB = current.landmarks[second];
                context.moveTo((1 - pointA.x) * width, pointA.y * height);
                context.lineTo((1 - pointB.x) * width, pointB.y * height);
              }
              context.strokeStyle = 'rgba(100, 255, 230, 0.14)';
              context.lineWidth = 1;
              context.stroke();

              for (const point of current.landmarks) {
                context.beginPath();
                context.arc((1 - point.x) * width, point.y * height, 1.8, 0, Math.PI * 2);
                context.fillStyle = 'rgba(140, 255, 240, 0.25)';
                context.fill();
              }
            }
          }

          if (!disposed && tracker && videoRef.current?.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA && !processing && now - lastSend > 55) {
            processing = true;
            lastSend = now;
            void tracker.send({ image: videoRef.current }).catch((sendError: unknown) => {
              if (!disposed) setError(sendError instanceof Error ? sendError.message : 'Hand tracking stopped unexpectedly.');
            }).finally(() => { processing = false; });
          }
          animationFrame = window.requestAnimationFrame(render);
        };
        animationFrame = window.requestAnimationFrame(render);
      } catch (cameraError) {
        if (!disposed) {
          streamRef.current?.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
          if (videoRef.current) videoRef.current.srcObject = null;
          setError(cameraError instanceof Error ? cameraError.message : 'Camera access was not available.');
          setStatus('CAMERA ERROR');
        }
      }
    };

    void startCamera();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      tracker?.close();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      document.documentElement.classList.remove('hand-magic-scroll-active');
    };
  }, [started, retryCount]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  const retry = () => {
    setError('');
    setRetryCount((count) => count + 1);
  };

  return (
    <div className={`hand-magic${gesture === 'TWO' ? ' is-scrolling' : ''}`}>
      <video ref={videoRef} className="hand-magic-source" autoPlay muted playsInline />
      <canvas ref={canvasRef} className="hand-magic-canvas" />

      <header className="hand-magic-topbar">
        <div className="hand-magic-brand">
          <span className="hand-magic-mark" aria-hidden="true">✦</span>
          <span><strong>APXCORE</strong><small>AI HAND MODE</small></span>
        </div>
        <div className={`hand-magic-status${status === 'HAND TRACKING' ? ' ready' : ''}`}>
          <span className="hand-magic-status-dot" />{status}
        </div>
        <button type="button" className="hand-magic-close" onClick={onClose} aria-label="Close AI hand mode" title="Close AI hand mode">
          <X size={20} />
        </button>
      </header>

      <section className={`hand-magic-hero${gesture !== 'WAITING' ? ' has-hand' : ''}`} aria-live="polite">
        <div className="hand-magic-eyebrow">MOVE YOUR HANDS</div>
        <h1>Shape the<br />energy.</h1>
        <p>Your hands are the interface.<br />Shape the energy. Bend the particles. Open the portal.</p>
      </section>

      <div className="hand-magic-gesture" aria-live="polite">
        <div className="hand-magic-kicker">CURRENT GESTURE</div>
        <strong>{gestureCopy[gesture].name}</strong>
        <p>{gestureCopy[gesture].description}</p>
      </div>

      <aside className="hand-magic-instructions" aria-label="Hand gesture instructions">
        <div><span>Open palm — Portal</span><kbd>✋</kbd></div>
        <div><span>Pinch — Charge</span><kbd>🤏</kbd></div>
        <div><span>Index — Draw</span><kbd>☝</kbd></div>
        <div><span>Fist — Explosion</span><kbd>✊</kbd></div>
        <div><span>Two fingers — Dual rings / Scroll</span><kbd>✌</kbd></div>
      </aside>

      <div className="hand-magic-camera">
        <video className="hand-magic-preview" autoPlay muted playsInline ref={(preview) => {
          if (preview && streamRef.current && preview.srcObject !== streamRef.current) preview.srcObject = streamRef.current;
        }} />
        <span className="hand-magic-camera-label"><Camera size={11} /> LIVE TRACKING</span>
        <span className="hand-magic-camera-frame" />
      </div>

      {error && (
        <div className="hand-magic-error" role="alert">
          <p>{error}</p>
          <button type="button" onClick={retry}>Try again</button>
        </div>
      )}

      {!started && (
        <div className="hand-magic-dialog-backdrop">
          <section className="hand-magic-dialog" role="dialog" aria-modal="true" aria-labelledby="hand-magic-title">
            <div className="hand-magic-dialog-icon"><Camera size={21} /></div>
            <div className="hand-magic-kicker">BEFORE YOU BEGIN</div>
            <h2 id="hand-magic-title">Your hands, in control.</h2>
            <p className="hand-magic-dialog-copy">Allow camera access to start hand tracking. Video is processed in your browser and is not recorded.</p>
            <div className="hand-magic-dialog-instructions">
              <div><span>Open palm</span><b>Portal</b></div>
              <div><span>Pinch</span><b>Charge</b></div>
              <div><span>Index finger</span><b>Draw</b></div>
              <div><span>Fist</span><b>Explosion</b></div>
              <div><span>Two fingers</span><b>Dual rings + scroll</b></div>
            </div>
            <div className="hand-magic-dialog-actions">
              <button type="button" className="hand-magic-cancel" onClick={onClose}>Cancel</button>
              <button type="button" className="hand-magic-start" onClick={() => { setError(''); setStarted(true); }}>OK, start camera</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}