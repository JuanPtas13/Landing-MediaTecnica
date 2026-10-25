import './style.css';

const appUrl = import.meta.env.VITE_APP_URL || 'https://media-tecnica-frontend.vercel.app/';

document.querySelectorAll('[data-app-link]').forEach((link) => {
  link.href = appUrl;
});

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menú' : 'Cerrar menú');
  navigation.classList.toggle('is-open', !isExpanded);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    navigation.classList.remove('is-open');
  });
});

const contactForm = document.querySelector('#contact-form');
const contactResponse = document.querySelector('#contact-response');
const contactSubmit = contactForm.querySelector('button[type="submit"]');
const contactSubmitLabel = contactForm.querySelector('.submit-label');
let contactSubmissionInProgress = false;

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (contactSubmissionInProgress) return;
  contactSubmissionInProgress = true;
  contactSubmit.disabled = true;
  contactSubmitLabel.textContent = 'Enviando...';
  contactForm.setAttribute('aria-busy', 'true');
  contactResponse.className = 'contact-response is-pending';
  contactResponse.textContent = 'Estamos enviando tu solicitud.';

  try {
    const formData = new URLSearchParams(new FormData(contactForm));
    const response = await fetch(contactForm.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    });
    const result = await response.json();

    if (!response.ok || !result.success || result.success === 'false') {
      throw new Error(result.message || 'El servicio de correo no aceptó la solicitud.');
    }

    contactForm.reset();
    contactResponse.className = 'contact-response is-success';
    contactResponse.textContent = '¡Solicitud enviada! Nos pondremos en contacto contigo pronto.';
  } catch (error) {
    console.error('No se pudo enviar el formulario de contacto:', error);
    contactResponse.className = 'contact-response is-error';
    contactResponse.textContent = 'No pudimos enviar tu solicitud. Inténtalo de nuevo o escríbenos a juanraze.13@gmail.com.';
  } finally {
    contactSubmissionInProgress = false;
    contactSubmit.disabled = false;
    contactSubmitLabel.textContent = 'Enviar solicitud';
    contactForm.removeAttribute('aria-busy');
  }
});

const revealItems = document.querySelectorAll('.role-card, .steps li, .closing-card');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => {
    item.classList.add('reveal');
    revealObserver.observe(item);
  });
}
