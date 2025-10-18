// Saludo dinámico según la hora
function mostrarSaludo() {
  const hora = new Date().getHours();
  let mensaje = '';
  let periodo = '';

  if (hora >= 5 && hora < 12) {
    mensaje = 'Buenos días';
    periodo = 'Mañana';
  } else if (hora >= 12 && hora < 18) {
    mensaje = 'Buenas tardes';
    periodo = 'Tarde';
  } else if (hora >= 18 && hora < 21) {
    mensaje = 'Buenas noches';
    periodo = 'Atardecer';
  } else {
    mensaje = 'Buenas noches';
    periodo = 'Noche';
  }

  // Crear elemento de saludo si no existe
  let saludoDiv = document.getElementById('saludo-dinamico');
  if (!saludoDiv) {
    saludoDiv = document.createElement('div');
    saludoDiv.id = 'saludo-dinamico';
    saludoDiv.style.cssText = `
      position: fixed;
      top: 10px;
      right: 20px;
      background: rgba(10, 255, 10, 0.1);
      border: 2px solid #0aff0a;
      border-radius: 8px;
      padding: 12px 20px;
      color: #0aff0a;
      font-family: 'Orbitron', sans-serif;
      font-size: 0.9rem;
      z-index: 1000;
      box-shadow: 0 0 10px #0aff0a;
    `;
    document.body.appendChild(saludoDiv);
  }

  saludoDiv.innerHTML = `${mensaje} - ${periodo}`;

  // Actualizar cada minuto
  setTimeout(mostrarSaludo, 60000);
}

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

// Partículas animadas dinámicas
const particlesContainer = document.getElementById('particles');
let particleCount = 0;
const maxParticles = 100;

function createParticle() {
  if (particleCount >= maxParticles) return;
  
  const particle = document.createElement('div');
  particle.style.position = 'absolute';
  particle.style.width = Math.random() * 3 + 1 + 'px';
  particle.style.height = particle.style.width;
  particle.style.background = '#0aff0a';
  particle.style.boxShadow = '0 0 5px #0aff0a';
  particle.style.top = Math.random() * 100 + 'vh';
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.pointerEvents = 'none';
  particle.style.borderRadius = '50%';
  particlesContainer.appendChild(particle);
  particleCount++;

  let duration = Math.random() * 4 + 2;
  let offsetX = Math.random() * 100 - 50;
  
  particle.style.animation = `float ${duration}s linear forwards`;
  
  // CSS keyframes dinámico
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes float {
      0% {
        opacity: 1;
      }
      100% {
        transform: translateY(-120vh) translateX(${offsetX}px) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    particle.remove();
    particleCount--;
  }, duration * 1000);
}

// Crear partículas con velocidad variable
setInterval(createParticle, 150);

// Efecto de clic para crear partículas adicionales
document.addEventListener('click', (e) => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '3px';
      particle.style.height = '3px';
      particle.style.background = '#0aff0a';
      particle.style.boxShadow = '0 0 8px #0aff0a';
      particle.style.left = e.clientX + 'px';
      particle.style.top = e.clientY + 'px';
      particle.style.pointerEvents = 'none';
      particle.style.borderRadius = '50%';
      particlesContainer.appendChild(particle);

      const angle = (i / 5) * Math.PI * 2;
      const velocity = 3;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      let x = e.clientX;
      let y = e.clientY;
      let opacity = 1;

      const animate = () => {
        x += vx;
        y += vy;
        opacity -= 0.02;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = opacity;

        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      };
      animate();
    }, i * 50);
  }
});

// Inicializar saludo al cargar
document.addEventListener('DOMContentLoaded', mostrarSaludo);