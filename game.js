const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let pig = { x: 50, y: 250, width: 30, height: 30, dy: 0 };
let coins = [];
let bombs = [];  // Array para las bombas
let score = 0;
let gravity = 1;
let isJumping = false;
let jumpCount = 0;

// Generar una nueva moneda en una posición aleatoria
function spawnCoin() {
    const y = Math.random() * (canvas.height - 100);
    coins.push({ x: canvas.width, y: y, width: 20, height: 20 });
}

// Generar una nueva bomba en una posición aleatoria
function spawnBomb() {
    const y = Math.random() * (canvas.height - 100);
    bombs.push({ x: canvas.width, y: y, width: 30, height: 30 });
}

// Actualizar la posición de las monedas
function updateCoins() {
    for (let i = 0; i < coins.length; i++) {
        coins[i].x -= 2;

        if (coins[i].x + coins[i].width < 0) {
            coins.splice(i, 1);
            i--;
        }
    }
}

// Actualizar la posición de las bombas
function updateBombs() {
    for (let i = 0; i < bombs.length; i++) {
        bombs[i].x -= 2;

        if (bombs[i].x + bombs[i].width < 0) {
            bombs.splice(i, 1);
            i--;
        }
    }
}

// Detectar colisiones con monedas y bombas
function detectCollisions() {
    // Colisiones con monedas
    for (let i = 0; i < coins.length; i++) {
        if (pig.x < coins[i].x + coins[i].width &&
            pig.x + pig.width > coins[i].x &&
            pig.y < coins[i].y + coins[i].height &&
            pig.y + pig.height > coins[i].y) {
            score++;
            coins.splice(i, 1);
            i--;
        }
    }
    // Colisiones con bombas
    for (let i = 0; i < bombs.length; i++) {
        if (pig.x < bombs[i].x + bombs[i].width &&
            pig.x + pig.width > bombs[i].x &&
            pig.y < bombs[i].y + bombs[i].height &&
            pig.y + pig.height > bombs[i].y) {
            resetGame(); // Llamada a la función que reinicia el juego
            break;
        }
    }
}

// Dibuja el chanchito, monedas, y bombas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar chanchito
    ctx.fillStyle = 'pink';
    ctx.fillRect(pig.x, pig.y, pig.width, pig.height);
    
    // Dibujar monedas
    ctx.fillStyle = 'gold';
    for (let coin of coins) {
        ctx.fillRect(coin.x, coin.y, coin.width, coin.height);
    }
    
    // Dibujar bombas
    ctx.fillStyle = 'red';
    for (let bomb of bombs) {
        ctx.fillRect(bomb.x, bomb.y, bomb.width, bomb.height);
    }
    
    // Dibujar puntaje
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 10);
}

// Reiniciar el juego
function resetGame() {
    pig.y = 250;
    pig.dy = 0;
    score = 0;
    coins = [];
    bombs = [];
    jumpCount = 0;
    isJumping = false;
}

// Actualizar el estado del juego
function update() {
    if (isJumping) {
        pig.dy += gravity;
        pig.y += pig.dy;

        if (pig.y >= 250) {
            pig.y = 250;
            pig.dy = 0;
            isJumping = false;
            jumpCount = 0;
        }
    }
    
    updateCoins();
    updateBombs();
    detectCollisions();
    draw();
    
    requestAnimationFrame(update);
}

// Función de salto
function jump() {
    if (jumpCount < 2) {
        pig.dy = -15;
        isJumping = true;
        jumpCount++;
    }
}

// Control de salto para teclado
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

// Control de salto para pantallas táctiles
window.addEventListener('touchstart', (e) => {
    jump();
    e.preventDefault();
});

// Evitar que aparezca el menú "copiar" al hacer doble clic en dispositivos móviles
window.addEventListener('dblclick', (e) => {
    e.preventDefault();
});

// Spawnear monedas cada 1 segundo
setInterval(spawnCoin, 1000);

// Spawnear bombas cada 3 segundos
setInterval(spawnBomb, 3000);

// Iniciar el juego
update();


