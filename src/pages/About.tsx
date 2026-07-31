import { Users, Award, Target, Globe } from 'lucide-react';

export default function About() {
  return (
    <>
      {/* Page Header */}
      <section style={{ background: 'var(--bg-gradient)', padding: '80px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '12px' }}>Who We Are</div>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>About <span style={{ color: 'var(--primary)' }}>Lumicore Labs</span></h1>
          <p style={{ fontSize: '18px', color: 'var(--text-body)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            We are a passionate team of engineers and designers delivering cutting-edge software solutions since 2016.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '96px 0', background: 'white' }}>
        <div className="container" style={{ display: 'flex', gap: '64px', alignItems: 'center' }}>
          <div style={{ flex: '1', background: '#D1D5DB', aspectRatio: '4/3', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#6B7280', fontWeight: '600' }}>About Image</span>
          </div>
          <div style={{ flex: '1' }}>
            <div style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px' }}>Our Mission</div>
            <h2 style={{ fontSize: '36px', marginBottom: '24px' }}>Empowering Businesses Through Technology</h2>
            <p style={{ fontSize: '16px', color: 'var(--text-body)', marginBottom: '24px', lineHeight: '1.6' }}>
              At Lumicore Labs, we believe technology should be an enabler, not a barrier. Our mission is to simplify complexity and deliver software solutions that truly make a difference for our clients.
            </p>
            <p style={{ fontSize: '16px', color: 'var(--text-body)', lineHeight: '1.6' }}>
              With 8+ years of experience and a team of 50+ experts, we've helped businesses across industries achieve their digital transformation goals.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '64px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }}>
          {[
            { icon: <Users size={32} />, value: '50+', label: 'Team Members' },
            { icon: <Award size={32} />, value: '8+', label: 'Years Experience' },
            { icon: <Target size={32} />, value: '2,518', label: 'Projects Done' },
            { icon: <Globe size={32} />, value: '30+', label: 'Countries Served' },
          ].map((stat, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', opacity: 0.8 }}>{stat.icon}</div>
              <div style={{ fontSize: '48px', fontWeight: '800', marginBottom: '8px' }}>{stat.value}</div>
              <div style={{ fontSize: '14px', fontWeight: '500', opacity: 0.9 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '96px 0', background: 'var(--bg-section)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '12px' }}>Meet The Team</div>
            <h2 style={{ fontSize: '36px' }}>Our Leadership</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { name: 'Alex Johnson', role: 'CEO & Founder' },
              { name: 'Maria Chen', role: 'CTO' },
              { name: 'David Kumar', role: 'Head of Design' },
            ].map((member, idx) => (
              <div key={idx} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6' }}>
                <div style={{ height: '250px', background: '#D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#6B7280' }}>Team Photo</span>
                </div>
                <div style={{ padding: '24px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{member.name}</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '14px' }}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
