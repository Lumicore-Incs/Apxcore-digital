import { Target, Eye, Award, Lightbulb, Shield } from 'lucide-react';

const milestones = [
  { year: '2017', title: 'Company Founded', desc: 'Apxcore digital was established with a vision to revolutionize software development', side: 'left' },
  { year: '2018', title: 'First Major Client', desc: 'Secured partnership with Fortune 500 company, delivering cloud migration solutions', side: 'right' },
  { year: '2020', title: 'AI Division Launch', desc: 'Expanded services to include AI and machine learning solutions', side: 'left' },
  { year: '2022', title: 'Global Expansion', desc: 'Opened offices in 5 countries, serving clients across 3 continents', side: 'right' },
  { year: '2024', title: 'Industry Recognition', desc: 'Awarded "Best Software Development Company" by Tech Innovation Awards', side: 'left' },
  { year: '2025', title: 'Innovation Hub', desc: 'Launched R&D center focusing on next-generation technologies', side: 'right' },
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
  { top: '38%', left: '12%' },  // North America West
  { top: '28%', left: '21%' },  // North America East
  { top: '30%', left: '48%' },  // Europe
  { top: '28%', left: '72%' },  // East Asia
  { top: '55%', left: '55%' },  // Africa/Middle East
  { top: '68%', left: '80%' },  // Australia
];

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 50%, #ECFEFF 100%)', paddingTop: '128px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(103% 380% at 0.14% 0.51%, rgba(0, 95, 170, 0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px', color: '#4B5563' }}>
            <span>Home</span>
            <span>/</span>
            <span style={{ fontWeight: '500', color: '#111827' }}>About Us</span>
          </nav>
          <h1 style={{ fontSize: '60px', fontWeight: '700', color: '#005FAA', marginBottom: '24px', lineHeight: '1' }}>
            About Apxcore digital
          </h1>
          <p style={{ fontSize: '20px', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Pioneering the future of software development with innovation, expertise, and dedication
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ background: '#FFFFFF', padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
            {[
              { value: '150+', label: 'Projects Completed', color: '#005FAA', bg: 'linear-gradient(135deg, #EFF6FF 0%, #ECFEFF 100%)', border: 'rgba(0, 95, 170, 0.2)' },
              { value: '50+',  label: 'Happy Clients',      color: '#14B8A6', bg: 'linear-gradient(135deg, #ECFEFF 0%, #EFF6FF 100%)', border: 'rgba(20, 184, 166, 0.2)' },
              { value: '15+',  label: 'Tech Experts',       color: '#0891B2', bg: 'linear-gradient(135deg, #F0FDFA 0%, #ECFEFF 100%)', border: 'rgba(8, 145, 178, 0.2)' },
              { value: '8+',   label: 'Years Experience',   color: '#005FAA', bg: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDFA 100%)', border: 'rgba(0, 95, 170, 0.2)' },
            ].map((stat, idx) => (
              <div key={idx} style={{ background: stat.bg, border: `2px solid ${stat.border}`, borderRadius: '16px', padding: '34px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', fontWeight: '700', color: stat.color, lineHeight: '1', marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ fontSize: '16px', fontWeight: '500', color: '#4B5563' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Milestones Timeline */}
      <section style={{ background: '#F9FAFB', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ color: '#005FAA', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px' }}>OUR JOURNEY</div>
            <h2 style={{ fontSize: '48px', fontWeight: '700', color: '#111827' }}>Company Milestones</h2>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '4px', transform: 'translateX(-50%)', background: 'linear-gradient(0deg, #005FAA 0%, #14B8A6 100%)', borderRadius: '2px' }} />

            {milestones.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: idx < milestones.length - 1 ? '48px' : 0, position: 'relative' }}>
                {m.side === 'left' ? (
                  <>
                    {/* Card on left */}
                    <div style={{ flex: 1, paddingRight: '48px' }}>
                      <div style={{ background: '#FFFFFF', border: '2px solid rgba(0, 95, 170, 0.2)', borderRadius: '16px', padding: '26px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08)', textAlign: 'right' }}>
                        <div style={{ fontSize: '30px', fontWeight: '700', color: '#005FAA', marginBottom: '8px' }}>{m.year}</div>
                        <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>{m.title}</h4>
                        <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.5' }}>{m.desc}</p>
                      </div>
                    </div>
                    {/* Dot */}
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#005FAA', border: '4px solid #FFFFFF', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', flexShrink: 0, zIndex: 1 }} />
                    {/* Empty right */}
                    <div style={{ flex: 1, paddingLeft: '48px' }} />
                  </>
                ) : (
                  <>
                    {/* Empty left */}
                    <div style={{ flex: 1, paddingRight: '48px' }} />
                    {/* Dot */}
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#005FAA', border: '4px solid #FFFFFF', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', flexShrink: 0, zIndex: 1 }} />
                    {/* Card on right */}
                    <div style={{ flex: 1, paddingLeft: '48px' }}>
                      <div style={{ background: '#FFFFFF', border: '2px solid rgba(0, 95, 170, 0.2)', borderRadius: '16px', padding: '26px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08)' }}>
                        <div style={{ fontSize: '30px', fontWeight: '700', color: '#005FAA', marginBottom: '8px' }}>{m.year}</div>
                        <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>{m.title}</h4>
                        <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.5' }}>{m.desc}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet The Experts */}
      <section style={{ background: '#FFFFFF', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ color: '#005FAA', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px' }}>OUR TEAM</div>
            <h2 style={{ fontSize: '48px', fontWeight: '700', color: '#111827', marginBottom: '24px' }}>Meet The Experts</h2>
            <p style={{ fontSize: '18px', color: '#4B5563', maxWidth: '600px', margin: '0 auto' }}>Talented professionals dedicated to bringing your vision to life</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
            {team.map((member, idx) => (
              <div key={idx} style={{ background: '#005FAA', borderRadius: '16px', padding: '28px', color: 'white' }}>
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
            ))}
          </div>
        </div>
      </section>

      {/* Our Client Locations */}
      <section style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #ECFEFF 100%)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ color: '#005FAA', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px' }}>GLOBAL PRESENCE</div>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#111827' }}>Our Client Locations</h2>
          </div>
          <div style={{ background: 'white', borderRadius: '24px', padding: '48px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
            {/* World map image */}
            <img src="/images/download.jpg" alt="World Map" style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.85 }} />

            {/* Client location dots */}
            <div style={{ position: 'absolute', inset: '48px' }}>
              {clientDots.map((dot, idx) => (
                <div key={idx} style={{ position: 'absolute', top: dot.top, left: dot.left, transform: 'translate(-50%, -50%)' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#005FAA', border: '3px solid white', boxShadow: '0 0 0 3px rgba(0,95,170,0.3)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Drives Us — Values */}
      <section style={{ background: '#F9FAFB', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ color: '#005FAA', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px' }}>OUR VALUES</div>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#111827' }}>What Drives Us</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '64px' }}>
            {[
              { icon: <Lightbulb size={28} />, title: 'Innovation', desc: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions that keep our clients ahead of the curve.' },
              { icon: <Shield size={28} />, title: 'Integrity', desc: 'We build trust through transparency, honesty, and ethical practices in every project and relationship we cultivate.' },
              { icon: <Award size={28} />, title: 'Excellence', desc: 'We are committed to delivering the highest quality in everything we do, exceeding expectations and setting new standards.' },
            ].map((val, idx) => (
              <div key={idx} style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, #EFF6FF 0%, #ECFEFF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#005FAA', marginBottom: '20px' }}>
                  {val.icon}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>{val.title}</h3>
                <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6' }}>{val.desc}</p>
              </div>
            ))}
          </div>

          {/* Mission & Vision */}
          <div style={{ display: 'flex', gap: '64px', alignItems: 'center' }}>
            <div style={{ flex: '0 0 340px', height: '340px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
              <img src="/images/7ff81a9acd0149ff739fee5049089c14294b1d49.jpg" alt="Our Mission" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
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
          </div>
        </div>
      </section>
    </>
  );
}
