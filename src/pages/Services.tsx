import { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';

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

const techStack = [
  { name: 'AWS' }, { name: 'Azure' }, { name: 'Google Cloud' },
  { name: 'Docker' }, { name: 'Kubernetes' }, { name: 'Terraform' },
];

const processSteps = [
  { num: 1, title: 'Discovery & Planning', desc: 'We begin by understanding your business goals, challenges, and requirements to create a comprehensive project roadmap.', img: '/images/74cd7f91c2a7285383560b540aa61b38cc6b9c75.jpg' },
  { num: 2, title: 'Design & Architecture', desc: 'Our team designs intuitive interfaces and robust system architecture that ensures scalability and performance.', img: '/images/d68aee4acfd9e45796e67a511617ad24143711a6.jpg' },
  { num: 3, title: 'Development & Testing', desc: 'We build your solution using agile methodologies with continuous testing to ensure quality and reliability.', img: '/images/07cd21bb70577c5d7c5be10011baf3de451f2254.jpg' },
  { num: 4, title: 'Deployment & Support', desc: 'We deploy your solution seamlessly and provide ongoing support to ensure optimal performance and user satisfaction.', img: '/images/18f7c427d268f0b9cb3a9ff32b15652036271b2d.jpg' },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState('Cloud');
  const svc = services[activeTab];

  return (
    <>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 50%, #ECFEFF 100%)', paddingTop: '128px', paddingBottom: '48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(106% 290% at 0.14% 0.38%, rgba(0,95,170,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px', color: '#4B5563' }}>
            <span>Home</span><span>/</span>
            <span style={{ fontWeight: '500', color: '#111827' }}>Our Services</span>
          </nav>

          {/* Title */}
          <h1 style={{ fontSize: '60px', fontWeight: '700', color: '#005FAA', textAlign: 'center', marginBottom: '24px', lineHeight: '1' }}>
            Our Services
          </h1>
          <p style={{ fontSize: '20px', color: '#4B5563', textAlign: 'center', maxWidth: '768px', margin: '0 auto 48px', lineHeight: '1.6' }}>
            Comprehensive software solutions designed to transform your business and drive digital innovation
          </p>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'inline-flex', background: '#F3F4F6', borderRadius: '9999px', padding: '8px', gap: '4px' }}>
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
        </div>
      </section>

      {/* Service Detail Section */}
      <section style={{ background: '#FFFFFF', padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
            {/* Image */}
            <div style={{ flex: '1', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', aspectRatio: '4/3' }}>
              <img
                src={svc.image}
                alt={svc.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
              />
            </div>

            {/* Content */}
            <div style={{ flex: '1' }}>
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
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section style={{ background: '#F9FAFB', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>Technology Stack</h2>
            <p style={{ fontSize: '18px', color: '#4B5563' }}>Hover to learn more about each technology</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '32px 16px',
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: '18px',
                  color: '#111827',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = '#005FAA';
                  (e.currentTarget as HTMLDivElement).style.color = 'white';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 24px rgba(0,95,170,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = 'white';
                  (e.currentTarget as HTMLDivElement).style.color = '#111827';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                }}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section style={{ background: '#FFFFFF', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ color: '#005FAA', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '12px' }}>OUR PROCESS</div>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#111827' }}>How We Work</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px', margin: '0 auto' }}>
            {processSteps.map((step) => (
              <div key={step.num} style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#005FAA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '18px', flexShrink: 0 }}>
                  {step.num}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
                <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <img src={step.img} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
