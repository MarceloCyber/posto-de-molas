const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
toggle?.addEventListener('click', () => header.classList.toggle('menu-open'));
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => header.classList.remove('menu-open')));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const spring = document.querySelector('.hero-spring');
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  document.documentElement.style.setProperty('--scroll-progress', `${max ? (window.scrollY / max) * 100 : 0}%`);
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
document.querySelector('.hero-visual')?.addEventListener('pointermove', (event) => {
  if (window.innerWidth < 801) return;
  const box = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width - .5;
  const y = (event.clientY - box.top) / box.height - .5;
  spring.style.transform = `translate(${x * 11}px, ${y * 11}px) rotate(${x * 2}deg)`;
});
document.querySelector('.hero-visual')?.addEventListener('pointerleave', () => spring.style.transform = '');
