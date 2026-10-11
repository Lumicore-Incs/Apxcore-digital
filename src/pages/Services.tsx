import { useState } from 'react';
import {
  Check, ChevronRight, Layout, Server, Database, Webhook,
  GitBranch, Cloud, Wrench, Rocket, Layers,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import './Services.css';

const categories = ['Cloud', 'AI', 'Mobile', 'Cybersecurity'];

const services: Record<string, {
  title: string;
  desc: string;
  image: string;
  features: string[];
  capabilities: { label: string; pct: number }[];
}> = {
  Cloud: {
    title: 'Cloud Solutions',
    desc: 'Transform your infrastructure with scalable, secure, and cost-effective cloud solutions. We help businesses migrate, optimize, and manage their cloud environments for maximum efficiency.',
    image: '/images/b52ba91ee4a59670eec9f48226e04faa69ab699f.jpg',
    features: [
      'Cloud migration and deployment',
      'Infrastructure optimization',
      '24/7 monitoring and support',
      'Multi-cloud strategy',
      'Auto-scaling architecture',
      'Disaster recovery planning',
    ],
    capabilities: [
      { label: 'Uptime', pct: 99.9 },
      { label: 'Scalability', pct: 98 },
      { label: 'Performance', pct: 96 },
      { label: 'Security', pct: 99 },
    ],
  },
  AI: {
    title: 'AI & Machine Learning',
    desc: 'Harness the power of artificial intelligence and machine learning to automate processes, gain insights, and create intelligent applications that give your business a competitive edge.',
    image: '/images/006b739ae39b2b74a5c22be4c3abd55244fbbacc.jpg',
    features: [
      'Custom ML model development',
      'Natural language processing',
      'Computer vision solutions',
      'Predictive analytics',
      'AI-powered automation',
      'Real-time data processing',
    ],
    capabilities: [
      { label: 'Accuracy', pct: 97 },
      { label: 'Processing Speed', pct: 95 },
      { label: 'Scalability', pct: 98 },
      { label: 'Reliability', pct: 96 },
    ],
  },
  Mobile: {
    title: 'Mobile Development',
    desc: 'Build high-performance, feature-rich mobile applications for iOS and Android that deliver exceptional user experiences and drive business growth across all platforms.',
    image: '/images/fae2cb8e8e86945bfd9afb88e1b2eb6ddbaf0af6.jpg',
    features: [
      'Cross-platform development',
      'Native iOS & Android apps',
      'UI/UX design & prototyping',
      'API integration',
      'Push notifications & analytics',
      'App store optimization',
    ],
    capabilities: [
      { label: 'Performance', pct: 97 },
      { label: 'User Experience', pct: 99 },
      { label: 'Compatibility', pct: 96 },
      { label: 'Security', pct: 98 },
    ],
  },
  Cybersecurity: {
    title: 'Cybersecurity',
    desc: 'Protect your business with enterprise-grade cybersecurity solutions. Our comprehensive security services safeguard your data, systems, and reputation from evolving threats.',
    image: '/images/cb14388fbf0a9d2210df55b49a503fa243a18b39.jpg',
    features: [
      'Vulnerability assessment & pen testing',
      'Security operations center (SOC)',
      'Identity & access management',
      'Endpoint protection',
      'Compliance & risk management',
      'Incident response planning',
    ],
    capabilities: [
      { label: 'Threat Detection', pct: 99 },
      { label: 'Response Time', pct: 97 },
      { label: 'Coverage', pct: 98 },
      { label: 'Compliance', pct: 99 },
    ],
  },
};

/* ── Technology Stack data ────────────────────────── */
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons';
const dv = (name: string, variant = 'original') => `${DEVICON}/${name}/${name}-${variant}.svg`;

type Tech = { name: string; icon?: string; fallback?: LucideIcon };

type TechCategory = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  from: string;
  to: string;
  items: Tech[];
};

const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    subtitle: 'Fast, responsive & beautiful user interfaces',
    icon: Layout,
    from: '#005FAA',
    to: '#00A8CC',
    items: [
      { name: 'React.js', icon: dv('react') },
      { name: 'JavaScript', icon: dv('javascript') },
      { name: 'TypeScript', icon: dv('typescript') },
      { name: 'HTML5', icon: dv('html5') },
      { name: 'CSS3', icon: dv('css3') },
      { name: 'Tailwind CSS', icon: dv('tailwindcss') },
      { name: 'Bootstrap', icon: dv('bootstrap') },
      { name: 'Vite', icon: dv('vitejs') },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    subtitle: 'Robust, secure & scalable server-side systems',
    icon: Server,
    from: '#16A34A',
    to: '#65A30D',
    items: [
      { name: 'Java', icon: dv('java') },
      { name: 'Spring Boot', icon: dv('spring') },
      { name: 'Spring MVC', icon: dv('spring') },
      { name: 'Spring Security', icon: dv('spring') },
      { name: 'Hibernate', icon: dv('hibernate') },
      { name: 'JPA', icon: dv('hibernate'), fallback: Layers },
      { name: 'Node.js', icon: dv('nodejs') },
      { name: 'Express.js', icon: dv('express') },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    subtitle: 'Reliable data storage for every workload',
    icon: Database,
    from: '#7C3AED',
    to: '#C026D3',
    items: [
      { name: 'MySQL', icon: dv('mysql') },
      { name: 'PostgreSQL', icon: dv('postgresql') },
      { name: 'MongoDB', icon: dv('mongodb') },
      { name: 'Oracle Database', icon: dv('oracle') },
    ],
  },
  {
    id: 'api',
    title: 'API Development & Testing',
    subtitle: 'Well-designed, documented & thoroughly tested APIs',
    icon: Webhook,
    from: '#EA580C',
    to: '#F59E0B',
    items: [
      { name: 'REST API', fallback: Webhook },
      { name: 'Postman', icon: dv('postman') },
      { name: 'Swagger / OpenAPI', icon: dv('swagger') },
    ],
  },
  {
    id: 'vcs',
    title: 'Version Control',
    subtitle: 'Collaborative, traceable code management',
    icon: GitBranch,
    from: '#DC2626',
    to: '#F43F5E',
    items: [
      { name: 'Git', icon: dv('git') },
      { name: 'GitHub', icon: dv('github') },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Platforms',
    subtitle: 'Cloud hosting and infrastructure',
    icon: Cloud,
    from: '#0284C7',
    to: '#6366F1',
    items: [
      { name: 'AWS', icon: dv('amazonwebservices', 'plain-wordmark') },
      { name: 'Microsoft Azure', icon: dv('azure') },
      { name: 'Google Cloud', icon: dv('googlecloud') },
    ],
  },
  {
    id: 'tools',
    title: 'Development Tools',
    subtitle: 'IDEs and development productivity',
    icon: Wrench,
    from: '#0F766E',
    to: '#14B8A6',
    items: [
      { name: 'IntelliJ IDEA', icon: dv('intellij') },
      { name: 'Antigravity', fallback: Rocket },
      { name: 'VS Code', icon: dv('vscode') },
      { name: 'Spring Tool Suite', icon: dv('spring') },
      { name: 'Maven', icon: dv('maven') },
      { name: 'npm', icon: dv('npm', 'original-wordmark') },
    ],
  },
];

const processSteps = [
  { num: 1, title: 'Discovery & Planning', desc: 'We begin by understanding your business goals, challenges, and requirements to create a comprehensive project roadmap.', img: '/images/74cd7f91c2a7285383560b540aa61b38cc6b9c75.jpg' },
  { num: 2, title: 'Design & Architecture', desc: 'Our team designs intuitive interfaces and robust system architecture that ensures scalability and performance.', img: '/images/d68aee4acfd9e45796e67a511617ad24143711a6.jpg' },
  { num: 3, title: 'Development & Testing', desc: 'We build your solution using agile methodologies with continuous testing to ensure quality and reliability.', img: '/images/07cd21bb70577c5d7c5be10011baf3de451f2254.jpg' },
  { num: 4, title: 'Deployment & Support', desc: 'We deploy your solution seamlessly and provide ongoing support to ensure optimal performance and user satisfaction.', img: '/images/18f7c427d268f0b9cb3a9ff32b15652036271b2d.jpg' },
];

/* ── Tech icon with graceful fallback ─────────────── */
function TechIcon({ tech, color }: { tech: Tech; color: string }) {
  const [failed, setFailed] = useState(false);
  const Fallback = tech.fallback;

  if (tech.icon && !failed) {
    return (
      <img
        src={tech.icon}
        alt={tech.name}
        loading="lazy"
        width={26}
        height={26}
        onError={() => setFailed(true)}
        style={{ width: 26, height: 26, objectFit: 'contain' }}
      />
    );
  }
  if (Fallback) return <Fallback size={22} color={color} strokeWidth={2} />;
  return <span style={{ fontWeight: 700, fontSize: 14, color }}>{tech.name.charAt(0)}</span>;
}

/* ── Animation wrappers ───────────────────────────── */
function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={`anim-fade-up${inView ? ' in-view' : ''}`} style={{ transitionDelay: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function FadeLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={`anim-fade-left${inView ? ' in-view' : ''}`} style={{ transitionDelay: `${delay}s`, flex: 1 }}>
      {children}
    </div>
  );
}

function FadeRight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={`anim-fade-right${inView ? ' in-view' : ''}`} style={{ transitionDelay: `${delay}s`, flex: 1 }}>
      {children}
    </div>
  );
}

function ScaleIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={`anim-scale-in${inView ? ' in-view' : ''}`} style={{ transitionDelay: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/* ── Styles for the tech stack section ────────────── */
const techStackCSS = `
.ts-section {
  position: relative;
  overflow: hidden;
  padding: 96px 0;
  background:
    radial-gradient(60% 50% at 10% 0%, rgba(0,95,170,0.07) 0%, transparent 70%),
    radial-gradient(50% 50% at 100% 100%, rgba(0,168,204,0.08) 0%, transparent 70%),
    #F9FAFB;
}
.ts-eyebrow {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 9999px;
  background: rgba(0,95,170,0.08);
  color: #005FAA;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.ts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 24px;
}
.ts-card {
  position: relative;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(8px);
  border: 1px solid #E5E7EB;
  border-radius: 24px;
  padding: 28px;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  overflow: hidden;
}
.ts-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--from), var(--to));
  opacity: 0.9;
}
.ts-card::after {
  content: '';
  position: absolute;
  top: -80px; right: -80px;
  width: 200px; height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--from) 0%, transparent 70%);
  opacity: 0.06;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.ts-card:hover {
  transform: translateY(-6px);
  border-color: transparent;
  box-shadow: 0 24px 48px -12px rgba(15,23,42,0.18);
}
.ts-card:hover::after { opacity: 0.14; }
.ts-card-head {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.ts-card-icon {
  width: 52px; height: 52px;
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, var(--from), var(--to));
  box-shadow: 0 8px 20px -6px var(--from);
  flex-shrink: 0;
}
.ts-card-title {
  font-size: 19px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 2px;
  line-height: 1.3;
}
.ts-card-sub {
  font-size: 13.5px;
  color: #6B7280;
  margin: 0;
  line-height: 1.5;
}
.ts-count {
  margin-left: auto;
  font-size: 12px;
  font-weight: 700;
  color: var(--from);
  background: color-mix(in srgb, var(--from) 10%, white);
  padding: 4px 10px;
  border-radius: 9999px;
  flex-shrink: 0;
}
.ts-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.ts-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px 8px 10px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 9999px;
  font-size: 14.5px;
  font-weight: 600;
  color: #1F2937;
  cursor: default;
  transition: all 0.2s ease;
}
.ts-chip-icon {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: #F3F4F6;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: background 0.2s ease;
}
.ts-chip:hover {
  transform: translateY(-2px);
  border-color: var(--from);
  box-shadow: 0 8px 18px -8px var(--from);
  color: var(--from);
}
.ts-chip:hover .ts-chip-icon { background: color-mix(in srgb, var(--from) 12%, white); }
@media (max-width: 480px) {
  .ts-grid { grid-template-columns: 1fr; }
  .ts-card { padding: 22px; }
  .ts-count { display: none; }
}
`;

export default function Services() {
  const [activeTab, setActiveTab] = useState('Cloud');
  const svc = services[activeTab];

  return (
    <>
      <style>{techStackCSS}</style>

      {/* Hero Section */}
      <section className="hero-section" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 50%, #ECFEFF 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(106% 290% at 0.14% 0.38%, rgba(0,95,170,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeUp>
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px', color: '#4B5563' }}>
              <span>Home</span><span>/</span>
              <span style={{ fontWeight: '500', color: '#111827' }}>Our Services</span>
            </nav>

            {/* Title */}
            <h1 className="hero-title">
              Our Services
            </h1>
            <p className="hero-subtitle">
              Comprehensive software solutions designed to transform your business and drive digital innovation
            </p>
          </FadeUp>

          {/* Category Filter Tabs */}
          <FadeUp delay={0.15}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="category-tabs">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    style={{
                      padding: '12px 32px',
                      borderRadius: '9999px',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: activeTab === cat ? '#005FAA' : 'transparent',
                      color: activeTab === cat ? '#FFFFFF' : '#4B5563',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Service Detail Section */}
      <section style={{ background: '#FFFFFF', padding: '64px 0' }}>
        <div className="container">
          <div className="service-detail-container">
            {/* Image */}
            <FadeLeft>
              <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', aspectRatio: '4/3' }}>
                <img
                  src={svc.image}
                  alt={svc.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
                />
              </div>
            </FadeLeft>

            {/* Content */}
            <FadeRight delay={0.1}>
              <div>
                <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>{svc.title}</h2>
                <p style={{ fontSize: '18px', color: '#4B5563', lineHeight: '1.7', marginBottom: '32px' }}>{svc.desc}</p>

                {/* Key Features */}
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>Key Features</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {svc.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#005FAA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={14} color="white" strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: '16px', color: '#4B5563' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Service Capabilities */}
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>Service Capabilities</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                  {svc.capabilities.map((cap, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>{cap.label}</span>
                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#005FAA' }}>{cap.pct}%</span>
                      </div>
                      <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${cap.pct}%`, background: 'linear-gradient(90deg, #005FAA 0%, #00A8CC 100%)', borderRadius: '9999px' }} />
                      </div>
                    </div>
                  ))}
                </div>

                <button style={{ background: '#005FAA', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '9999px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Request a Demo <ChevronRight size={18} />
                </button>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="ts-section">
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="ts-eyebrow">Our Toolbox</span>
              <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>Technology Stack</h2>
              <p style={{ fontSize: '18px', color: '#4B5563', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
                Modern, battle-tested technologies we use to design, build and ship reliable software.
              </p>
            </div>
          </FadeUp>

          <div className="ts-grid">
            {techCategories.map((cat, idx) => {
              const CatIcon = cat.icon;
              return (
                <ScaleIn key={cat.id} delay={idx * 0.07} style={{ height: '100%' }}>
                  <div
                    className="ts-card"
                    style={{ ['--from' as string]: cat.from, ['--to' as string]: cat.to } as React.CSSProperties}
                  >
                    <div className="ts-card-head">
                      <div className="ts-card-icon">
                        <CatIcon size={24} color="white" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="ts-card-title">{cat.title}</h3>
                        <p className="ts-card-sub">{cat.subtitle}</p>
                      </div>
                      <span className="ts-count">{cat.items.length}</span>
                    </div>

                    <div className="ts-chips">
                      {cat.items.map(tech => (
                        <div key={tech.name} className="ts-chip">
                          <span className="ts-chip-icon">
                            <TechIcon tech={tech} color={cat.from} />
                          </span>
                          {tech.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </ScaleIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section style={{ background: '#FFFFFF', padding: '80px 0' }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div style={{ color: '#005FAA', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '12px' }}>OUR PROCESS</div>
              <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#111827' }}>How We Work</h2>
            </div>
          </FadeUp>
          <div className="process-steps-container">
            {processSteps.map((step, idx) => (
              <FadeUp key={step.num} delay={idx * 0.1}>
                <div className="process-step">
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#005FAA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '18px', flexShrink: 0 }}>
                    {step.num}
                  </div>
                  <div className="process-step-content">
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>{step.title}</h3>
                    <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.6' }}>{step.desc}</p>
                  </div>
                  <div className="process-step-img" style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <img src={step.img} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}