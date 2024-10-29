const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let pig = { x: 50, y: 250, width: 30, height: 30, dy: 0 };
let coins = [];
let score = 0;
let gravity = 1;
let isJumping = false;
let jumpCount = 0;  // Contador de saltos

// Generar una nueva moneda en una posición aleatoria
function spawnCoin() {
    const y = Math.random() * (canvas.height - 100);
    coins.push({ x: canvas.width, y: y, width: 20, height: 20 });
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

// Detectar colisiones
function detectCollisions() {
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
}

// Dibuja el chanchito y las monedas
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
    
    // Dibujar puntaje
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 10);
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
            jumpCount = 0;  // Reinicia el contador al tocar el suelo
        }
    }
    
    updateCoins();
    detectCollisions();
    draw();
    
    requestAnimationFrame(update);
}

// Función de salto
function jump() {
    if (jumpCount < 2) { // Permitir un máximo de 2 saltos
        pig.dy = -15;
        isJumping = true;
        jumpCount++;  // Incrementa el contador de saltos
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

// Spawnear monedas cada 1 segundo
setInterval(spawnCoin, 1000);

// Iniciar el juego
update();

