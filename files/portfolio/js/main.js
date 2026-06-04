// =============================================
// NAV SCROLL + BURGER
// =============================================
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');

window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 40);
});

burger?.addEventListener('click', () => {
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// =============================================
// HERO GRID CANVAS
// =============================================
const canvas = document.getElementById('grid-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let dots = [];
  let animFrame;

  function resize() {
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    initDots();
  }

  function initDots() {
    dots = [];
    const cols = Math.ceil(canvas.offsetWidth / 60);
    const rows = Math.ceil(canvas.offsetHeight / 60);
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        dots.push({
          x: i * 60,
          y: j * 60,
          baseOpacity: Math.random() * 0.4 + 0.05,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.008,
        });
      }
    }
  }

  let mouseX = -999, mouseY = -999;
  canvas.closest('.hero-bg')?.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    t += 0.5;

    for (const d of dots) {
      d.phase += d.speed;
      const pulse = (Math.sin(d.phase) + 1) / 2;
      const dist = Math.hypot(d.x - mouseX, d.y - mouseY);
      const proximity = Math.max(0, 1 - dist / 180);
      const opacity = d.baseOpacity + pulse * 0.15 + proximity * 0.5;

      ctx.beginPath();
      ctx.arc(d.x, d.y, 1.2 + proximity * 2, 0, Math.PI * 2);
      ctx.fillStyle = proximity > 0.1
        ? `rgba(232, 255, 71, ${opacity})`
        : `rgba(140, 140, 180, ${opacity})`;
      ctx.fill();
    }

    // Faint grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.025)';
    ctx.lineWidth = 0.5;
    const cols = Math.ceil(canvas.offsetWidth / 60);
    const rows = Math.ceil(canvas.offsetHeight / 60);
    for (let i = 0; i <= cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 60, 0);
      ctx.lineTo(i * 60, canvas.offsetHeight);
      ctx.stroke();
    }
    for (let j = 0; j <= rows; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * 60);
      ctx.lineTo(canvas.offsetWidth, j * 60);
      ctx.stroke();
    }

    animFrame = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => { cancelAnimationFrame(animFrame); resize(); draw(); });
}

// =============================================
// SCROLL REVEAL
// =============================================
const revealEls = document.querySelectorAll('.reveal-on-scroll');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// =============================================
// COUNTER ANIMATION
// =============================================
function animateCounter(el, target, duration = 1500) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
if (statNums.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => counterObserver.observe(el));
}

// =============================================
// PROJECT CARD STAGGER
// =============================================
const cards = document.querySelectorAll('.project-card, .lab-card, .week-entry');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)';
  cardObserver.observe(card);
});

// =============================================
// ACTIVE NAV LINK
// =============================================
const path = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') && path.includes(a.getAttribute('href').replace('../', '').replace('pages/', ''))) {
    a.style.color = 'var(--accent)';
  }
});
