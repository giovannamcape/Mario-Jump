const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const overlay = document.getElementById('overlay'); // O fundo cinza transparente
const gameOverScreen = document.getElementById('game-over-screen'); // A tela de Game Over
const restartButton = document.getElementById('restart-button'); // O botão de Restart

let isGameActive = true;  // Variável para verificar se o jogo está em andamento
let isJumping = false;    // Para controlar o estado do pulo

// Função para exibir o fundo transparente e a tela de Game Over
const showGameOver = () => {
    overlay.classList.remove('hidden'); // Exibe o fundo transparente
    gameOverScreen.classList.remove('hidden'); // Exibe a tela de Game Over
    isGameActive = false;  // Desativa o reconhecimento de toques e cliques após a derrota
};

// Função para reiniciar o jogo
const resetGame = () => {
    overlay.classList.add('hidden'); // Oculta o fundo transparente
    gameOverScreen.classList.add('hidden'); // Oculta a tela de Game Over
    mario.style.animation = '';
    mario.style.bottom = '0';
    mario.src = './images/mario.gif'; // Volta para a imagem original do Mario
    mario.style.width = '155px';
    mario.style.marginLeft = '';

    pipe.style.animation = 'pipe-animation 1.5s infinite linear'; // Reinicia a animação do cano
    pipe.style.left = '';

    isGameActive = true;  // Ativa o reconhecimento de toques e cliques ao reiniciar o jogo
    startGameLoop(); // Reinicia o loop do jogo
};

// Função para o pulo
const jump = () => {
    if (isGameActive && !isJumping) { // Só permite o pulo se o jogo estiver ativo
        isJumping = true;
        mario.classList.add('jump'); // Adiciona a classe para o pulo

        setTimeout(() => {
            mario.classList.remove('jump'); // Remove a classe de pulo depois de 800ms
            isJumping = false; // O pulo acabou, Mario pode pular novamente
        }, 800); // O tempo do pulo é o mesmo do CSS
    }
};

// Adiciona evento para o pulo ao pressionar qualquer tecla (para computador)
document.addEventListener('keydown', jump);

// Adiciona evento para o pulo no toque (para dispositivos móveis)
document.addEventListener('touchstart', jump);

// Variável para armazenar o loop do jogo
let gameLoop;

// Lógica principal do jogo
const startGameLoop = () => {
    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft; // Posição horizontal do cano
        const pipeHeight = pipe.offsetHeight; // Altura do cano
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); // Posição do Mario a partir da parte inferior

        // Verifica se o Mario está perto o suficiente do cano para colidir
        if (pipePosition <= 120 && pipePosition > 0) {
            // Se o Mario está em uma altura onde ele pode colidir com o cano
            if (marioPosition < pipeHeight) {
                // Colisão detectada
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
