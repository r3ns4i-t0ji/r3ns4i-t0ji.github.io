const pages = [...document.querySelectorAll('.page')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menu-toggle');

function showPage(name) {
  const target = document.getElementById(`page-${name}`);
  if (!target) return;
  pages.forEach(page => page.classList.toggle('active', page === target));
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.page === name));
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `#${name}`);
}

navLinks.forEach(link => link.addEventListener('click', () => showPage(link.dataset.page)));
document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => showPage(button.dataset.go)));
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

const initialPage = location.hash.replace('#', '');
if (initialPage && document.getElementById(`page-${initialPage}`)) showPage(initialPage);

document.getElementById('year').textContent = new Date().getFullYear();
