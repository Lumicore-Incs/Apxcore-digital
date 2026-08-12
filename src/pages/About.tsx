'use client';

import { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Target, Eye, Award, Lightbulb, Shield } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import './About.css';

type Milestone = {
  year: string;
  title: string;
  desc: string;
  side: 'left' | 'right';
};

const milestones: Milestone[] = [
  { year: '2025', title: 'Innovation Hub', desc: 'Launched R&D center focusing on next-generation technologies', side: 'right' },
  { year: '2024', title: 'Industry Recognition', desc: 'Awarded "Best Software Development Company" by Tech Innovation Awards', side: 'left' },
  { year: '2022', title: 'Global Expansion', desc: 'Opened offices in 5 countries, serving clients across 3 continents', side: 'right' },
  { year: '2020', title: 'AI Division Launch', desc: 'Expanded services to include AI and machine learning solutions', side: 'left' },
  { year: '2018', title: 'First Major Client', desc: 'Secured partnership with Fortune 500 company, delivering cloud migration solutions', side: 'right' },
  { year: '2017', title: 'Company Founded', desc: 'Apxcore digital was established with a vision to revolutionize software development', side: 'left' },
];

const team = [
  {
    name: 'Michael Chen', role: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years in software development. Former CTO at Fortune 500 companies.',
    skills: [{ label: 'Strategic Planning', pct: 95 }, { label: 'Business Development', pct: 90 }, { label: 'Team Leadership', pct: 98 }],
  },
  {
    name: 'Sarah Williams', role: 'CTO',
    bio: 'Tech innovator specializing in cloud architecture and AI systems. Computer Science.',
    skills: [{ label: 'Cloud Architecture', pct: 98 }, { label: 'AI & Machine Learning', pct: 92 }, { label: 'System Design', pct: 96 }],
  },
  {
    name: 'David Rodriguez', role: 'Lead Developer',
    bio: 'Full-stack expert with passion for clean code and scalable solutions. Open-source contributor.',
    skills: [{ label: 'Full-Stack Development', pct: 94 }, { label: 'DevOps & CI/CD', pct: 88 }, { label: 'Code Architecture', pct: 91 }],
  },
  {
    name: 'Emily Taylor', role: 'UX/UI Designer',
    bio: 'Award-winning designer creating intuitive experiences. Specialized in design systems and user research.',
    skills: [{ label: 'UX/UX Design', pct: 97 }, { label: 'User Research', pct: 89 }, { label: 'Design Systems', pct: 93 }],
  },
];

const clientDots = [
  { top: '38%', left: '12%' },
  { top: '28%', left: '21%' },
  { top: '30%', left: '48%' },
  { top: '28%', left: '72%' },
  { top: '55%', left: '55%' },
  { top: '68%', left: '80%' },
];

/* ── Small animated wrappers ──────────────────────── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={`anim-fade-up${inView ? ' in-view' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function FadeLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={`anim-fade-left${inView ? ' in-view' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function FadeRight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={`anim-fade-right${inView ? ' in-view' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function ScaleIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={`anim-scale-in${inView ? ' in-view' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ── Milestone item with zoom-pop + bounce-dot ──── */
function MilestoneItem({ m, idx }: { m: typeof milestones[0]; idx: number }) {
  const { ref, inView } = useInView();
  const delay = `${idx * 0.12}s`;

  const cardStyle: React.CSSProperties = {
    background: '#FFFFFF',
    border: '2px solid rgba(0, 95, 170, 0.2)',
    borderRadius: '16px',
    padding: '26px',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08)',
  };

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className="timeline-row"
      style={{ marginBottom: idx < milestones.length - 1 ? '48px' : 0 }}
    >
      {m.side === 'left' ? (
        <>
          {/* Card left */}
          <div className="timeline-card-left">
            <div
              className={`milestone-card${inView ? ' animate' : ''}`}
              style={{ ...cardStyle, textAlign: 'right', animationDelay: delay }}
            >
              <div style={{ fontSize: '30px', fontWeight: '700', color: '#005FAA', marginBottom: '8px' }}>{m.year}</div>
              <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>{m.title}</h4>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.5' }}>{m.desc}</p>
            </div>
          </div>
          {/* Dot */}
          <div
            className={`milestone-dot${inView ? ' animate' : ''}`}
            style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#005FAA', border: '4px solid #FFFFFF', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.15)', flexShrink: 0, zIndex: 1, position: 'absolute', left: '50%', animationDelay: `calc(${delay} + 0.18s)` }}
          />
          {/* Empty right */}
          <div className="timeline-empty" />
        </>
      ) : (
        <>
          {/* Empty left */}
          <div className="timeline-empty" />
          {/* Dot */}
          <div
            className={`milestone-dot${inView ? ' animate' : ''}`}
            style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#14B8A6', border: '4px solid #FFFFFF', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.15)', flexShrink: 0, zIndex: 1, position: 'absolute', left: '50%', animationDelay: `calc(${delay} + 0.18s)` }}
          />
          {/* Card right */}
          <div className="timeline-card-right">
            <div
              className={`milestone-card${inView ? ' animate' : ''}`}
              style={{ ...cardStyle, animationDelay: delay }}
            >
              <div style={{ fontSize: '30px', fontWeight: '700', color: '#14B8A6', marginBottom: '8px' }}>{m.year}</div>
              <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>{m.title}</h4>
              <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.5' }}>{m.desc}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      offset: 120,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });

    // Recalculate AOS positions after any layout-shifting content
    // (fonts, images, the map data-URI) settles in.
    const refresh = () => AOS.refresh();
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 600);
    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 50%, #ECFEFF 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(103% 380% at 0.14% 0.51%, rgba(0, 95, 170, 0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <FadeUp>
            <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px', color: '#4B5563' }}>
              <span>Home</span>
              <span>/</span>
              <span style={{ fontWeight: '500', color: '#111827' }}>About Us</span>
            </nav>
            <h1 className="hero-title">
              About Apxcore digital
            </h1>
            <p className="hero-subtitle">
              Pioneering the future of software development with innovation, expertise, and dedication
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ background: '#FFFFFF', padding: '64px 0' }}>
        <div className="container">
          <div className="stats-grid">
            {[
              { value: '58+', label: 'Projects Completed', color: '#005FAA', bg: 'linear-gradient(135deg, #EFF6FF 0%, #ECFEFF 100%)', border: 'rgba(0, 95, 170, 0.2)' },
              { value: '58+',  label: 'Happy Clients',      color: '#14B8A6', bg: 'linear-gradient(135deg, #ECFEFF 0%, #EFF6FF 100%)', border: 'rgba(20, 184, 166, 0.2)' },
              { value: '14+',  label: 'Tech Experts',       color: '#0891B2', bg: 'linear-gradient(135deg, #F0FDFA 0%, #ECFEFF 100%)', border: 'rgba(8, 145, 178, 0.2)' },
              { value: '02+',   label: 'Years Experience',   color: '#005FAA', bg: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDFA 100%)', border: 'rgba(0, 95, 170, 0.2)' },
            ].map((stat, idx) => (
              <ScaleIn key={idx} delay={idx * 0.1}>
                <div style={{ background: stat.bg, border: `2px solid ${stat.border}`, borderRadius: '16px', padding: '34px', textAlign: 'center', height: '100%' }}>
                  <div style={{ fontSize: '48px', fontWeight: '700', color: stat.color, lineHeight: '1', marginBottom: '8px' }}>{stat.value}</div>
                  <div style={{ fontSize: '16px', fontWeight: '500', color: '#4B5563' }}>{stat.label}</div>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Company Milestones Timeline — 3D cylindrical drum scroll effect */}
      <section style={{ background: '#F9FAFB', padding: '80px 0' }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div style={{ color: '#005FAA', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px' }}>OUR JOURNEY</div>
              <h2 style={{ fontSize: '48px', fontWeight: '700', color: '#111827' }}>Company Milestones</h2>
            </div>
          </FadeUp>

          {/* Timeline */}
          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
            {/* Vertical line – alternating blue/teal gradient */}
            <div className="timeline-line" />

            {milestones.map((m, idx) => (
              <MilestoneItem key={idx} m={m} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Meet The Experts */}
      <section style={{ background: '#FFFFFF', padding: '80px 0' }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div style={{ color: '#005FAA', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px' }}>OUR TEAM</div>
              <h2 style={{ fontSize: '48px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>Meet The Experts</h2>
              <p style={{ fontSize: '18px', color: '#4B5563', maxWidth: '600px', margin: '0 auto' }}>Talented professionals dedicated to bringing your vision to life</p>
            </div>
          </FadeUp>
          <div className="team-grid">
            {team.map((member, idx) => (
              <FadeUp key={idx} delay={idx * 0.1}>
                <div style={{ background: '#005FAA', borderRadius: '16px', padding: '28px', color: 'white', height: '100%' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px', color: 'white' }}>{member.name}</h3>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>{member.role}</div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6', marginBottom: '24px' }}>{member.bio}</p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>Expertise:</div>
                    {member.skills.map((skill, sIdx) => (
                      <div key={sIdx} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.9)', marginBottom: '4px' }}>
                          <span>{skill.label}</span>
                          <span>{skill.pct}%</span>
                        </div>
                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                          <div style={{ height: '100%', width: `${skill.pct}%`, background: 'rgba(255,255,255,0.9)', borderRadius: '2px' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Our Client Locations — interactive expandable markers */}
      <section style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #ECFEFF 100%)', padding: '80px 0' }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ color: '#005FAA', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px' }}>GLOBAL PRESENCE</div>
              <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#111827' }}>Our Client Locations</h2>
            </div>
          </FadeUp>
          <ScaleIn>
            <div style={{ background: 'white', borderRadius: '24px', padding: '48px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
              {/* World map image */}
              <img src="/images/download.jpg" alt="World Map" style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.85 }} />

              {/* Client location dots */}
              <div style={{ position: 'absolute', inset: '48px' }}>
                {clientDots.map((dot, idx) => (
                  <div key={idx} style={{ position: 'absolute', top: dot.top, left: dot.left, transform: 'translate(-50%, -50%)' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#005FAA', border: '3px solid white', boxShadow: '0 0 0 3px rgba(0,95,170,0.3)', animation: 'pulse-dot 2s ease-in-out infinite', animationDelay: `${idx * 0.3}s` }} />
                  </div>
                ))}
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* What Drives Us — Values */}
      <section style={{ background: '#F9FAFB', padding: '80px 0' }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div style={{ color: '#005FAA', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px' }}>OUR VALUES</div>
              <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#111827' }}>What Drives Us</h2>
            </div>
          </FadeUp>
          <div className="values-grid">
            {[
              { icon: <Lightbulb size={28} />, title: 'Innovation', desc: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions that keep our clients ahead of the curve.' },
              { icon: <Shield size={28} />, title: 'Integrity', desc: 'We build trust through transparency, honesty, and ethical practices in every project and relationship we cultivate.' },
              { icon: <Award size={28} />, title: 'Excellence', desc: 'We are committed to delivering the highest quality in everything we do, exceeding expectations and setting new standards.' },
            ].map((val, idx) => (
              <FadeUp key={idx} delay={idx * 0.12}>
                <div style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04)', height: '100%' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, #EFF6FF 0%, #ECFEFF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#005FAA', marginBottom: '20px' }}>
                    {val.icon}
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>{val.title}</h3>
                  <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6' }}>{val.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="mission-vision-container">
            <FadeLeft>
              <div style={{ flex: '0 0 340px', height: '340px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                <img src="/images/7ff81a9acd0149ff739fee5049089c14294b1d49.jpg" alt="Our Mission" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </FadeLeft>
            <FadeRight>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ borderLeft: '4px solid #005FAA', paddingLeft: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#005FAA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                      <Target size={18} />
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#111827' }}>Our Mission</h3>
                  </div>
                  <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                    To empower businesses with cutting-edge software solutions that drive innovation, efficiency, and growth. We are committed to delivering excellence through technology and creating lasting value for our clients.
                  </p>
                </div>
                <div style={{ borderLeft: '4px solid #14B8A6', paddingLeft: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#14B8A6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                      <Eye size={18} />
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#111827' }}>Our Vision</h3>
                  </div>
                  <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                    To be the leading software development company recognized globally for innovation, quality, and transformative digital solutions that shape the future of technology and business.
                  </p>
                </div>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>
    </>
  );
}