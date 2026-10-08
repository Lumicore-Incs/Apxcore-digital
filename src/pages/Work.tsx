import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Work.css';

type Project = {
  number: string;
  title: string;
  category: string;
  sector: string;
  image: string;
  summary: string;
  capabilities: string[];
  year: string;
  duration: string;
  stack: string[];
  results: { value: string; label: string }[];
};

/* NOTE: year / duration / stack / results are sample values.
   Replace them with the real project details. */
const projects: Project[] = [
  {
    number: '01',
    title: 'Enterprise cloud migration for a FinTech leader',
    category: 'Cloud',
    sector: 'Financial technology',
    image: '/images/192b4757d41ea10387e87f5bc6ee469db879fe1a.jpg',
    summary:
      'A cloud migration focused on moving financial technology systems toward a more scalable, resilient foundation.',
    capabilities: ['Cloud architecture', 'Migration planning', 'Platform engineering'],
    year: '2025',
    duration: '9 months',
    stack: ['AWS', 'Kubernetes', 'Terraform', 'PostgreSQL'],
    results: [
      { value: '99.9%', label: 'Uptime' },
      { value: '40%', label: 'Lower infra cost' },
      { value: '3x', label: 'Faster releases' },
    ],
  },
  {
    number: '02',
    title: 'AI-powered analytics platform for healthcare',
    category: 'AI & ML',
    sector: 'Healthcare',
    image: '/images/006b739ae39b2b74a5c22be4c3abd55244fbbacc.jpg',
    summary:
      'An analytics experience designed to bring healthcare data and AI-assisted insights into a clear, useful workspace.',
    capabilities: ['AI product engineering', 'Data visualization', 'Experience design'],
    year: '2025',
    duration: '7 months',
    stack: ['Python', 'React', 'TensorFlow', 'GCP'],
    results: [
      { value: '60%', label: 'Faster reporting' },
      { value: '12', label: 'Data sources unified' },
      { value: '94%', label: 'Model accuracy' },
    ],
  },
  {
    number: '03',
    title: 'Cross-platform mobile app with 2M+ users',
    category: 'Mobile',
    sector: 'Consumer technology',
    image: '/images/fae2cb8e8e86945bfd9afb88e1b2eb6ddbaf0af6.jpg',
    summary:
      'A cross-platform mobile product built to serve a large, growing user base with a consistent experience across devices.',
    capabilities: ['Mobile app development', 'Cross-platform delivery', 'Product experience'],
    year: '2024',
    duration: '10 months',
    stack: ['React Native', 'TypeScript', 'Node.js', 'Firebase'],
    results: [
      { value: '2M+', label: 'Active users' },
      { value: '4.7', label: 'Store rating' },
      { value: '1', label: 'Shared codebase' },
    ],
  },
    {
    number: '01',
    title: 'Enterprise cloud migration for a FinTech leader',
    category: 'Cloud',
    sector: 'Financial technology',
    image: '/images/192b4757d41ea10387e87f5bc6ee469db879fe1a.jpg',
    summary:
      'A cloud migration focused on moving financial technology systems toward a more scalable, resilient foundation.',
    capabilities: ['Cloud architecture', 'Migration planning', 'Platform engineering'],
    year: '2025',
    duration: '9 months',
    stack: ['AWS', 'Kubernetes', 'Terraform', 'PostgreSQL'],
    results: [
      { value: '99.9%', label: 'Uptime' },
      { value: '40%', label: 'Lower infra cost' },
      { value: '3x', label: 'Faster releases' },
    ],
  },
  {
    number: '02',
    title: 'AI-powered analytics platform for healthcare',
    category: 'AI & ML',
    sector: 'Healthcare',
    image: '/images/006b739ae39b2b74a5c22be4c3abd55244fbbacc.jpg',
    summary:
      'An analytics experience designed to bring healthcare data and AI-assisted insights into a clear, useful workspace.',
    capabilities: ['AI product engineering', 'Data visualization', 'Experience design'],
    year: '2025',
    duration: '7 months',
    stack: ['Python', 'React', 'TensorFlow', 'GCP'],
    results: [
      { value: '60%', label: 'Faster reporting' },
      { value: '12', label: 'Data sources unified' },
      { value: '94%', label: 'Model accuracy' },
    ],
  },
  {
    number: '03',
    title: 'Cross-platform mobile app with 2M+ users',
    category: 'Mobile',
    sector: 'Consumer technology',
    image: '/images/fae2cb8e8e86945bfd9afb88e1b2eb6ddbaf0af6.jpg',
    summary:
      'A cross-platform mobile product built to serve a large, growing user base with a consistent experience across devices.',
    capabilities: ['Mobile app development', 'Cross-platform delivery', 'Product experience'],
    year: '2024',
    duration: '10 months',
    stack: ['React Native', 'TypeScript', 'Node.js', 'Firebase'],
    results: [
      { value: '2M+', label: 'Active users' },
      { value: '4.7', label: 'Store rating' },
      { value: '1', label: 'Shared codebase' },
    ],
  },
];

/* ---- Hall geometry (px, world units) ---- */
const FIRST_Z = 900; // distance of the first frame from the entrance
const SPACING = 1000; // distance between frames along the hall
const END_PAD = 1100; // empty hall after the last frame
const BACK_PAD = 1400; // hall behind the camera (so side walls fill the screen)
const STOP_DISTANCE = 650; // how far from the last frame the camera stops

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function Work() {
  const walkRef = useRef<HTMLElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [current, setCurrent] = useState(0); // frame nearest to the camera
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const count = projects.length;
  const lastZ = FIRST_Z + (count - 1) * SPACING;
  const hallDepth = lastZ + END_PAD;
  const hallLength = hallDepth + BACK_PAD;
  const walkDistance = lastZ - STOP_DISTANCE;
  const scrollLength = Math.round(walkDistance * 1.25);

  const activeProject = activeIndex === null ? null : projects[activeIndex];

  const openProject = (index: number) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setActiveIndex(index);
  };

  const closeProject = useCallback(() => {
    setActiveIndex(null);
    lastFocus.current?.focus?.();
  }, []);

  const stepProject = useCallback(
    (delta: number) => {
      setActiveIndex((index) => (index === null ? index : (index + delta + count) % count));
    },
    [count],
  );

  /* ---- Scroll -> camera walk (smoothed) + mouse look ---- */
  useEffect(() => {
    const section = walkRef.current;
    if (!section) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let target = 0;
    let progress = 0;
    let lookTargetX = 0;
    let lookTargetY = 0;
    let lookX = 0;
    let lookY = 0;
    let lastIndex = -1;
    let frame = 0;
    let wrote = false;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      target = distance > 0 ? clamp(-rect.top / distance) : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reduceMotion || event.pointerType === 'touch') return;
      lookTargetX = (event.clientX / window.innerWidth - 0.5) * 2 * 2.6;
      lookTargetY = -(event.clientY / window.innerHeight - 0.5) * 2 * 1.5;
    };

    const tick = () => {
      progress += (target - progress) * (reduceMotion ? 1 : 0.085);
      lookX += (lookTargetX - lookX) * 0.06;
      lookY += (lookTargetY - lookY) * 0.06;
      if (Math.abs(target - progress) < 0.0004) progress = target;

      const moving =
        Math.abs(target - progress) > 0 || Math.abs(lookTargetX - lookX) > 0.01 || Math.abs(lookTargetY - lookY) > 0.01;

      if (moving || !wrote) {
        section.style.setProperty('--walk', progress.toFixed(5));
        section.style.setProperty('--look-x', `${lookX.toFixed(3)}deg`);
        section.style.setProperty('--look-y', `${lookY.toFixed(3)}deg`);
        wrote = true;

        const position = progress * walkDistance;
        const index = clamp(Math.round((position + STOP_DISTANCE - FIRST_Z) / SPACING), 0, count - 1);
        if (index !== lastIndex) {
          lastIndex = index;
          setCurrent(index);
        }
      }
      frame = requestAnimationFrame(tick);
    };

    measure();
    progress = target;
    tick();

    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    section.addEventListener('pointermove', onPointerMove);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      section.removeEventListener('pointermove', onPointerMove);
    };
  }, [walkDistance, count]);

  /* ---- Modal: lock scroll, keyboard, focus ---- */
  useEffect(() => {
    if (activeIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeProject();
      if (event.key === 'ArrowRight') stepProject(1);
      if (event.key === 'ArrowLeft') stepProject(-1);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [activeIndex === null, closeProject, stepProject]); // eslint-disable-line react-hooks/exhaustive-deps

  const hallVars = {
    height: `calc(100svh + ${scrollLength}px)`,
    '--walk-distance': `${walkDistance}px`,
    '--hall-depth': `${hallDepth}px`,
    '--hall-len': `${hallLength}px`,
    '--hall-zc': `${(BACK_PAD - hallDepth) / 2}px`,
  } as CSSProperties;

  return (
    <div className="work-page">
      {/* ------------------------------ Intro ------------------------------ */}
      <section className="work-intro">
        <div className="work-intro-grid" aria-hidden="true" />
        <div className="work-intro-content">
          <div className="work-eyebrow"><span /> APXCORE DIGITAL / SELECTED WORK</div>
          <h1>Made to move<br /><em>business forward.</em></h1>
          <div className="work-intro-bottom">
            <p>Step inside a collection of digital products, platforms, and experiences built for what comes next.</p>
            <a className="work-enter-link" href="#project-hall">
              <span className="work-enter-icon"><ArrowDown size={17} /></span>
              <span>Enter the gallery</span>
            </a>
          </div>
        </div>
        <div className="work-intro-index" aria-hidden="true">01 / {String(count).padStart(2, '0')}</div>
      </section>

      {/* ------------------------------ 3D Hall ------------------------------ */}
      <section className="work-walk" id="project-hall" ref={walkRef} style={hallVars} aria-label="Selected projects gallery">
        <div className="work-hall-stage">
          <div className="work-hall-camera" aria-hidden={false}>
            <div className="work-hall-world">
              {/* architecture */}
              <div className="work-hall-plane work-hall-wall is-left" aria-hidden="true" />
              <div className="work-hall-plane work-hall-wall is-right" aria-hidden="true" />
              <div className="work-hall-plane work-hall-floor" aria-hidden="true" />
              <div className="work-hall-plane work-hall-ceiling" aria-hidden="true" />
              <div className="work-hall-plane work-hall-back" aria-hidden="true">
                <div className="work-hall-door">
                  <span>APXCORE<br />PROJECT ARCHIVE</span>
                </div>
              </div>

              {/* frames hanging in the hall */}
              {projects.map((project, index) => (
                <div
                  className={`work-frame-anchor ${index % 2 === 0 ? 'on-left' : 'on-right'} ${current === index ? 'is-active' : ''}`}
                  key={project.number}
                  style={{ '--fz': `${-(FIRST_Z + index * SPACING)}px` } as CSSProperties}
                >
                  <span className="work-frame-glow" aria-hidden="true" />
                  <button
                    className="work-frame"
                    type="button"
                    onClick={() => openProject(index)}
                    aria-label={`View project: ${project.title}`}
                  >
                    <span className="work-frame-edge">
                      <span className="work-frame-mat">
                        <span className="work-frame-image-wrap">
                          <img src={project.image} alt="" className="work-frame-image" draggable={false} />
                          <span className="work-frame-open"><ArrowUpRight size={18} /></span>
                        </span>
                        <span className="work-frame-caption">
                          <span className="work-frame-meta"><span>{project.number}</span><span>{project.category}</span></span>
                          <span className="work-frame-title">{project.title}</span>
                          <span className="work-frame-view">View project <ArrowUpRight size={13} /></span>
                        </span>
                      </span>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="work-hall-vignette" aria-hidden="true" />

          <div className="work-hall-heading">
            <span>The project hall</span>
            <span className="work-hall-counter">Scroll to walk <ArrowDown size={13} /></span>
          </div>

          <div className="work-hall-hud">
            <div className="work-hall-hud-info" aria-live="polite">
              <span className="work-hall-hud-count">{projects[current].number} / {String(count).padStart(2, '0')}</span>
              <span className="work-hall-hud-title">{projects[current].title}</span>
            </div>
            <button className="work-hall-hud-open" type="button" onClick={() => openProject(current)}>
              View project <ArrowUpRight size={15} />
            </button>
            <div className="work-hall-progress" aria-hidden="true"><span /></div>
          </div>
        </div>
      </section>

      {/* ------------------------------ Outro ------------------------------ */}
      <section className="work-outro">
        <div className="work-outro-copy">
          <div className="work-eyebrow"><span /> HAVE A GOOD ONE IN MIND?</div>
          <h2>Let's build your<br /><em>next big thing.</em></h2>
        </div>
        <Link className="work-contact-link" to="/contact">Start a conversation <ArrowRight size={17} /></Link>
        <Link className="work-back-link" to="/"> <ArrowLeft size={15} /> Back to home</Link>
      </section>

      {/* ------------------------------ Project modal ------------------------------ */}
      {activeProject && (
        <div
          className="work-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeProject();
          }}
        >
          <section
            className="work-project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-modal-title"
            key={activeProject.number}
          >
            <div className="work-modal-media">
              <img src={activeProject.image} alt={`${activeProject.category} project`} />
              <div className="work-modal-media-shade" />
              <span className="work-modal-number">Project {activeProject.number}</span>
              <span className="work-modal-category">{activeProject.category}</span>
            </div>

            <div className="work-modal-body">
              <div className="work-modal-topbar">
                <span className="work-modal-sector"><i />{activeProject.sector}</span>
                <button
                  className="work-modal-close"
                  type="button"
                  ref={closeButtonRef}
                  onClick={closeProject}
                  aria-label="Close project details"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <h2 id="work-modal-title">{activeProject.title}</h2>
              <p className="work-modal-summary">{activeProject.summary}</p>

              <div className="work-modal-metrics">
                {activeProject.results.map((result) => (
                  <div key={result.label}>
                    <strong>{result.value}</strong>
                    <span>{result.label}</span>
                  </div>
                ))}
              </div>

              <div className="work-modal-block">
                <span className="work-modal-label">Capabilities</span>
                <div className="work-modal-chips">
                  {activeProject.capabilities.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>

              <div className="work-modal-block">
                <span className="work-modal-label">Built with</span>
                <div className="work-modal-chips is-stack">
                  {activeProject.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>

              <div className="work-modal-facts">
                <span>{activeProject.year}</span>
                <span>{activeProject.duration}</span>
              </div>

              <div className="work-modal-footer">
                <div className="work-modal-nav">
                  <button type="button" onClick={() => stepProject(-1)} aria-label="Previous project"><ChevronLeft size={18} /></button>
                  <span>{activeProject.number} / {String(count).padStart(2, '0')}</span>
                  <button type="button" onClick={() => stepProject(1)} aria-label="Next project"><ChevronRight size={18} /></button>
                </div>
                <Link to="/contact" onClick={() => setActiveIndex(null)}>
                  Discuss a project <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}