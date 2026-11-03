// Initialize Lucide Icons & Interactivity
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initParticleCanvas();
  initDynamicTextRotator();
  init3DCardTilt();
  initMobileMenu();
  initContactForm();
  initModalForm();
  initScrollNav();
});

// Primary Contact Numbers
const WHATSAPP_PHONE = '919819204011';
const PRIMARY_PHONE = '7977526832';

// 1. CLEAN HIGH-PERFORMANCE 3D PARTICLE CONSTELLATION CANVAS
function initParticleCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 70;
  let mouse = { x: null, y: null, maxDist: 140 };

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    width = canvas.width = parent.clientWidth;
    height = canvas.height = parent.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(16, 185, 129, ';
      this.alpha = Math.random() * 0.6 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactivity
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.maxDist) {
          const force = (mouse.maxDist - dist) / mouse.maxDist;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.18 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// 2. KINETIC ROTATING / TYPEWRITER WORD MOTION
function initDynamicTextRotator() {
  const el = document.getElementById('motion-typed-word');
  if (!el) return;

  const words = [
    "Enterprise IT Infrastructure",
    "High-Availability Server Solutions",
    "Biometric Attendance & Access Systems",
    "4K Night-Vision CCTV Surveillance",
    "High-Speed Laptop & PC Upgrades"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// 3. 3D CARD TILT & DYNAMIC CURSOR SPOTLIGHT
function init3DCardTilt() {
  const cards = document.querySelectorAll('.card-3d-tilt');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

// 4. MOBILE MENU DRAWER
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-link');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// 5. STICKY NAV BLUR
function initScrollNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('shadow-xl', 'bg-[#03050c]/98', 'border-slate-800');
    } else {
      nav.classList.remove('shadow-xl', 'bg-[#03050c]/98', 'border-slate-800');
    }
  });
}

// 6. SITE VISIT MODAL (WITH EDITABLE REQUIREMENT FIELD)
function openBookingModal(defaultRequirement = '') {
  const modal = document.getElementById('booking-modal');
  const input = document.getElementById('modal-service');
  if (modal && input) {
    if (defaultRequirement) {
      input.value = defaultRequirement;
    }
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function initModalForm() {
  const form = document.getElementById('modal-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('modal-name').value;
    const phone = document.getElementById('modal-phone').value;
    const service = document.getElementById('modal-service').value;
    const address = document.getElementById('modal-address').value;

    const message = `*Site Visit Booking - N. K Solutions*\nName: ${name}\nPhone: ${phone}\nRequirement: ${service}\nMumbai Location: ${address}\n\nPlease confirm availability for an on-site technician visit.`;

    closeBookingModal();
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  });
}

// 7. MAIN CONTACT FORM
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const phone = document.getElementById('form-phone').value;
    const service = document.getElementById('form-service').value;
    const area = document.getElementById('form-area').value;
    const details = document.getElementById('form-message').value;

    const msg = `*Website Inquiry - N. K Solutions*\nName: ${name}\nPhone: ${phone}\nService: ${service}\nArea: ${area}\nDetails: ${details || 'N/A'}`;

    if (successBox) {
      successBox.classList.remove('hidden');
    }

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
    }, 600);
  });
}
