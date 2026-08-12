import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

const Facebook = ({ size = 24, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const Twitter = ({ size = 24, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4.01c-1 .49-1.98.68-3 .99-1.12-1.26-2.7-1.5-4.5-1.5-3.21 0-5.74 2.53-5.74 5.74 0 .45.05.89.15 1.3-4.77-.24-9.01-2.52-11.84-5.99-.5.85-.79 1.83-.79 2.89 0 2 1.02 3.76 2.56 4.79-.87-.03-1.69-.27-2.4-.66v.07c0 2.57 1.83 4.7 4.26 5.18-.48.13-1 .2-1.53.2-.37 0-.73-.04-1.09-.11.67 2.1 2.63 3.63 4.95 3.67-1.81 1.42-4.1 2.27-6.58 2.27-.46 0-.91-.03-1.36-.08 2.34 1.5 5.12 2.38 8.1 2.38 9.72 0 15.04-8.05 15.04-15.04 0-.23-.01-.46-.02-.69 1.04-.75 1.94-1.69 2.65-2.76z"></path></svg>
);
const Linkedin = ({ size = 24, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const Instagram = ({ size = 24, color = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const socialIcons = [
  { Icon: Facebook, name: 'Facebook', color: '#1877F2' },
  { Icon: Twitter, name: 'Twitter', color: '#1DA1F2' },
  { Icon: Linkedin, name: 'LinkedIn', color: '#0A66C2' },
  { Icon: Instagram, name: 'Instagram', color: '#E1306C' },
];

export default function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  return (
    <footer style={{ background: '#0F172A', color: 'white', paddingTop: '80px', paddingBottom: '32px' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: '48px', marginBottom: '64px', flexWrap: 'wrap' }}>
          {/* Brand Info */}
          <div style={{ flex: '2', minWidth: '280px' }} data-aos="fade-up" data-aos-delay="0" data-aos-duration="700">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <div style={{ width: '36px', height: '36px', background: 'transparent', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '11px', letterSpacing: '1px' }}>APX</div>
              <span style={{ fontSize: '20px', fontWeight: '800', color: 'white' }}>Apxcore digital</span>
            </div>
            <p style={{ color: '#9CA3AF', lineHeight: '1.6', marginBottom: '32px', maxWidth: '320px' }}>
              Building tomorrow's software today with innovative solutions that drive real business results.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              {socialIcons.map(({ Icon, name, color }, i) => {
                const isHovered = hoveredIcon === i;
                return (
                  <div
                    key={name}
                    onMouseEnter={() => setHoveredIcon(i)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    aria-label={name}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: isHovered ? color : 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transform: isHovered ? 'translateY(-4px) scale(1.1)' : 'translateY(0) scale(1)',
                      boxShadow: isHovered ? `0 8px 16px -4px ${color}66` : 'none',
                      transition: 'background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
                    }}
                    data-aos="zoom-in"
                    data-aos-delay={150 + i * 80}
                    data-aos-duration="500"
                  >
                    <Icon size={16} color="white" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ flex: '1', minWidth: '150px' }} data-aos="fade-up" data-aos-delay="100" data-aos-duration="700">
            <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '24px', letterSpacing: '1px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Our Services', path: '/services' },
                { label: 'Contact Us', path: '/contact' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} style={{ color: '#9CA3AF', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    <ChevronRight size={14} color="var(--primary)" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div style={{ flex: '1.5', minWidth: '200px' }} data-aos="fade-up" data-aos-delay="200" data-aos-duration="700">
            <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '24px', letterSpacing: '1px' }}>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={18} color="var(--primary)" style={{ marginTop: '2px' }} />
                <span style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: '1.5' }}>201, Wakwella Road, Galle,<br />Sri Lanka</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={18} color="var(--primary)" />
                <span style={{ color: '#9CA3AF', fontSize: '14px' }}>+94 767354673</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={18} color="var(--primary)" />
                <span style={{ color: '#9CA3AF', fontSize: '14px' }}>info@Apxcore.com</span>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div style={{ flex: '1.5', minWidth: '250px' }} data-aos="fade-up" data-aos-delay="300" data-aos-duration="700">
            <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '24px', letterSpacing: '1px' }}>Subscribe</h4>
            <p style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>
              Stay updated with our latest news and insights.
            </p>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your email address" style={{ padding: '14px 16px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.05)', color: 'white', fontSize: '14px', outline: 'none' }} />
              <button style={{ padding: '14px 16px', borderRadius: '6px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>Subscribe Now</button>
            </form>
          </div>
        </div>

        <div
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="600"
        >
          <p style={{ fontSize: '14px', color: '#9CA3AF' }}>© 2026 Apxcore digital. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ fontSize: '14px', color: '#9CA3AF', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: '14px', color: '#9CA3AF', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}