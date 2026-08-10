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
    { label: 'Our Advantage', path: '/advantage' },
    { label: 'Our Work', path: '/work' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const socialLinks = [
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaTiktok, url: '#', label: 'TikTok' },
    { icon: FaYoutube, url: '#', label: 'YouTube' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
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
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="mobile-nav open">
            {/* Mobile Navigation Links */}
            <div className="mobile-nav-links">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTA Button */}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="cta-button-mobile"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Social Icons - Bottom */}
            <div className="mobile-social-container">
              {socialLinks.map((social) => {
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
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}