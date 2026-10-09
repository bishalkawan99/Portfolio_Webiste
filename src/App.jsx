import { useEffect, useRef, useState } from 'react';
import { CardStack } from './components/ui/card-stack.jsx';

const projectFilters = ['all', 'web', 'app', 'ui'];

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/FAMOUS.FF.09',
    path: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.9h2.54V9.75c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.58v1.91h2.78l-.44 2.9h-2.34V22C18.34 21.12 22 16.99 22 12z',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@FuryGurkha',
    path: 'M23.5 6.2s-.24-1.7-.98-2.44c-.94-.99-2-1-2.48-1.05C16.26 2.5 12 2.5 12 2.5h0s-4.26 0-8.04.21c-.48.05-1.54.06-2.48 1.05C.74 4.5.5 6.2.5 6.2S.25 8 .25 9.8v1.4c0 1.8.25 3.6.25 3.6s.24 1.7.98 2.44c.94.99 2.18.95 2.73 1.06 1.97.16 8.29.2 8.29.2s4.26 0 8.04-.21c.48-.05 1.54-.06 2.48-1.05.74-.74.98-2.44.98-2.44s.25-1.8.25-3.6v-1.4c0-1.8-.25-3.6-.25-3.6zM9.75 15.5V8.5l6 3.5-6 3.5z',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@hyperorbit99',
    path: 'M9.5 2h3.5v7.6c.98.08 1.92.42 2.75.96v3.78a5.62 5.62 0 0 1-3.1-.95 5.22 5.22 0 0 1-1.9-2.48A5.15 5.15 0 0 1 10 7.9V3H9.5zm2 0h-3.5a1.5 1.5 0 0 0-1.5 1.5v10A4.5 4.5 0 0 0 11 19v2.5a6 6 0 0 1-6-6V4.5A1.5 1.5 0 0 1 6.5 3H8v4.9A4.92 4.92 0 0 0 9.5 16a4.95 4.95 0 0 0 5-4.4V2h-3.5z',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/bishalkawan99',
    path: 'M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.753-1.333-1.753-1.09-.745.083-.73.083-.73 1.205.086 1.84 1.24 1.84 1.24 1.07 1.83 2.807 1.302 3.492.995.108-.775.42-1.302.762-1.602-2.665-.304-5.467-1.333-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.323 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.553 3.285-1.23 3.285-1.23.655 1.653.245 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.815 1.1.815 2.22 0 1.606-.015 2.898-.015 3.293 0 .32.21.695.825.576C20.565 22.295 24 17.795 24 12.5 24 5.87 18.63.5 12 .5z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bishalkawan123/?hl=en',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.96.24 2.416.415a4.92 4.92 0 0 1 1.78 1.1 4.92 4.92 0 0 1 1.1 1.78c.175.456.36 1.246.414 2.416.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.239 1.96-.414 2.416a4.92 4.92 0 0 1-1.1 1.78 4.92 4.92 0 0 1-1.78 1.1c-.456.175-1.246.36-2.416.414-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.96-.239-2.416-.414a4.92 4.92 0 0 1-1.78-1.1 4.92 4.92 0 0 1-1.1-1.78c-.175-.456-.36-1.246-.414-2.416C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.239-1.96.414-2.416a4.92 4.92 0 0 1 1.1-1.78 4.92 4.92 0 0 1 1.78-1.1c.456-.175 1.246-.361 2.416-.415C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.17 0-3.548.012-4.797.069-.99.043-1.527.2-1.884.334a3.13 3.13 0 0 0-1.136.736 3.13 3.13 0 0 0-.736 1.136c-.135.357-.291.894-.334 1.884-.057 1.249-.069 1.627-.069 4.797s.012 3.548.069 4.797c.043.99.2 1.527.334 1.884.18.474.42.9.736 1.136.236.316.662.556 1.136.736.357.135.894.291 1.884.334 1.249.057 1.627.069 4.797.069s3.548-.012 4.797-.069c.99-.043 1.527-.2 1.884-.334a3.13 3.13 0 0 0 1.136-.736 3.13 3.13 0 0 0 .736-1.136c.135-.357.291-.894.334-1.884.057-1.249.069-1.627.069-4.797s-.012-3.548-.069-4.797c-.043-.99-.2-1.527-.334-1.884a3.13 3.13 0 0 0-.736-1.136 3.13 3.13 0 0 0-1.136-.736c-.357-.135-.894-.291-1.884-.334-1.249-.057-1.627-.069-4.797-.069zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.163a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 1-2.881 0 1.44 1.44 0 0 1 2.881 0z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bishal-kawan-8068a42a6/',
    path: 'M4.98 3.5C3.33 3.5 2 4.83 2 6.48c0 1.65 1.33 2.98 2.98 2.98 1.65 0 2.98-1.33 2.98-2.98 0-1.65-1.33-2.98-2.98-2.98zM2.4 8.91h5.17V22H2.4V8.91zM8.91 10.52h4.96v1.84h.07c.69-1.3 2.38-2.67 4.9-2.67 5.24 0 6.2 3.45 6.2 7.92V22h-5.18v-6.68c0-1.59-.03-3.63-2.21-3.63-2.21 0-2.55 1.72-2.55 3.5V22h-5.17V10.52z',
  },
];

const projects = [
  { category: 'web', kind: 'one', tag: 'Web Experience', title: 'Project One', description: 'Prototype portfolio concept ready for your next live project. Swap in your own content later.', meta: ['React', 'UI'] },
  { category: 'app', kind: 'two', tag: 'Mobile App', title: 'Project Two', description: 'Application layout placeholder designed for a future product launch.', meta: ['Mobile', 'UX'] },
  { category: 'ui', kind: 'three', tag: 'Design System', title: 'Project Three', description: 'Clean interface mockup for a future concept, case study, or client work.', meta: ['Brand', 'Design'] },
];

const education = [
  { icon: 'fas fa-school', level: 'S.E.E', institution: 'Proxima International Academy — Bhaktapur, Nepal', detail: 'Completed — GPA 3.29 / 4.00' },
  { icon: 'fas fa-school', level: '+2 (Higher Secondary)', institution: 'Khwopa Higher Secondary School — Bhaktapur, Nepal', detail: 'Completed — GPA 3.60 / 4.00' },
  { icon: 'fas fa-graduation-cap', level: 'Bachelor (BIT)', institution: 'NED — Bachelor of Information Technology (BIT)', detail: 'Ongoing — currently enrolled' },
];

const skills = [
  { name: 'React', icon: 'fab fa-react' },
  { name: 'Next.js', icon: 'fab fa-js-square' },
  { name: 'HTML', icon: 'fab fa-html5' },
  { name: 'CSS', icon: 'fab fa-css3-alt' },
  { name: 'JavaScript', icon: 'fab fa-js-square' },
  { name: 'PHP', icon: 'fab fa-php' },
  { name: 'C Programming', text: 'C' },
  { name: 'Python', icon: 'fab fa-python' },
  { name: 'Git', icon: 'fab fa-git-alt' },
];

function ProjectVisual({ kind }) {
  if (kind === 'one') {
    return (
      <div className="project-visual project-visual-one">
        <div className="project-window">
          <span className="window-dot red" />
          <span className="window-dot yellow" />
          <span className="window-dot green" />
          <div className="window-body">
            <div className="window-card short" />
            <div className="window-card medium" />
            <div className="window-card tall" />
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'two') {
    return (
      <div className="project-visual project-visual-two">
        <div className="project-phone">
          <div className="phone-notch" />
          <div className="phone-screen">
            <div className="stat-card" />
            <div className="stat-line long" />
            <div className="stat-line short" />
            <div className="stat-line medium" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual project-visual-three">
      <div className="project-board">
        <div className="board-panel large" />
        <div className="board-panel small" />
        <div className="board-panel medium" />
      </div>
    </div>
  );
}

function SectionHeading({ children, className = 'projects-header' }) {
  return (
    <div className={className}>
      <h2>{children}</h2>
      <div className="underline-wrap" aria-hidden="true">
        <span className="underline-line neon-green" />
        <span className="underline-line electric-blue" />
      </div>
    </div>
  );
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [ripples, setRipples] = useState([]);
  const pageRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    const words = [...root.querySelectorAll('.word-animate')];
    const timeouts = words.map((word) => window.setTimeout(() => {
      word.style.animation = 'word-appear 0.8s ease-out forwards';
    }, Number(word.dataset.delay) || 0));
    const maxDelay = Math.max(...words.map((word) => Number(word.dataset.delay) || 0));
    const unlockTimeout = window.setTimeout(() => {
      document.body.classList.remove('no-scroll');
    }, maxDelay + 900);
    const revealTimeout = window.setTimeout(() => {
      root.querySelector('.bottom-social')?.classList.add('visible');
    }, maxDelay + 1100);

    const revealItems = [...root.querySelectorAll('.reveal-on-scroll')];
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            currentObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      revealItems.forEach((item) => observer.observe(item));

      return () => {
        timeouts.forEach(window.clearTimeout);
        window.clearTimeout(unlockTimeout);
        window.clearTimeout(revealTimeout);
        observer.disconnect();
        document.body.classList.remove('no-scroll');
      };
    }

    revealItems.forEach((item) => item.classList.add('visible'));
    return () => {
      timeouts.forEach(window.clearTimeout);
      window.clearTimeout(unlockTimeout);
      window.clearTimeout(revealTimeout);
      document.body.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    const updateGradient = (event) => {
      const gradient = document.getElementById('mouse-gradient');
      if (!gradient) return;
      gradient.style.left = `${event.clientX}px`;
      gradient.style.top = `${event.clientY}px`;
      gradient.style.opacity = '1';
    };
    const hideGradient = () => {
      const gradient = document.getElementById('mouse-gradient');
      if (gradient) gradient.style.opacity = '0';
    };
    const addRipple = (event) => {
      const id = Date.now() + Math.random();
      setRipples((current) => [...current, { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setRipples((current) => current.filter((ripple) => ripple.id !== id));
      }, 1000);
    };
    const startFloating = () => {
      document.querySelectorAll('.floating').forEach((item, index) => {
        const delay = (parseFloat(item.style.animationDelay || '0') * 1000) + index * 100;
        window.setTimeout(() => {
          item.style.animationPlayState = 'running';
          item.style.opacity = '1';
        }, delay);
      });
      window.removeEventListener('scroll', startFloating);
    };

    window.addEventListener('mousemove', updateGradient);
    window.addEventListener('mouseleave', hideGradient);
    window.addEventListener('click', addRipple);
    window.addEventListener('scroll', startFloating, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateGradient);
      window.removeEventListener('mouseleave', hideGradient);
      window.removeEventListener('click', addRipple);
      window.removeEventListener('scroll', startFloating);
    };
  }, []);

  const handleSkillsMove = (event) => {
    const section = skillsRef.current;
    const glow = section?.querySelector('.skills-glow');
    if (!section || !glow) return;
    const rect = section.getBoundingClientRect();
    glow.style.left = `${event.clientX - rect.left}px`;
    glow.style.top = `${event.clientY - rect.top}px`;
    glow.style.opacity = '1';
    glow.style.transform = 'translate(-50%, -50%) scale(1.05)';
  };

  return (
    <div className="page-shell" ref={pageRef}>
      <section id="home" className="home-section">
        <svg className="background-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="gridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(148, 163, 184, 0.12)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
          <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: '0.5s' }} />
          <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: '1s' }} />
          <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: '1.5s' }} />
          <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: '2s' }} />
          <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: '3s' }} />
          <circle cx="80%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: '3.2s' }} />
          <circle cx="20%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: '3.4s' }} />
          <circle cx="80%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: '3.6s' }} />
        </svg>

        <div className="corner corner-tl"><div className="corner-dot" /></div>
        <div className="corner corner-tr"><div className="corner-dot" /></div>
        <div className="corner corner-bl"><div className="corner-dot" /></div>
        <div className="corner corner-br"><div className="corner-dot" /></div>
        <div className="floating" style={{ top: '25%', left: '15%', animationDelay: '0.5s' }} />
        <div className="floating" style={{ top: '60%', left: '85%', animationDelay: '1s' }} />
        <div className="floating" style={{ top: '40%', left: '10%', animationDelay: '1.5s' }} />
        <div className="floating" style={{ top: '75%', left: '90%', animationDelay: '2s' }} />

        <main className="content">
          <section className="headline">
            <h2 className="subtitle">
              <span className="word-animate" data-delay="0">Welcome</span>
              <span className="word-animate" data-delay="300">to my portfolio website</span>
            </h2>
            <div className="divider" />
          </section>
          <section className="hero">
            <h1 className="title">
              <span className="word-animate" data-delay="700">Hi,</span>
              <span className="word-animate" data-delay="850">I&apos;m</span>
              <span className="word-animate" data-delay="1000">Bishal Kawan</span>
            </h1>
            <p className="subheading"><span className="word-animate" data-delay="1400">Full Stack Web Developer</span></p>
            <p className="description"><span className="word-animate" data-delay="1700">I create modern, responsive, and user-friendly web experiences with clean code and beautiful design.</span></p>
          </section>
          <section className="footer-text">
            <div className="divider" />
            <h2 className="subtitle footer-loop">
              <span className="word-animate" data-delay="3000">Learn,</span>
              <span className="word-animate" data-delay="3200">Build,</span>
              <span className="word-animate" data-delay="3400">Improve,</span>
              <span className="word-animate" data-delay="3550">Succeed.</span>
              <span className="word-animate" data-delay="3700">Let&apos;s Go. 🚀</span>
            </h2>
            <div className="dot-row" style={{ animationDelay: '4.2s' }} />
          </section>
          <div className="resume-card"><a className="resume-button" href="/documents/cv.pdf" target="_blank" rel="noreferrer">Resume</a></div>
        </main>

        <div className="bottom-social">
          {socialLinks.map(({ label, href, path }) => (
            <a href={href} aria-label={label} key={label} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={path} /></svg>
            </a>
          ))}
        </div>
      </section>

      <section id="about" className="about-section reveal-on-scroll">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div className="about-text">
            <p className="about-description">I&apos;m Bishal Kawan, a full stack developer from Nepal with professional expertise in creating modern, responsive, and interactive web experiences. I focus on clean design, smooth animations, intuitive user interfaces, and robust backend solutions that combine creativity, performance, and usability.</p>
            <ul className="about-features">
              <li><strong>✓ Modern, responsive, and visually engaging web experiences</strong></li>
              <li><strong>✓ Smooth interactions with intuitive and user-friendly interfaces</strong></li>
              <li><strong>✓ Clean design, attention to detail, and polished aesthetics</strong></li>
              <li><strong>✓ Focused on creating seamless and enjoyable user experiences</strong></li>
            </ul>
          </div>
          <div className="about-frame"><img src="/images/robot.png" alt="Futuristic robot" className="about-image" /></div>
        </div>
      </section>

      <section id="education" className="education-section reveal-on-scroll">
        <SectionHeading className="skills-header">Education <span aria-hidden="true">🎓</span></SectionHeading>
        <div className="education-grid">
          {education.map((item) => (
            <article className="education-card" key={item.level}>
              <div className="skill-icon"><i className={item.icon} aria-hidden="true" /></div>
              <p className="education-level">{item.level}</p>
              <h3 className="education-institution">{item.institution}</h3>
              <p className="education-detail">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="skills-section reveal-on-scroll" ref={skillsRef} onMouseMove={handleSkillsMove} onMouseLeave={() => {
        const glow = skillsRef.current?.querySelector('.skills-glow');
        if (glow) glow.style.opacity = '0';
      }}>
        <SectionHeading className="skills-header">Skills <span aria-hidden="true">🔪</span></SectionHeading>
        <div className="skills-grid">
          {skills.map((skill) => (
            <article
              className="skill-card"
              tabIndex="0"
              role="button"
              aria-label={skill.name}
              key={skill.name}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  const card = event.currentTarget;
                  card.classList.add('keyboard-activated');
                  window.setTimeout(() => card.classList.remove('keyboard-activated'), 220);
                }
              }}
            >
              <div className="skill-icon">{skill.icon ? <i className={skill.icon} aria-hidden="true" /> : <span style={{ fontWeight: 700, fontSize: '1.4rem' }}>{skill.text}</span>}</div>
              <p className="skill-name">{skill.name}</p>
            </article>
          ))}
        </div>
        <div className="skills-glow" />
      </section>

      <section id="projects" className="projects-section reveal-on-scroll">
        <SectionHeading>Projects <span aria-hidden="true">✨</span></SectionHeading>
        <div className="project-filters" aria-label="Project filters">
          {projectFilters.map((filter) => (
            <button
              className={`project-filter-btn${activeFilter === filter ? ' is-active' : ''}`}
              type="button"
              data-filter={filter}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              key={filter}
            >{filter === 'ui' ? 'UI' : filter[0].toUpperCase() + filter.slice(1)}</button>
          ))}
        </div>
        <CardStack
          items={projects.filter((project) => activeFilter === 'all' || project.category === activeFilter)}
          cardWidth={520}
          cardHeight={340}
          maxVisible={5}
          overlap={0.48}
          autoAdvance
          intervalMs={4500}
          pauseOnHover
          renderCard={(project) => (
            <div className="project-stack-card">
              <div className="project-stack-art"><ProjectVisual kind={project.kind} /></div>
              <div className="project-stack-copy">
                <span className="project-tag">{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-meta">{project.meta.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            </div>
          )}
        />
      </section>

      <section id="contact" className="contact-section reveal-on-scroll">
        <SectionHeading>Contact Me <span aria-hidden="true">✉️</span></SectionHeading>
        <div className="contact-card">
          <p className="contact-copy">Feel free to contact me if you have any project or collaboration idea.</p>
          <p className="contact-detail"><strong>Email:</strong> <a href="mailto:bishalkawan99@gmail.com">bishalkawan99@gmail.com</a></p>
          <p className="contact-detail"><strong>Location:</strong> Bhaktapur, Nepal</p>
          <p className="contact-copy">You can also send me a message through the contact form on this website.</p>
          <form className="contact-form" action="https://formspree.io/f/xkoyyaov" method="POST">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required />
            <button type="submit" className="contact-submit">Send</button>
          </form>
        </div>
      </section>

      <div id="mouse-gradient" />
      <div id="ripple-layer" aria-hidden="true">
        {ripples.map((ripple) => <div className="ripple" key={ripple.id} style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }} />)}
      </div>
      <footer className="site-footer"><p>© 2026 Bishal Kawan. All rights reserved.</p></footer>
    </div>
  );
}