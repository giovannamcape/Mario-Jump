const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const overlay = document.getElementById('overlay'); 
const gameOverScreen = document.getElementById('game-over-screen'); 
const restartButton = document.getElementById('restart-button'); 

let isGameActive = true;  
let isJumping = false;    


const showGameOver = () => {
    overlay.classList.remove('hidden'); 
    gameOverScreen.classList.remove('hidden'); 
    isGameActive = false;  
};

// Função para reiniciar o jogo
const resetGame = () => {
    overlay.classList.add('hidden'); 
    gameOverScreen.classList.add('hidden'); 
    mario.style.animation = '';
    mario.style.bottom = '0';
    mario.src = './images/mario.gif'; 
    mario.style.width = '155px';
    mario.style.marginLeft = '';

    pipe.style.animation = 'pipe-animation 1.5s infinite linear'; 
    pipe.style.left = '';

    isGameActive = true;  
    startGameLoop(); 
};

// Função para o pulo
const jump = () => {
    if (isGameActive && !isJumping) { 
        isJumping = true;
        mario.classList.add('jump'); 

        setTimeout(() => {
            mario.classList.remove('jump'); 
            isJumping = false; 
        }, 800); 
    }
};

// Adiciona evento para o pulo ao pressionar qualquer tecla (para computador)
document.addEventListener('keydown', jump);

// Adiciona evento para o pulo no toque (para celular)
document.addEventListener('touchstart', jump);

// loop do jogo
let gameLoop;

// Lógica principal do jogo
const startGameLoop = () => {
    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft; 
        const pipeHeight = pipe.offsetHeight; 
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); 

        
        if (pipePosition <= 120 && pipePosition > 0) {
            
            if (marioPosition < pipeHeight) {
                
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;

                mario.style.animation = 'none';
                mario.style.bottom = `${marioPosition}px`;

                mario.src = './images/game-over.png';
                mario.style.width = '75px';
                mario.style.marginLeft = '50px';

                clearInterval(gameLoop); // Para o loop
                showGameOver(); // Exibe a tela de Game Over
            }
        }
    }, 10);
};

// Inicia o jogo
startGameLoop();

// Adiciona evento ao botão Restart
restartButton.addEventListener('click', resetGame);
