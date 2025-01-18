const board = Array(9).fill(null);
let playerSymbol = null;
let computerSymbol = null;
let currentPlayer = null;

const cells = document.querySelectorAll(".cell");
const symbolPicker = document.getElementById("symbol-picker");
const gameBoard = document.getElementById("game-board");
const gameStatus = document.getElementById("game-status");
const restartButton = document.getElementById("restart");

document.getElementById("choose-x").addEventListener("click", () => startGame("X"));
document.getElementById("choose-o").addEventListener("click", () => startGame("O"));
restartButton.addEventListener("click", resetGame);

function startGame(symbol) {
  playerSymbol = symbol;
  computerSymbol = symbol === "X" ? "O" : "X";
  currentPlayer = "player";
  symbolPicker.classList.add("hidden");
  gameBoard.classList.remove("hidden");
  gameStatus.textContent = "Your turn!";
}

cells.forEach(cell => {
  cell.addEventListener("click", () => handleCellClick(cell));
});

function handleCellClick(cell) {
  const index = cell.dataset.index;

  if (board[index] || currentPlayer !== "player") return;

  board[index] = playerSymbol;
  cell.textContent = playerSymbol;
  currentPlayer = "computer";

  if (checkWin(playerSymbol)) {
    gameStatus.textContent = "You win!";
    endGame();
  } else if (board.every(cell => cell)) {
    gameStatus.textContent = "It's a draw!";
    endGame();
  } else {
    gameStatus.textContent = "Computer's turn...";
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  const availableMoves = board.map((cell, index) => (cell ? null : index)).filter(index => index !== null);

  const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  board[move] = computerSymbol;
  cells[move].textContent = computerSymbol;

  if (checkWin(computerSymbol)) {
    gameStatus.textContent = "Computer wins!";
    endGame();
  } else if (board.every(cell => cell)) {
    gameStatus.textContent = "It's a draw!";
    endGame();
  } else {
    currentPlayer = "player";
    gameStatus.textContent = "Your turn!";
  }
}

function checkWin(symbol) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
  ];

  return winningCombinations.some(combination =>
    combination.every(index => board[index] === symbol)
  );
}

function endGame() {
  currentPlayer = null;
  restartButton.classList.remove("hidden");
}

function resetGame() {
  board.fill(null);
  cells.forEach(cell => (cell.textContent = ""));
  symbolPicker.classList.remove("hidden");
  gameBoard.classList.add("hidden");
  gameStatus.textContent = "";
  restartButton.classList.add("hidden");
}
