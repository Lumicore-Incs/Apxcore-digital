import { Phone, Play, ChevronRight, User, Code, Lightbulb, TrendingUp, Cpu, Zap, Shield, ArrowRight } from 'lucide-react';
import './Home.css';
import { useEffect, useRef, useState } from 'react';

function Counter({ end, duration = 1500 }: { end: string | number; duration?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let observer: IntersectionObserver | null = null;
    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      const numeric = parseInt(String(end).replace(/[^0-9]/g, ''), 10) || 0;
      const startTime = performance.now();

      const step = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = Math.round(numeric * eased);
        setValue(current);
        if (t < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start();
            if (observer) observer.disconnect();
          }
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(node);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [end, duration]);

  // Keep suffix (e.g., '+') if provided in the original string
  const suffixMatch = String(end).match(/\D+$/);
  const suffix = suffixMatch ? suffixMatch[0] : '';

  return (
    <div ref={ref} className="stats-value">
      {value.toLocaleString()}{suffix}
    </div>
  );
}

export default function Home() {
  const heroCards = [
    {
      id: 'strategy',
      icon: <Lightbulb size={24} />,
      title: 'Future-ready strategy',
      description: 'Align product roadmap, customer journeys and technical execution for fast-moving teams.',
    },
    {
      id: 'engineering',
      icon: <Code size={24} />,
      title: 'Design-driven engineering',
      description: 'Bring premium visuals and thoughtful experience to production-grade applications.',
    },
    {
      id: 'growth',
      icon: <TrendingUp size={24} />,
      title: 'Growth through impact',
      description: 'Build digital products that improve adoption, retention and revenue performance.',
    },
  ];

  const [activeCard, setActiveCard] = useState<number>(0);

  return (
    <div className="home-page">
      <section className="home-hero">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260618_174853_aac61aa2-0f3f-4cf1-bc78-7f657dd11164.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay" />

        <div className="container hero-grid">
          <div className="hero-copy" data-aos="fade-up" data-aos-duration="900">
            <div className="hero-eyebrow">
              <span />
              Immersive IT Experiences
            </div>
            <h1>
              Awesome IT  Services <span className="hero-highlight">For Your Business</span>.
            </h1>
            <p>
              Lumicore Labs delivers cutting-edge software solutions that transform your business operations, accelerate growth, and create lasting competitive advantages in the digital era.            </p>

            <div className="hero-actions" data-aos="fade-up" data-aos-delay="150">
              <div className="hero-primary-actions">
                <button className="hero-button">Start a project</button>
                <div className="hero-contact">
                  <div className="hero-contact__icon">
                    <Phone size={18} />
                  </div>
                  <div className="hero-contact__text">
                    <span>Call us anytime</span>
                    <strong>+94 767 354 673</strong>
                  </div>
                </div>
              </div>
              <button className="hero-button--ghost">
                <Play size={18} /> Watch how we work
              </button>
            </div>
          </div>

          <div className="hero-panel" data-aos="fade-left" data-aos-delay="200">
            <div className="hero-card-details">
              <div className="hero-card-detail-card">
                <div className="hero-card__glow" />
                <div className="hero-card__icon">{heroCards[activeCard].icon}</div>
                <div className="hero-card__content">
                  <h3>{heroCards[activeCard].title}</h3>
                  <p>{heroCards[activeCard].description}</p>
                </div>
              </div>
            </div>

            <div className="hero-card-buttons" data-aos="fade-up" data-aos-delay="300">
              {heroCards.map((card, idx) => (
                <button
                  key={card.id}
                  type="button"
                  className={`hero-card-button ${activeCard === idx ? 'active' : ''}`}
                  onClick={() => setActiveCard(idx)}
                >
                  {card.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <div className="section-heading__eyebrow">Services we deliver</div>
            <h2>Premium capabilities for ambitious teams</h2>
            <p>Full-service product design and engineering for companies that want modern digital experiences with real business impact.</p>
          </div>

          <div className="featured-grid">
            {[
              { icon: <User size={24} />, title: 'Business Collaboration', desc: 'Seamless team platforms, strategic dashboards, and enterprise workflows.' },
              { icon: <Cpu size={24} />, title: 'Technology', desc: 'Scalable architecture, modern infrastructure, and secure deployment pipelines.' },
              { icon: <Zap size={24} />, title: 'Performance', desc: 'Blazing fast interfaces, reliability-first engineering, and thoughtful optimization.' },
              { icon: <Shield size={24} />, title: 'Network Protection', desc: 'Enterprise-grade security, audit readiness, and continuous threat monitoring.' },
            ].map((service, idx) => (
              <article
                key={idx}
                className="service-card"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                data-aos-duration="600"
              >
                <div className="service-card__icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <a href="#">Learn more <ChevronRight size={16} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Our Company Section */}
      <section className="section-block">
        <div className="container discovery">
          <div className="discovery__visual" data-aos="fade-right" data-aos-duration="900">
            <div className="discovery__card">
              <img
                src="/images/cedfbf1523498b6b9cf3a65af7e5b61f0ea8394e.jpg"
                alt="Discover Our Company"
              />
            </div>
            <div className="discovery__badge" data-aos="zoom-in" data-aos-delay="300">
              <h3>2+</h3>
              <p>Years of Excellence</p>
            </div>
          </div>

          <div className="discovery__details" data-aos="fade-left" data-aos-duration="900">
            <div style={{ color: '#0d6bff', fontSize: '14px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px' }}>
              Discover Our Company
            </div>
            <h2>Bringing New IT Business Solutions And Ideas</h2>
            <p>
              At Apxcore digital, we combine deep technical expertise with creative problem-solving to deliver software solutions that truly make a difference.
            </p>
            <div>
              {[
                {
                  icon: <User size={20} />,
                  title: 'Engaging Group Discussion',
                  desc: 'We foster open collaboration and transparent communication throughout every project phase.'
                },
                {
                  icon: <Code size={20} />,
                  title: 'Software Engineering',
                  desc: 'Our engineers apply industry best practices, clean architecture, and rigorous testing.'
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="discovery-item"
                  data-aos="fade-up"
                  data-aos-delay={200 + idx * 150}
                >
                  <div className="discovery-item__icon">
                    {item.icon}
                  </div>
                  <div className="discovery-item__content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="discovery-button" data-aos="fade-up" data-aos-delay="500">
              Discover More <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-panel">
            {[
              { value: '58', label: 'Project Delivered' },
              { value: '14+', label: 'Team Experience' },
              { value: '58', label: 'Happy Clients+' },
              { value: '1000', label: 'Revenue Grow' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="stats-card"
                data-aos="zoom-in"
                data-aos-delay={idx * 120}
                data-aos-duration="700"
              >
                <Counter end={stat.value} duration={1600} />
                <div className="stats-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="section-block">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <div className="section-heading__eyebrow">Featured services</div>
            <h2>Our latest case studies</h2>
            <p>Explore premium digital transformation projects delivered for growth-driven organizations.</p>
          </div>
          <div className="case-grid">
            {[
              { img: '/images/192b4757d41ea10387e87f5bc6ee469db879fe1a.jpg', tag: 'Cloud', title: 'Enterprise cloud migration for a FinTech leader' },
              { img: '/images/006b739ae39b2b74a5c22be4c3abd55244fbbacc.jpg', tag: 'AI & ML', title: 'AI-powered analytics platform for healthcare' },
              { img: '/images/fae2cb8e8e86945bfd9afb88e1b2eb6ddbaf0af6.jpg', tag: 'Mobile', title: 'Cross-platform mobile app with 2M+ users' },
            ].map((study, idx) => (
              <article
                key={idx}
                className="case-card"
                data-aos="fade-up"
                data-aos-delay={idx * 120}
                data-aos-duration="700"
              >
                <img className="case-card__image" src={study.img} alt={study.title} />
                <div className="case-card__body">
                  <div className="case-card__tag">{study.tag}</div>
                  <h3 className="case-card__title">{study.title}</h3>
                  <a href="#">View case study <ArrowRight size={16} /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-block">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <div className="section-heading__eyebrow">Technology insights</div>
            <h2>Latest news & blog</h2>
          </div>
          <div className="blog-grid">
            <div className="main-blog" data-aos="fade-right" data-aos-duration="800">
              <img className="main-blog__image" src="/images/a2496713bb6b8c418c9989b5fd5e359c6de3b4a2.jpg" alt="Main blog post" />
              <span className="main-blog__tag">Technology</span>
              <h3>5 steps to founding a tax-exempt nonprofit corporation</h3>
              <p>Navigate legal and operational requirements with confidence while building a mission-driven organization.</p>
              <div className="main-blog__meta">
                <span>Aug 05, 2024</span>
                <a href="#">Read more</a>
              </div>
            </div>
            <div className="blog-sidebar">
              {[
                { img: '/images/1c1131068c62166e123c22ccd77c17a893c095c3.jpg', tag: 'Technology', date: 'Nov 12, 2024', title: 'The growing technology infidele excellent profit', desc: 'Discover how emerging technologies are reshaping business profitability.' },
                { img: '/images/fa2244edbda8dfcd6492b655187327c8bfa0ddcc.jpg', tag: 'Marketing', date: 'Oct 28, 2024', title: 'Boost your business with our digital agency', desc: 'Strategic insights on leveraging digital agency partnerships to accelerate your business growth.' },
                { img: '/images/7cbefce5ecd2290c5adc1c2b83069e44a9c39527.jpg', tag: 'Branding', date: 'Sep 15, 2024', title: 'Visual identity system is more memorable', desc: 'How a cohesive visual identity system builds brand recognition and drives long-term loyalty.' },
              ].map((post, idx) => (
                <article
                  key={idx}
                  className="blog-teaser"
                  data-aos="fade-left"
                  data-aos-delay={idx * 120}
                  data-aos-duration="700"
                >
                  <img className="blog-teaser__image" src={post.img} alt={post.title} />
                  <div className="blog-teaser__content">
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                      <span className="main-blog__tag">{post.tag}</span>
                      <span style={{ color: '#7b85a1', fontSize: '0.85rem' }}>{post.date}</span>
                    </div>
                    <h4>{post.title}</h4>
                    <p>{post.desc}</p>
                  </div>
                </article>
              ))}
              <div className="blog-sidebar__footer" data-aos="fade-up" data-aos-delay="400">
                <a href="#">View all posts <ArrowRight size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}