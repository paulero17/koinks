// Obtener elementos del DOM
const game = document.getElementById('game');
const chanchito = document.getElementById('chanchito');
const moneda = document.getElementById('moneda');

// Dimensiones del juego
const gameWidth = game.clientWidth;
const gameHeight = game.clientHeight;

// Posiciones iniciales
let chanchitoX = 50;
let chanchitoY = gameHeight - chanchito.height;
let monedaX = gameWidth;
let monedaY = Math.random() * (gameHeight - moneda.height);

// Velocidades
let chanchitoSpeed = 5;
let monedaSpeed = 3;

// Función para mover al chanchito
function moveChanchito(e) {
    if (e.keyCode === 32) { // Espacio para saltar
        chanchitoY -= 50;
    } else {
        chanchitoY = gameHeight - chanchito.height; // Regresar al suelo
    }
    chanchito.style.top = chanchitoY + 'px';
}

// Función para mover la moneda
function moveMoneda() {
    monedaX -= monedaSpeed;
    if (monedaX + moneda.width < 0) {
        monedaX = gameWidth;
        monedaY = Math.random() * (gameHeight - moneda.height);
    }
    moneda.style.left = monedaX + 'px';
    moneda.style.top = monedaY + 'px';
}

// Función para verificar colisiones
function checkCollision() {
    if (chanchitoX + chanchito.width > monedaX &&
        chanchitoX < monedaX + moneda.width &&
        chanchitoY + chanchito.height > monedaY &&
        chanchitoY < monedaY + moneda.height) {
        // Colisión: ¡Recogió la moneda!
        console.log('¡Moneda recolectada!');
        // Aquí puedes agregar lógica para sumar puntos, etc.
        monedaX = gameWidth; // Reiniciar posición de la moneda
        monedaY = Math.random() * (gameHeight - moneda.height);
    }
}

// Manejadores de eventos
document.addEventListener('keydown', moveChanchito);
setInterval(moveMoneda, 20);
setInterval(checkCollision, 20);
