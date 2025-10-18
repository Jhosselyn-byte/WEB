// Animación fade-in al hacer scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(el => appearOnScroll.observe(el));

// Partículas animadas
const particlesContainer = document.getElementById('particles');

function createParticle() {
  const particle = document.createElement('div');
  particle.style.position = 'absolute';
  particle.style.width = '2px';
  particle.style.height = '2px';
  particle.style.background = '#0aff0a';
  particle.style.boxShadow = '0 0 5px #0aff0a';
  particle.style.top = Math.random() * 100 + 'vh';
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.pointerEvents = 'none';
  particlesContainer.appendChild(particle);

  let duration = Math.random() * 3 + 2;
  particle.style.animation = `float ${duration}s linear forwards`;
  setTimeout(() => particle.remove(), duration * 1000);
}

// CSS keyframes dinámico
const style = document.createElement('style');
style.innerHTML = `
@keyframes float {
  to {
    transform: translateY(-120vh) translateX(${Math.random() * 100 - 50}px);
    opacity: 0;
  }
}`;
document.head.appendChild(style);

setInterval(createParticle, 100);