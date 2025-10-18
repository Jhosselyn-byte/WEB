document.addEventListener('DOMContentLoaded', function() {
  const saludo = document.getElementById('saludo');
  const hora = new Date().getHours();
  let mensaje = '';
  if (hora < 12) {
    mensaje = '¡Buenos días! Bienvenido al portafolio inspirado en Senku.';
  } else if (hora < 18) {
    mensaje = '¡Buenas tardes! Explora la ciencia como Senku.';
  } else {
    mensaje = '¡Buenas noches! Hora de simular como en Dr. Stone.';
  }
  saludo.innerHTML = mensaje;
});
