const player1 = 'X';
const player2 = 'O';
let currentPlayer = player1;
let gameStatus = ['','','','','','','','',''];
let gameMode = 'player-vs-player';
let playerSymbol = 'X';

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const modeSelection = document.getElementById('mode-selection');
const symbolSelection = document.getElementById('symbol-selection');
const mode = document.getElementById('mode');
const symbol = document.getElementById('symbol');
const notification = document.getElementById('notification');

function makeMove(cellIndex) {
    if (gameStatus[cellIndex] === '' &&!checkWinner()) {
        gameStatus[cellIndex] = currentPlayer;
        cells[cellIndex].innerText = currentPlayer;
        
        if (checkWinner()) {
            statusDisplay.innerText = `${currentPlayer} wins!`;
            notification.innerText = `${currentPlayer} wins!`;
            notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        } else if (!gameStatus.includes('')) {
            statusDisplay.innerText = `It's a draw!`;
        } else {
            currentPlayer = currentPlayer === player1? player2 : player1;
            statusDisplay.innerText = `Current player: ${currentPlayer}`;
            if (currentPlayer === player2 && gameMode === 'player-vs-bot') {
                setTimeout(() => {
                    const availableCells = gameStatus.filter(cell => cell === '');
                    const randomIndex = Math.floor(Math.random() * availableCells.length);
                    makeMove(availableCells.indexOf(''));
                }, 500);
            }
        }
    }
}

function checkWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameStatus[a] && gameStatus[a] === gameStatus[b] && gameStatus[a] === gameStatus[c]) {
            return true;
        }
    }
    return false;
}

function resetBoard() {
    gameStatus = ['','','','','','','','',''];
    cells.forEach(cell => cell.innerText = '');
    statusDisplay.innerText = `Current player: ${currentPlayer}`;
    currentPlayer = player1;
    notification.style.display = 'none';
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        makeMove(index);
    });
});

resetButton.addEventListener('click', () => {
    resetBoard();
});


symbolSelection.addEventListener('change', () => {
    playerSymbol = symbol.value;
    currentPlayer =playerSymbol;
    statusDisplay.innerText = `Current player: ${currentPlayer}`;
});

if (symbol.value === 'O') {
    currentPlayer = player2;
    statusDisplay.innerText = `Current player: ${currentPlayer}`;
}