import { Phone, Play, CheckCircle, ChevronRight, User, Code, Lightbulb, TrendingUp, FileText, Cpu, Zap, Megaphone, Headphones, Shield, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section style={{ background: 'var(--bg-gradient)', paddingTop: '96px', paddingBottom: '96px', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <div style={{ flex: '1' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'var(--primary-light)', border: '1px solid rgba(0, 95, 170, 0.2)', borderRadius: '9999px', marginBottom: '24px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></span>
              <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: '600', letterSpacing: '1.2px', textTransform: 'uppercase' }}>IT Services Designed</span>
            </div>

            <h1 style={{ fontSize: '60px', marginBottom: '24px' }}>
              Awesome IT Services <br />
              <span style={{ color: 'var(--primary)' }}>For Your Business</span>
            </h1>

            <p style={{ fontSize: '18px', color: 'var(--text-body)', marginBottom: '40px', maxWidth: '520px', lineHeight: '1.6' }}>
              Apxcore digital delivers cutting-edge software solutions that transform your business operations, accelerate growth, and create lasting competitive advantages in the digital era.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '48px' }}>
              <button style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '14px 28px', borderRadius: '6px', border: 'none', fontWeight: '700', fontSize: '16px', boxShadow: '0 10px 15px -3px rgba(0, 95, 170, 0.3)', cursor: 'pointer' }}>Start a Project</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Call Us: +1 (888) 123-4567</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)' }}>For any question</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 6px -1px rgba(0, 95, 170, 0.2)' }}>
                <Play size={20} fill="white" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-body)' }}>Watch How We Work</span>
            </div>
          </div>

          <div style={{ flex: '1', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', background: 'linear-gradient(135deg, rgba(0,95,170,0.1) 0%, rgba(0,119,204,0.1) 100%)', filter: 'blur(32px)', borderRadius: '50%', zIndex: 0 }}></div>
            {/* Hero Image — replace /images/hero_1.png with your image */}
            <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
              <img src="/images/cb14388fbf0a9d2210df55b49a503fa243a18b39.jpg" alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ position: 'absolute', bottom: '32px', left: '-32px', background: 'white', padding: '16px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', zIndex: 2 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <CheckCircle size={20} />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Trusted by</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-dark)' }}>278+ Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section style={{ padding: '96px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '12px' }}>Services We Deliver</div>
            <h2 style={{ fontSize: '36px' }}>Our Featured Services</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { icon: <User size={24} />, title: 'Business Collaboration', desc: 'We build seamless collaboration platforms that connect teams, streamline workflows, and accelerate business...' },
              { icon: <Code size={24} />, title: 'Engineering & Services', desc: 'End-to-end engineering solutions designed to solve complex technical challenges with precision and scale...' },
              { icon: <Lightbulb size={24} />, title: 'Creative Minds', desc: 'Innovative thinking meets technical expertise to craft digital experiences that captivate and convert...' },
              { icon: <TrendingUp size={24} />, title: 'Revenue Generation', desc: 'Data-driven strategies and smart automation tools that directly impact your bottom line and growth...' },
            ].map((service, idx) => (
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

      {/* Discover Our Company */}
      <section style={{ padding: '96px 0', background: 'var(--bg-section)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
          <div style={{ flex: '1', position: 'relative' }}>
            {/* Discover Image — replace placeholder with your image */}
            <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
              <img src="/images/cedfbf1523498b6b9cf3a65af7e5b61f0ea8394e.jpg" alt="Discover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '-24px', right: '-24px', background: 'var(--primary)', color: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', zIndex: 2 }}>
              <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>8+</div>
              <div style={{ fontSize: '14px', fontWeight: '500', opacity: 0.9 }}>Years of Excellence</div>
            </div>
          </div>

          <div style={{ flex: '1' }}>
            <div style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px' }}>Discover Our Company</div>
            <h2 style={{ fontSize: '36px', marginBottom: '24px' }}>Bringing New IT Business Solutions And Ideas</h2>
            <p style={{ fontSize: '16px', color: 'var(--text-body)', marginBottom: '40px', lineHeight: '1.6' }}>
              At Apxcore digital, we combine deep technical expertise with creative problem-solving to deliver software solutions that truly make a difference.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
              {[
                { icon: <User size={20} />, title: 'Engaging Group Discussion', desc: 'We foster open collaboration and transparent communication throughout every project phase.' },
                { icon: <Code size={20} />, title: 'Software Engineering', desc: 'Our engineers apply industry best practices, clean architecture, and rigorous testing.' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{item.title}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '14px 28px', borderRadius: '6px', border: 'none', fontWeight: '700', fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              Discover More <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '64px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }}>
          {[
            { value: '2,518', label: 'Project Delivered' },
            { value: '14+', label: 'Team Experience' },
            { value: '278', label: 'Happy Clients+' },
            { value: '3,568', label: 'Revenue Grow' },
          ].map((stat, idx) => (
            <div key={idx}>
              <div style={{ fontSize: '48px', fontWeight: '800', marginBottom: '8px' }}>{stat.value}</div>
              <div style={{ fontSize: '14px', fontWeight: '500', opacity: 0.9 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* IT & Business Solutions */}
      <section style={{ padding: '96px 0', background: 'var(--bg-section)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '12px' }}>Technology solutions</div>
            <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>We Provide IT & Business Solutions</h2>
            <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              From strategy to execution, Apxcore digital delivers comprehensive technology solutions.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            {[
              { icon: <FileText size={24} />, title: 'Content Strategy', desc: 'Craft compelling narratives that engage your audience and drive measurable results.' },
              { icon: <Cpu size={24} />, title: 'Technology', desc: 'Leverage the latest tech stack to build robust, scalable, and future-proof solutions.' },
              { icon: <Zap size={24} />, title: 'High Performance', desc: 'Optimized systems engineered for speed, reliability, and exceptional user experience.' },
              { icon: <Megaphone size={24} />, title: 'Media Marketing', desc: 'Strategic digital marketing campaigns that amplify your brand across all channels.' },
              { icon: <Headphones size={24} />, title: 'Customer Support', desc: 'Dedicated support systems ensuring your clients always receive world-class assistance.' },
              { icon: <Shield size={24} />, title: 'Network Protection', desc: 'Enterprise-grade cybersecurity solutions that safeguard your data and infrastructure.' },
            ].map((solution, idx) => (
              <div key={idx} className="service-card" style={{ padding: '32px 24px', background: 'white', borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', display: 'flex', gap: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  {solution.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{solution.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{solution.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Case Studies */}
      <section style={{ padding: '96px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '12px' }}>Featured Services</div>
            <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Our Latest Case Studies</h2>
            <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              Explore how Apxcore digital has helped businesses across industries achieve their digital transformation goals.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
            {[
              { img: '/images/192b4757d41ea10387e87f5bc6ee469db879fe1a.jpg', tag: 'Cloud', title: 'Enterprise Cloud Migration for FinTech Leader' },
              { img: '/images/006b739ae39b2b74a5c22be4c3abd55244fbbacc.jpg', tag: 'AI & ML', title: 'AI-Powered Analytics Platform for Healthcare' },
              { img: '/images/fae2cb8e8e86945bfd9afb88e1b2eb6ddbaf0af6.jpg', tag: 'Mobile', title: 'Cross-Platform Mobile App with 2M+ Users' },
            ].map((study, idx) => (
              <div key={idx} style={{ borderRadius: '16px', border: '1px solid #F3F4F6', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                  <img src={study.img} alt={study.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'inline-flex', padding: '4px 12px', background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '12px', fontWeight: '600', borderRadius: '9999px', alignSelf: 'flex-start', marginBottom: '16px' }}>
                    {study.tag}
                  </div>
                  <h3 style={{ fontSize: '18px', marginBottom: '24px', flexGrow: 1 }}>{study.title}</h3>
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
                    View Case Study <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button style={{ backgroundColor: 'white', color: 'var(--primary)', padding: '12px 28px', borderRadius: '6px', border: '1px solid var(--primary)', fontWeight: '600', fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              View All Projects <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Latest News & Blog */}
      <section style={{ padding: '96px 0', background: 'var(--bg-section)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '12px' }}>Technology solutions</div>
            <h2 style={{ fontSize: '36px' }}>Latest News & Blog</h2>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            {/* Main Blog Post */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', height: '360px', borderRadius: '16px', marginBottom: '24px', overflow: 'hidden' }}>
                <img src="/images/a2496713bb6b8c418c9989b5fd5e359c6de3b4a2.jpg" alt="Main Blog" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'inline-flex', padding: '4px 12px', background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '12px', fontWeight: '600', borderRadius: '9999px', alignSelf: 'flex-start', marginBottom: '16px' }}>Technology</div>
              <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>5 Steps to Founding a Tax-Exempt Nonprofit Corporation</h3>
              <p style={{ fontSize: '16px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6', flexGrow: 1 }}>
                A comprehensive guide to navigating the legal and operational requirements for establishing a successful nonprofit organization.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E5E7EB', paddingTop: '16px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Aug 05, 2024</span>
                <a href="#" style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>Read More</a>
              </div>
            </div>

            {/* Sidebar Blog Posts */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { img: '/images/1c1131068c62166e123c22ccd77c17a893c095c3.jpg', tag: 'Technology', date: 'Nov 12, 2024', title: 'The Growing Technology Infidele Excellent Profit', desc: 'Discover how emerging technologies are reshaping business profitability.' },
                { img: '/images/fa2244edbda8dfcd6492b655187327c8bfa0ddcc.jpg', tag: 'Marketing', date: 'Oct 28, 2024', title: 'Boost Your Business With Our Digital Agency', desc: 'Strategic insights on leveraging digital agency partnerships to accelerate your business growth.' },
                { img: '/images/7cbefce5ecd2290c5adc1c2b83069e44a9c39527.jpg', tag: 'Branding', date: 'Sep 15, 2024', title: 'Visual Identity System is More Memorable', desc: 'How a cohesive visual identity system builds brand recognition and drives long-term loyalty.' },
              ].map((post, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '24px', background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '12px', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                      <div style={{ display: 'inline-flex', padding: '4px 12px', background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '12px', fontWeight: '600', borderRadius: '9999px' }}>{post.tag}</div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{post.date}</span>
                    </div>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{post.title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>{post.desc}</p>
                  </div>
                </div>
              ))}
              <div style={{ textAlign: 'right', marginTop: 'auto' }}>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
                  View All Posts <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
