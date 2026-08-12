import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaFacebook, FaTiktok, FaYoutube, FaInstagram } from 'react-icons/fa';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Our Services', path: '/services' },
    { label: 'Our Work', path: '/work' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const socialLinks = [
    { icon: FaFacebook, url: '#', label: 'Facebook', color: '#1877F2' },
    { icon: FaTiktok, url: '#', label: 'TikTok', color: '#000000' },
    { icon: FaYoutube, url: '#', label: 'YouTube', color: '#FF0000' },
    { icon: FaInstagram, url: '#', label: 'Instagram', color: '#E1306C' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`navbar ${isOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-box">A</div>
          <span className="logo-text">Apxcore digital</span>
        </Link>

        {/* Desktop Navigation Center */}
        <div className="navbar-center">
          {/* Desktop Navigation Links */}
          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Social Icons */}
          <div className="social-links-desktop">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                  title={social.label}
                  style={{ '--brand-color': social.color } as React.CSSProperties}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-menu-button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`menu-icon-wrap ${isOpen ? 'rotated' : ''}`}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </span>
        </button>

        {/* Mobile Navigation Menu — always mounted so CSS transition can animate open/close */}
        <div className={`mobile-nav ${isOpen ? 'open' : 'closed'}`}>
          {/* Mobile Navigation Links */}
          <div className="mobile-nav-links">
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                style={{ transitionDelay: isOpen ? `${idx * 60}ms` : '0ms' }}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA Button */}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="cta-button-mobile"
              style={{ transitionDelay: isOpen ? `${navLinks.length * 60}ms` : '0ms' }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Social Icons - Bottom */}
          <div className="mobile-social-container">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-icon"
                  aria-label={social.label}
                  title={social.label}
                  style={{
                    '--brand-color': social.color,
                    transitionDelay: isOpen ? `${(navLinks.length + 1 + idx) * 60}ms` : '0ms',
                  } as React.CSSProperties}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}