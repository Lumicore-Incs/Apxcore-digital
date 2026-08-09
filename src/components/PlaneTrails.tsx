import { useEffect, useRef } from 'react';

export default function PlaneTrails() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const planeRef = useRef<SVGSVGElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const stage = stageRef.current!;
    const canvas = canvasRef.current!;
    const planeSVG = planeRef.current!;
    if (!stage || !canvas || !planeSVG) return;

    const ctx = canvas.getContext('2d')!;

    function resize() {
      canvas.width = stage.clientWidth;
      canvas.height = stage.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const PLANE_WIDTH = 300;
    const PLANE_HEIGHT = 250;

    let px = stage.clientWidth * 0.82;
    let py = stage.clientHeight * 0.18;
    let tx = px, ty = py;
    let vx = 0, vy = 0;
    let rot = 0;
    let spinVelocity = 0;
    let spinDirection = 1;

    const particles: { x:number,y:number,vx:number,vy:number,life:number }[] = [];
    const engineOffsets = [ { dx: 0, dy: 25 }, { dx: -75, dy: 40 }, { dx: 76, dy: 40 } ];

    function getEnginePositions(rad: number) {
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const sx = PLANE_WIDTH / 800;
      const sy = PLANE_HEIGHT / 600;
      const pts: {x:number,y:number}[] = [];
      for (let i=0;i<engineOffsets.length;i++){
        const dxPx = engineOffsets[i].dx * sx;
        const dyPx = engineOffsets[i].dy * sy;
        const rdx = dxPx * cos - dyPx * sin;
        const rdy = dxPx * sin + dyPx * cos;
        pts.push({ x: px + rdx, y: py + rdy });
      }
      return pts;
    }

    function spawnParticle(x:number,y:number,angle:number,speed:number){
      particles.push({ x,y, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, life: 1 });
    }

    function handleMove(clientX:number, clientY:number){
      const rect = stage.getBoundingClientRect();
      tx = clientX - rect.left;
      ty = clientY - rect.top;
      tx = Math.min(stage.clientWidth, Math.max(0, tx));
      ty = Math.min(stage.clientHeight, Math.max(0, ty));
    }

    function onMouseMove(e:MouseEvent){ handleMove(e.clientX, e.clientY); }
    function onTouchMove(e:TouchEvent){ e.preventDefault(); const t = e.touches[0]; if (t) handleMove(t.clientX,t.clientY); }
    function onTouchStart(e:TouchEvent){ const t = e.touches[0]; if (t) handleMove(t.clientX,t.clientY); }

    stage.addEventListener('mousemove', onMouseMove);
    stage.addEventListener('touchmove', onTouchMove as EventListener, { passive: false } as any);
    stage.addEventListener('touchstart', onTouchStart as EventListener, { passive: true } as any);

    function handleClick(){
      spinDirection *= -1;
      const spinAmount = (Math.PI + Math.random()*Math.PI) * spinDirection;
      spinVelocity += spinAmount * 0.3;
    }
    planeSVG.addEventListener('click', handleClick);
    planeSVG.addEventListener('touchstart', (e: TouchEvent) => { e.preventDefault(); handleClick(); }, { passive: false } as any);

    let lastTime = performance.now();

    function loop(now:number){
      const dt = Math.min((now - lastTime)/16.6, 3);
      lastTime = now;

      px += (tx - px) * 0.12 * dt;
      py += (ty - py) * 0.12 * dt;

      const newVx = tx - px;
      const newVy = ty - py;
      vx = vx * 0.8 + newVx * 0.2;
      vy = vy * 0.8 + newVy * 0.2;

      const bankTarget = Math.max(-35, Math.min(35, vx * 1.2));
      const bankRad = bankTarget * Math.PI / 180;

      spinVelocity *= 0.96;
      if (Math.abs(spinVelocity) < 0.001) spinVelocity = 0;
      rot += spinVelocity * dt * 0.5;

      if (Math.abs(spinVelocity) < 0.05){ const diff = bankRad - rot; rot += diff * 0.08 * dt; }

      planeSVG.style.width = PLANE_WIDTH + 'px';
      planeSVG.style.height = PLANE_HEIGHT + 'px';
      planeSVG.style.transform = `translate(${px - PLANE_WIDTH/2}px, ${py - PLANE_HEIGHT/2}px) rotate(${rot * 180 / Math.PI}deg)`;

      const rad = rot;
      const backAngle = rad + Math.PI;
      const enginePoints = getEnginePositions(rad);
      for (let i=0;i<enginePoints.length;i++){
        const pt = enginePoints[i];
        const angleOffset = (Math.random()-0.5)*0.4;
        const ang = backAngle + angleOffset;
        const speed = 0.6 + Math.random()*0.8;
        spawnParticle(pt.x, pt.y, ang, speed);
      }

      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.01 * dt;
        p.life -= 0.012 * dt;
        if (p.life <= 0) { particles.splice(i,1); continue; }
        const radius = 3 * p.life + 0.5;
        ctx.beginPath(); ctx.arc(p.x, p.y, radius, 0, Math.PI*2);
        ctx.fillStyle = `rgba(0,189,253,${p.life * 0.8})`;
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
      if (particles.length > 600) particles.splice(0, particles.length - 600);

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      stage.removeEventListener('mousemove', onMouseMove);
      stage.removeEventListener('touchmove', onTouchMove as EventListener);
      stage.removeEventListener('touchstart', onTouchStart as EventListener);
      planeSVG.removeEventListener('click', handleClick);
      cancelAnimationFrame(rafRef.current || 0);
    };
  }, []);

  return (
    <div ref={stageRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 40 }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      <svg ref={planeRef} id="plane" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'auto' }}>
        <g fill="#00BDFD">
          <circle cx="400" cy="325" r="36" />
          <circle cx="325" cy="340" r="16" />
          <circle cx="476" cy="340" r="16" />
        </g>
        <path fill="#101820" d="M398.4,314.1h-14.1c0.3-2.5,0.7-4.9,1.3-7.2h12.8L398.4,314.1L398.4,314.1z M374.9,314.1h6.1c0.3-2.5,0.7-4.9,1.3-7.2h-4.6C376.6,309.1,375.6,311.5,374.9,314.1z M373.3,306.9c-1.3,2.2-2.4,4.7-3.1,7.2h2.2c0.6-2.5,1.5-5,2.6-7.2H373.3z M401.6,306.9v7.2h14.1c-0.3-2.5-0.8-5-1.3-7.2H401.6z M400,322.5c-4.9,0-8.8,4-8.8,8.8c0,4.9,4,8.8,8.8,8.8c4.9,0,8.8-4,8.8-8.8C408.8,326.5,404.9,322.5,400,322.5z M429.7,314.1c-0.7-2.6-1.8-5-3.1-7.2h-1.7c1.1,2.3,2,4.7,2.6,7.2H429.7z M417.7,306.9c0.5,2.3,1,4.7,1.2,7.2h6.1c-0.7-2.6-1.6-5-2.8-7.2H417.7z M563.9,318.3c0.1,2-0.8,3.9-5.3,4.4l-69.2,7.2c1.8,2.6,2.9,5.7,3.2,9c0.7,9.9-6.8,18.5-16.7,19.2c-9.9,0.7-18.5-6.8-19.2-16.7c-0.2-2.9,0.3-5.7,1.4-8.2l-19.2,2c-0.1,0-0.3,0-0.6,0c-5.3,16-20.4,27.5-38.1,27.5c-17.8,0-32.8-11.5-38.1-27.5c-0.2,0-0.5,0-0.6,0l-19.2-2c1.1,2.5,1.6,5.3,1.4,8.2c-0.7,9.9-9.3,17.4-19.2,16.7c-9.9-0.7-17.4-9.3-16.7-19.2c0.2-3.3,1.4-6.4,3.2-9l-69.2-7.2c-4.5-0.5-5.5-2.4-5.3-4.4c0.1-2,1.3-3.7,5.9-3.6l118,4.3c0.2-2.3,0.6-4.5,1.1-6.7l-20.8-2.2c-2.5-0.3-3.1-1.3-3-2.4c0.1-1.1,0.7-2.1,3.3-2l22.9,0c5.8-12.6,18-21.8,32.4-23.2l1.4-41.2c0.1-3.2,1.4-3.9,2.8-3.9c1.4,0,2.6,0.7,2.8,3.9l1.4,41.2c14.4,1.5,26.6,10.6,32.4,23.2l22.9,0c2.6-0.1,3.2,0.9,3.3,2c0.1,1.1-0.4,2.2-3,2.4l-20.8,2.2c0.6,2.2,1,4.4,1.1,6.7l118-4.3C562.6,314.6,563.7,316.3,563.9,318.3z M336.7,340.9c0.4-6.2-4.2-11.6-10.4-12c-6.2-0.4-11.6,4.2-12,10.5c-0.4,6.2,4.2,11.6,10.4,12C330.9,351.8,336.3,347.1,336.7,340.9z M431.9,322.5c0-17.6-14.3-31.9-31.9-31.9c-17.6,0-31.9,14.3-31.9,31.9c0,17.6,14.3,31.9,31.9,31.9C417.6,354.4,431.9,340.1,431.9,322.5z M485.8,339.3c-0.4-6.2-5.8-10.9-12-10.5c-6.2,0.4-10.9,5.8-10.5,12c0.4,6.2,5.8,10.9,12,10.4C481.5,350.9,486.2,345.5,485.8,339.3z" />
      </svg>
    </div>
  );
}
