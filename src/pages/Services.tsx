import { User, Code, Lightbulb, TrendingUp, FileText, Cpu, Zap, Megaphone, Headphones, Shield, ChevronRight } from 'lucide-react';

const allServices = [
  { icon: <User size={24} />, title: 'Business Collaboration', desc: 'We build seamless collaboration platforms that connect teams, streamline workflows, and accelerate business growth.' },
  { icon: <Code size={24} />, title: 'Engineering & Services', desc: 'End-to-end engineering solutions designed to solve complex technical challenges with precision and scale.' },
  { icon: <Lightbulb size={24} />, title: 'Creative Minds', desc: 'Innovative thinking meets technical expertise to craft digital experiences that captivate and convert.' },
  { icon: <TrendingUp size={24} />, title: 'Revenue Generation', desc: 'Data-driven strategies and smart automation tools that directly impact your bottom line and growth.' },
  { icon: <FileText size={24} />, title: 'Content Strategy', desc: 'Craft compelling narratives that engage your audience and drive measurable results.' },
  { icon: <Cpu size={24} />, title: 'Technology Consulting', desc: 'Leverage the latest tech stack to build robust, scalable, and future-proof solutions.' },
  { icon: <Zap size={24} />, title: 'High Performance Systems', desc: 'Optimized systems engineered for speed, reliability, and exceptional user experience.' },
  { icon: <Megaphone size={24} />, title: 'Media Marketing', desc: 'Strategic digital marketing campaigns that amplify your brand across all channels.' },
  { icon: <Headphones size={24} />, title: 'Customer Support', desc: 'Dedicated support systems ensuring your clients always receive world-class assistance.' },
  { icon: <Shield size={24} />, title: 'Network Protection', desc: 'Enterprise-grade cybersecurity solutions that safeguard your data and infrastructure.' },
];

export default function Services() {
  return (
    <>
      {/* Page Header */}
      <section style={{ background: 'var(--bg-gradient)', padding: '80px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '12px' }}>What We Offer</div>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Our <span style={{ color: 'var(--primary)' }}>Services</span></h1>
          <p style={{ fontSize: '18px', color: 'var(--text-body)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Comprehensive technology solutions designed to help your business thrive in the digital era.
          </p>
        </div>
      </section>

      {/* All Services Grid */}
      <section style={{ padding: '96px 0', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {allServices.map((service, idx) => (
              <div key={idx} className="service-card" style={{ padding: '32px 24px', background: 'white', borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', cursor: 'pointer' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '24px' }}>
                  {service.icon}
                </div>
                <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>{service.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>{service.desc}</p>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px', color: 'white' }}>Ready to Get Started?</h2>
          <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Let's discuss how we can help transform your business with our solutions.
          </p>
          <button style={{ backgroundColor: 'white', color: 'var(--primary)', padding: '14px 32px', borderRadius: '6px', border: 'none', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
            Contact Us Today
          </button>
        </div>
      </section>
    </>
  );
}
