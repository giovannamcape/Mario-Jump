const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const overlay = document.getElementById('overlay'); // O fundo cinza transparente
const gameOverScreen = document.getElementById('game-over-screen'); // A tela de Game Over
const restartButton = document.getElementById('restart-button'); // O botão de Restart

// Função para exibir o fundo transparente e a tela de Game Over
const showGameOver = () => {
    overlay.classList.remove('hidden'); // Exibe o fundo transparente
    gameOverScreen.classList.remove('hidden'); // Exibe a tela de Game Over
};

// Função para reiniciar o jogo
const resetGame = () => {
    overlay.classList.add('hidden'); // Oculta o fundo transparente
    gameOverScreen.classList.add('hidden'); // Oculta a tela de Game Over
    mario.style.animation = '';
    mario.style.bottom = '';
    mario.src = './images/mario.gif'; // Volta para a imagem original do Mario
    mario.style.width = '155px';
    mario.style.marginLeft = '';

    pipe.style.animation = 'pipe-animation 1.5s infinite linear'; // Reinicia a animação do cano
    pipe.style.left = '';

    startGameLoop(); // Reinicia o loop do jogo
};

// Função para o pulo
const jump = () => {
    mario.classList.add('jump');

        setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

// Variável para armazenar o loop do jogo
let gameLoop;

// Lógica principal do jogo
const startGameLoop = () => {
    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            // Quando o Mario colide com o cano
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;

                mario.style.animation = 'none';
                mario.style.bottom = `${marioPosition}px`;

                mario.src = './images/game-over.png';
                mario.style.width = '75px';
                mario.style.marginLeft = '50px';

                clearInterval(gameLoop); // Para o loop
                showGameOver(); // Exibe o fundo transparente e a tela de Game Over
            }
    }, 10);
};

// Inicia o jogo
startGameLoop();

// Adiciona evento para o pulo com teclado (computadores)
document.addEventListener('keydown', jump);

// Adiciona evento para o pulo com toque (dispositivos móveis)
document.addEventListener('touchstart', jump);

// Adiciona evento ao botão Restart
restartButton.addEventListener('click', resetGame);
