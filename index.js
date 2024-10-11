// Variables globales
let canvas, ctx;
let chanchito, monedas = [];
let puntos = 0;
let velocidad = 6;
let salto = 20;
let gravedad = 1;

// Inicializa el juego
function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  chanchito = {
    x: 50,
    y: canvas.height - 50,
    ancho: 30,
    alto: 30,
    velocidadX: 0,
    velocidadY: 0
  };
  monedas.push({
    x: Math.random() * (canvas.width - 20),
    y: Math.random() * (canvas.height - 20),
    ancho: 10,
    alto: 10
  });
  intervalo = setInterval(actualizar, 1000 / 60);
}

// Actualiza el juego
function actualizar() {
  // Mueve el chanchito
  chanchito.x += chanchito.velocidadX;
  chanchito.y += chanchito.velocidadY;
  chanchito.velocidadY += gravedad;
  
  // Salta el chanchito
  if (chanchito.y + chanchito.alto > canvas.height) {
    chanchito.velocidadY = -salto;
  }
  
  // Dibuja el chanchito
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'pink';
  ctx.fillRect(chanchito.x, chanchito.y, chanchito.ancho, chanchito.alto);
  
  // Dibuja las monedas
  for (let i = 0; i < monedas.length; i++) {
    ctx.fillStyle = 'gold';
    ctx.fillRect(monedas[i].x, monedas[i].y, monedas[i].ancho, monedas[i].alto);
    
    // Comprueba si el chanchito ha recogido la moneda
    if (chanchito.x + chanchito.ancho > monedas[i].x &&
        chanchito.x < monedas[i].x + monedas[i].ancho &&
        chanchito.y + chanchito.alto > monedas[i].y &&
        chanchito.y < monedas[i].y + monedas[i].alto) {
      puntos++;
      monedas.splice(i, 1);
      monedas.push({
        x: Math.random() * (canvas.width - 20),
        y: Math.random() * (canvas.height - 20),
        ancho: 10,
        alto: 10
      });
    }
  }
  
  // Muestra los puntos
  ctx.font = '24px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Puntos: ' + puntos, 10, 10);
}

// Maneja los eventos del teclado
document.addEventListener('keydown', function(event) {
  if (event.key === ' ') {
    chanchito.velocidadY = -salto;
  }
});

init();
