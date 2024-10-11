// Obtener el elemento del juego
const game = document.getElementById('game');

// Dimensiones del juego (ajusta según tus necesidades)
const gameWidth = 400;
const gameHeight = 300;

// Posiciones iniciales del jugador y la moneda (representados por divs)
let playerX = 50;
let playerY = gameHeight - 20;
let coinX = gameWidth;
let coinY = Math.random() * (gameHeight - 20);

// Velocidades
let playerSpeed = 5;
let coinSpeed = 3;

// Función para mover al jugador
function movePlayer(e) {
  if (e.keyCode === 32) { // Espacio para saltar
    playerY -= 50;
  } else {
    playerY = gameHeight - 20; // Regresar al suelo
  }
  // En lugar de modificar un elemento img, podemos crear divs para representar al jugador y la moneda
  const playerDiv = document.getElementById('player');
  playerDiv.style.top = playerY + 'px';
}

// Función para mover la moneda
function moveCoin() {
  coinX -= coinSpeed;
  if (coinX < 0) {
    coinX = gameWidth;
    coinY = Math.random() * (gameHeight - 20);
  }
  const coinDiv = document.getElementById('coin');
  coinDiv.style.left = coinX + 'px';
  coinDiv.style.top = coinY + 'px';
}

// Función para verificar colisiones
function checkCollision() {
  // Aquí puedes calcular la colisión basándote en las posiciones de los divs del jugador y la moneda
  // Por ejemplo, puedes usar una biblioteca de detección de colisiones si lo prefieres
  const playerDiv = document.getElementById('player');
  const coinDiv = document.getElementById('coin');

  // Lógica simplificada para comprobar si los rectángulos se superponen
  if (
    playerX + 20 > coinX && // 20 es el ancho y alto asumidos del jugador y la moneda
    playerX < coinX + 20 &&
    playerY + 20 > coinY &&
    playerY < coinY + 20
  ) {
    console.log('¡Moneda recolectada!');
    // Aquí puedes agregar lógica para sumar puntos, etc.
    coinX = gameWidth;
    coinY = Math.random() * (gameHeight - 20);
  }
}

// Crear los divs para el jugador y la moneda
const playerDiv = document.createElement('div');
playerDiv.id = 'player';
playerDiv.style.width = '20px';
playerDiv.style.height = '20px';
playerDiv.style.backgroundColor = 'blue';
game.appendChild(playerDiv);

const coinDiv = document.createElement('div');
coinDiv.id = 'coin';
coinDiv.style.width = '20px';
coinDiv.style.height = '20px';
coinDiv.style.backgroundColor = 'yellow';
game.appendChild(coinDiv);

// Manejadores de eventos
document.addEventListener('keydown', movePlayer);
setInterval(moveCoin, 20);
setInterval(checkCollision, 20);
