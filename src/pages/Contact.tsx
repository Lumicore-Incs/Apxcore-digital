import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you shortly.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      {/* Page Header */}
      <section style={{ background: 'var(--bg-gradient)', padding: '80px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '12px' }}>Get In Touch</div>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Contact <span style={{ color: 'var(--primary)' }}>Us</span></h1>
          <p style={{ fontSize: '18px', color: 'var(--text-body)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Have a project in mind? Let's talk! We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section style={{ padding: '96px 0', background: 'white' }}>
        <div className="container" style={{ display: 'flex', gap: '64px' }}>
          {/* Contact Info */}
          <div style={{ flex: '1' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Let's Start a Conversation</h2>
            <p style={{ fontSize: '16px', color: 'var(--text-body)', marginBottom: '48px', lineHeight: '1.6' }}>
              Whether you have a specific project in mind or just want to explore how we can help, our team is ready to assist.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {[
                { icon: <MapPin size={24} />, title: 'Our Office', info: '171 King St, Melbourne VIC 3000, Australia' },
                { icon: <Phone size={24} />, title: 'Phone', info: '+1 (888) 123-4567' },
                { icon: <Mail size={24} />, title: 'Email', info: 'info@lumicorelabs.com' },
                { icon: <Clock size={24} />, title: 'Business Hours', info: 'Mon - Fri: 9:00 AM - 6:00 PM' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>{item.title}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{item.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ flex: '1' }}>
            <form onSubmit={handleSubmit} style={{ background: 'var(--bg-section)', padding: '40px', borderRadius: '24px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '32px' }}>Send Us a Message</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your full name' },
                  { label: 'Email Address', key: 'email', type: 'email', placeholder: 'your@email.com' },
                  { label: 'Subject', key: 'subject', type: 'text', placeholder: 'How can we help?' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '8px', display: 'block' }}>{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '14px', outline: 'none', boxSizing: 'border-box', background: 'white' }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '8px', display: 'block' }}>Message</label>
                  <textarea
                    placeholder="Tell us about your project..."
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', background: 'white', fontFamily: 'inherit' }}
                  />
                </div>
                <button type="submit" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '14px 28px', borderRadius: '6px', border: 'none', fontWeight: '700', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 95, 170, 0.3)' }}>
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
