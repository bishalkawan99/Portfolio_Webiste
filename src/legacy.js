const mouseGradient = document.getElementById('mouse-gradient');
const rippleLayer = document.getElementById('ripple-layer');
const words = document.querySelectorAll('.word-animate');
const floatingItems = document.querySelectorAll('.floating');
const aboutFrame = document.getElementById('about-animation');
const robotFollow = document.getElementById('robot-follow');
const skillsSection = document.getElementById('skills');
const skillsGlow = document.querySelector('.skills-glow');
let scrollTriggered = false;
const scrollLockClass = 'no-scroll';

function lockPageScroll() {
  document.body.classList.add(scrollLockClass);
}

function unlockPageScroll() {
  document.body.classList.remove(scrollLockClass);
}

function getHomeAnimationDuration() {
  const maxDelay = Array.from(words).reduce((max, word) => Math.max(max, Number(word.dataset.delay) || 0), 0);
  return maxDelay + 900;
}

function animateWords() {
  words.forEach(word => {
    const delay = Number(word.dataset.delay) || 0;
    window.setTimeout(() => {
      word.style.animation = 'word-appear 0.8s ease-out forwards';
    }, delay);
  });
}

function updateMouseGradient(event) {
  if (!mouseGradient) return;
  mouseGradient.style.left = `${event.clientX}px`;
  mouseGradient.style.top = `${event.clientY}px`;
  mouseGradient.style.opacity = '1';
}

function hideMouseGradient() {
  if (!mouseGradient) return;
  mouseGradient.style.opacity = '0';
}

function createRipple(event) {
  if (!rippleLayer) return;
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = `${event.clientX}px`;
  ripple.style.top = `${event.clientY}px`;
  rippleLayer.appendChild(ripple);
  window.setTimeout(() => ripple.remove(), 1000);
}

function addWordHoverEffects() {
  words.forEach(word => {
    word.addEventListener('mouseenter', () => {
      word.style.textShadow = '0 0 20px rgba(203, 213, 225, 0.5)';
    });
    word.addEventListener('mouseleave', () => {
      word.style.textShadow = 'none';
    });
  });
}

function initAboutAnimation() {
  if (!aboutFrame || !robotFollow) return;

  aboutFrame.addEventListener('mousemove', event => {
    const rect = aboutFrame.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const clampedX = Math.max(24, Math.min(rect.width - 100, x - 35));
    const clampedY = Math.max(24, Math.min(rect.height - 140, y - 35));
    const angled = (x - rect.width / 2) * 0.08;

    robotFollow.style.transform = `translate(${clampedX}px, ${clampedY}px) rotate(${angled}deg)`;
  });

  aboutFrame.addEventListener('mouseenter', () => {
    robotFollow.style.opacity = '1';
  });

  aboutFrame.addEventListener('mouseleave', () => {
    robotFollow.style.opacity = '0.15';
  });
}

function initSkillsGlow() {
  if (!skillsSection || !skillsGlow) return;

  skillsSection.addEventListener('mousemove', event => {
    const rect = skillsSection.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    skillsGlow.style.left = `${x}px`;
    skillsGlow.style.top = `${y}px`;
    skillsGlow.style.opacity = '1';
    skillsGlow.style.transform = 'translate(-50%, -50%) scale(1.05)';
  });

  skillsSection.addEventListener('mouseleave', () => {
    skillsGlow.style.opacity = '0';
  });
}

function initSkillCardKeyboard() {
  const cards = document.querySelectorAll('.skill-card[tabindex]');
  cards.forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.add('keyboard-activated');
        window.setTimeout(() => card.classList.remove('keyboard-activated'), 220);
      }
    });
  });
}

function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.project-filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach(btn => btn.classList.toggle('is-active', btn === button));

      projectItems.forEach(item => {
        const matches = selectedFilter === 'all' || item.dataset.category === selectedFilter;
        item.classList.toggle('is-hidden', !matches);
      });
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const targetId = link.getAttribute('href');
    if (targetId.length <= 1) return;
    link.addEventListener('click', event => {
      event.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initSectionReveal() {
  const revealItems = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealItems.forEach(item => observer.observe(item));
}

function startFloating() {
  if (scrollTriggered) return;
  scrollTriggered = true;
  floatingItems.forEach((item, index) => {
    const delay = parseFloat(item.style.animationDelay || '0') * 1000 + index * 100;
    window.setTimeout(() => {
      item.style.animationPlayState = 'running';
      item.style.opacity = '1';
    }, delay);
  });
}

function revealNavAndSocial() {
  const navItems = document.querySelectorAll('.top-nav a');
  const social = document.querySelector('.bottom-social');
  navItems.forEach((item, index) => {
    window.setTimeout(() => {
      item.classList.add('visible');
    }, index * 1200);
  });
  const totalNavDelay = navItems.length * 1200;
  if (social) {
    window.setTimeout(() => {
      social.classList.add('visible');
    }, totalNavDelay + 500);
  }
}

window.addEventListener('mousemove', updateMouseGradient);
window.addEventListener('mouseleave', hideMouseGradient);
window.addEventListener('click', createRipple);
window.addEventListener('scroll', startFloating, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
  lockPageScroll();
  animateWords();
  addWordHoverEffects();
  initSmoothScroll();
  initSectionReveal();
  initAboutAnimation();
  initSkillsGlow();
  initSkillCardKeyboard();
  initProjectFilters();
  startFloating();

  const maxDelay = Array.from(words).reduce((max, word) => {
    const delay = Number(word.dataset.delay) || 0;
    return Math.max(max, delay);
  }, 0);

  const homeAnimationDuration = maxDelay + 900;
  window.setTimeout(unlockPageScroll, homeAnimationDuration);

  const revealDelay = maxDelay + 1100;
  window.setTimeout(revealNavAndSocial, revealDelay);
});
