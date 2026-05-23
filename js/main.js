const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const scrollTopBtn = document.getElementById('scroll-top');
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

document.getElementById('year').textContent = new Date().getFullYear();

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

const closeMenu = () => {
  navMenu.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
};

navLinks.forEach((link) => link.addEventListener('click', closeMenu));
document.querySelector('.nav-cta')?.addEventListener('click', closeMenu);

const setActiveLink = () => {
  const scrollPos = window.scrollY + 140;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((l) => l.classList.remove('active'));
      link?.classList.add('active');
    }
  });
};

window.addEventListener('scroll', () => {
  setActiveLink();
  scrollTopBtn.classList.toggle('show', window.scrollY > 450);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

const validators = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Podaj poprawne imię (min. 2 znaki).'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Podaj poprawny adres email.'),
  phone: (v) => (/^[+\d\s()-]{7,}$/.test(v) ? '' : 'Podaj poprawny numer telefonu.'),
  message: (v) => (v.trim().length >= 10 ? '' : 'Wiadomość powinna mieć minimum 10 znaków.'),
};

function validateField(field) {
  const rule = validators[field.name];
  if (!rule) return true;
  const errorText = rule(field.value);
  const errorEl = document.querySelector(`[data-error-for="${field.name}"]`);
  if (errorEl) errorEl.textContent = errorText;
  return errorText === '';
}

form?.addEventListener('input', (e) => {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
    validateField(e.target);
  }
});

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  statusEl.textContent = '';

  const fields = [...form.querySelectorAll('input, textarea')];
  const isValid = fields.every((field) => validateField(field));

  if (!isValid) {
    statusEl.textContent = 'Popraw błędy w formularzu i spróbuj ponownie.';
    statusEl.style.color = '#b00020';
    return;
  }

  statusEl.textContent = 'Dziękujemy! Twoja wiadomość została wysłana (demo).';
  statusEl.style.color = '#1d6a4a';
  form.reset();
});
