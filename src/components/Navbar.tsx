import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Our Services', path: '/services' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav style={{ borderBottom: '1px solid #E5E7EB', padding: '20px 0', background: 'white', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary-light)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>L</div>
          <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)' }}>Lumicore Labs</span>
        </Link>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', fontSize: '14px', fontWeight: '600', color: '#4B5563' }}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-dark)',
                textDecoration: 'none',
                fontWeight: location.pathname === link.path ? '700' : '600',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact">
            <button style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '10px 24px', borderRadius: '6px', border: 'none', fontWeight: '700', fontSize: '14px', boxShadow: '0 4px 6px -1px rgba(0, 95, 170, 0.2)', cursor: 'pointer' }}>
              Start a Project
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
