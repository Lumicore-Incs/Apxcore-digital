import { useState } from 'react';
import { Mail, Phone, MapPin, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import './Contact.css';

const faqs = [
  {
    q: 'What services does Apxcore digital offer?',
    a: 'We offer comprehensive software solutions including Cloud Solutions, AI & Machine Learning, Mobile Development, and Cybersecurity services tailored to your business needs.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Project timelines vary based on complexity and scope. A typical project can range from 2-6 months. We work closely with you to deliver on time.',
  },
  {
    q: 'Do you provide ongoing support after project completion?',
    a: 'Yes, we offer dedicated post-launch support and maintenance packages to ensure your solution continues to perform at its best.',
  },
  {
    q: 'What industries do you work with?',
    a: 'We work across finance, healthcare, retail, logistics, education, and more — bringing digital transformation to every sector.',
  },
  {
    q: 'How do you ensure project security?',
    a: 'Security is built into every layer of our development process. We follow industry best practices including code reviews, penetration testing, and compliance frameworks.',
  },
];

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
    <div ref={ref as React.Ref<HTMLDivElement>} className={`anim-fade-left${inView ? ' in-view' : ''}`} style={{ transitionDelay: `${delay}s` }}>
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

export default function Contact() {
  const [step, setStep] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [project, setProject] = useState({ type: '', budget: '', desc: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const allFilled = form.name && form.email && form.phone && form.company;

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 50%, #ECFEFF 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(103% 380% at 0.14% 0.51%, rgba(0,95,170,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <FadeUp>
            <nav style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px', color: '#4B5563' }}>
              <span>Home</span><span>/</span>
              <span style={{ fontWeight: '500', color: '#111827' }}>Contact Us</span>
            </nav>
            <h1 className="hero-title">
              Let's Build Something Amazing
            </h1>
            <p className="hero-subtitle">
              Transform your ideas into reality. Our team is ready to discuss your project and provide tailored solutions.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section style={{ background: '#FFFFFF', padding: '48px 0' }}>
        <div className="container">
          <div className="contact-info-grid">
            {[
              {
                icon: <Mail size={28} color="#005FAA" />,
                iconBg: 'rgba(0,95,170,0.2)',
                cardBg: 'linear-gradient(135deg, #EFF6FF 0%, #ECFEFF 100%)',
                border: 'rgba(0,95,170,0.2)',
                title: 'Email Us',
                detail: 'info@apxcoredigital.com',
              },
              {
                icon: <Phone size={28} color="#00A8E8" />,
                iconBg: 'rgba(0,168,232,0.2)',
                cardBg: 'linear-gradient(135deg, #ECFEFF 0%, #EFF6FF 100%)',
                border: 'rgba(0,168,232,0.2)',
                title: 'Call Us',
                detail: '+94 767354673',
              },
              {
                icon: <MapPin size={28} color="#00D4AA" />,
                iconBg: 'rgba(0,212,170,0.2)',
                cardBg: 'linear-gradient(135deg, #F0FDFA 0%, #ECFEFF 100%)',
                border: 'rgba(0,212,170,0.2)',
                title: 'Visit Us',
                detail: '123 Innovation Street\nTech Valley, CA 94025',
              },
            ].map((card, idx) => (
              <FadeUp key={idx} delay={idx * 0.1}>
                <div style={{ background: card.cardBg, border: `1px solid ${card.border}`, borderRadius: '16px', padding: '25px', height: '100%' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    {card.icon}
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>{card.title}</h3>
                  <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{card.detail}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-step Contact Form */}
      <section style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #EFF6FF 100%)', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '848px', margin: '0 auto' }}>
          <ScaleIn>
            <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #E5E7EB', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden' }}>

              {/* Form Header with steps */}
              <div className="form-header" style={{ background: 'linear-gradient(90deg, #005FAA 0%, #00A8E8 100%)' }}>
                {/* Step indicators */}
                <div className="form-step-indicators">
                  {[1, 2, 3].map((s, idx) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '50%',
                        background: step === s ? '#FFFFFF' : 'rgba(0,95,170,0.3)',
                        border: `2px solid ${step >= s ? '#FFFFFF' : 'rgba(255,255,255,0.5)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: '700', fontSize: '18px',
                        color: step === s ? '#005FAA' : '#FFFFFF',
                        flexShrink: 0,
                        transition: 'all 0.3s ease',
                      }}>
                        {s}
                      </div>
                      {idx < 2 && (
                        <div className="form-step-line" style={{ background: step > s ? '#FFFFFF' : 'rgba(255,255,255,0.3)' }} />
                      )}
                    </div>
                  ))}
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'white', textAlign: 'center', marginBottom: '8px' }}>
                  {step === 1 ? 'Contact Information' : step === 2 ? 'Project Details' : 'Review & Submit'}
                </h3>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
                  {step === 1 ? 'Tell us about yourself' : step === 2 ? 'Tell us about your project' : 'Review your information'}
                </p>
              </div>

              {/* Form Body */}
              <div className="form-body">
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {[
                      { name: 'name', label: 'Full Name *', type: 'text' },
                      { name: 'email', label: 'Email Address *', type: 'email' },
                      { name: 'phone', label: 'Phone Number', type: 'tel' },
                      { name: 'company', label: 'Company Name', type: 'text' },
                    ].map(field => (
                      <div key={field.name} style={{ position: 'relative' }}>
                        <input
                          name={field.name}
                          type={field.type}
                          placeholder={field.label}
                          value={form[field.name as keyof typeof form]}
                          onChange={handleChange}
                          style={{
                            width: '100%', height: '60px', padding: '18px', boxSizing: 'border-box',
                            border: '2px solid #D1D5DB', borderRadius: '8px', fontSize: '16px',
                            color: '#111827', outline: 'none', fontFamily: 'inherit',
                            transition: 'border-color 0.2s',
                          }}
                          onFocus={e => e.target.style.borderColor = '#005FAA'}
                          onBlur={e => e.target.style.borderColor = '#D1D5DB'}
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => allFilled && setStep(2)}
                      style={{
                        width: '100%', padding: '16px 32px', borderRadius: '9999px', border: 'none',
                        background: allFilled ? '#005FAA' : '#D1D5DB',
                        color: allFilled ? 'white' : '#6B7280',
                        fontSize: '16px', fontWeight: '600', cursor: allFilled ? 'pointer' : 'default',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        transition: 'background 0.2s',
                      }}
                    >
                      Continue to Project Details <ArrowRight size={18} />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <select
                      value={project.type}
                      onChange={e => setProject(p => ({ ...p, type: e.target.value }))}
                      style={{ width: '100%', height: '60px', padding: '0 18px', border: '2px solid #D1D5DB', borderRadius: '8px', fontSize: '16px', color: project.type ? '#111827' : '#6B7280', outline: 'none', fontFamily: 'inherit', background: 'white' }}
                    >
                      <option value="">Service Type *</option>
                      <option>Cloud Solutions</option>
                      <option>AI & Machine Learning</option>
                      <option>Mobile Development</option>
                      <option>Cybersecurity</option>
                    </select>
                    <select
                      value={project.budget}
                      onChange={e => setProject(p => ({ ...p, budget: e.target.value }))}
                      style={{ width: '100%', height: '60px', padding: '0 18px', border: '2px solid #D1D5DB', borderRadius: '8px', fontSize: '16px', color: project.budget ? '#111827' : '#6B7280', outline: 'none', fontFamily: 'inherit', background: 'white' }}
                    >
                      <option value="">Budget Range *</option>
                      <option>$10K - $50K</option>
                      <option>$50K - $100K</option>
                      <option>$100K - $500K</option>
                      <option>$500K+</option>
                    </select>
                    <textarea
                      placeholder="Project Description *"
                      value={project.desc}
                      onChange={e => setProject(p => ({ ...p, desc: e.target.value }))}
                      rows={4}
                      style={{ width: '100%', padding: '18px', border: '2px solid #D1D5DB', borderRadius: '8px', fontSize: '16px', color: '#111827', outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = '#005FAA'}
                      onBlur={e => e.target.style.borderColor = '#D1D5DB'}
                    />
                    <div className="form-buttons">
                      <button onClick={() => setStep(1)} style={{ padding: '16px', borderRadius: '9999px', border: '2px solid #D1D5DB', background: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', color: '#4B5563' }}>
                        Back
                      </button>
                      <button className="primary-btn" onClick={() => project.type && project.budget && project.desc && setStep(3)} style={{ padding: '16px 32px', borderRadius: '9999px', border: 'none', background: '#005FAA', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        Review & Submit <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '24px' }}>
                      <h4 style={{ fontWeight: '700', color: '#111827', marginBottom: '16px' }}>Contact Information</h4>
                      {[['Full Name', form.name], ['Email', form.email], ['Phone', form.phone], ['Company', form.company]].map(([l, v]) => (
                        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E5E7EB', fontSize: '15px' }}>
                          <span style={{ color: '#6B7280' }}>{l}</span>
                          <span style={{ color: '#111827', fontWeight: '500' }}>{v || '—'}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '24px' }}>
                      <h4 style={{ fontWeight: '700', color: '#111827', marginBottom: '16px' }}>Project Details</h4>
                      {[['Service Type', project.type], ['Budget', project.budget], ['Description', project.desc]].map(([l, v]) => (
                        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E5E7EB', fontSize: '15px', gap: '16px' }}>
                          <span style={{ color: '#6B7280', flexShrink: 0 }}>{l}</span>
                          <span style={{ color: '#111827', fontWeight: '500', textAlign: 'right' }}>{v || '—'}</span>
                        </div>
                      ))}
                    </div>
                    <div className="form-buttons">
                      <button onClick={() => setStep(2)} style={{ padding: '16px', borderRadius: '9999px', border: '2px solid #D1D5DB', background: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', color: '#4B5563' }}>
                        Back
                      </button>
                      <button className="primary-btn" onClick={() => { alert("Thank you! We'll be in touch soon."); setStep(1); setForm({ name: '', email: '', phone: '', company: '' }); setProject({ type: '', budget: '', desc: '' }); }} style={{ padding: '16px 32px', borderRadius: '9999px', border: 'none', background: '#005FAA', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                        Submit Request ✓
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ background: '#FFFFFF', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '848px', margin: '0 auto' }}>
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div style={{ color: '#005FAA', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px' }}>FAQ</div>
              <h2 style={{ fontSize: '48px', fontWeight: '700', color: '#111827' }}>Frequently Asked Questions</h2>
            </div>
          </FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => (
              <FadeUp key={idx} delay={idx * 0.07}>
                <div style={{ background: '#F9FAFB', border: '2px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{ width: '100%', padding: '24px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', textAlign: 'left' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <ChevronRight size={20} color="#4B5563" />
                      </div>
                      <span style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>{faq.q}</span>
                    </div>
                    <ChevronDown size={24} color="#4B5563" style={{ flexShrink: 0, transform: openFaq === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>
                  {openFaq === idx && (
                    <div style={{ padding: '0 24px 24px 80px' }}>
                      <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ background: '#F9FAFB', padding: '80px 0' }}>
        <div className="container">
          <FadeLeft>
            <div className="map-container" style={{ background: 'white', borderRadius: '24px', border: '1px solid #E5E7EB', overflow: 'hidden', position: 'relative', height: '400px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-122.1000%2C37.3700%2C-122.0500%2C37.4000&layer=mapnik&marker=37.3861%2C-122.0839"
                width="100%" height="100%" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy"
                title="Office Location"
              />
              {/* Office Hours Card */}
              <div className="office-hours-card">
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>Office Hours</h4>
                <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '4px' }}>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '16px' }}>Saturday - Sunday: Closed</p>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ color: '#005FAA', fontWeight: '600', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Get Directions <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </FadeLeft>
        </div>
      </section>
    </>
  );
}
