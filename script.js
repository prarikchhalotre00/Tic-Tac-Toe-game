const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const playerSetup = document.getElementById("playerSetup");
const gameArea = document.getElementById("gameArea");

const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");

const startBtn = document.getElementById("startGame");
const restartBtn = document.getElementById("restart");
const changePlayersBtn = document.getElementById("changePlayers");

let playerNames = {
  X: "Player X",
  O: "Player O",
};

let currentPlayer = "X";
let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start game with player names
startBtn.addEventListener("click", function () {
  const nameX = playerXInput.value.trim();
  const nameO = playerOInput.value.trim();

  if (!nameX || !nameO) {
    alert("Please enter both players' names!");
    return;
  }

  if (nameX.toLowerCase() === nameO.toLowerCase()) {
    alert("Please enter two different names!");
    return;
  }

  playerNames.X = nameX;
  playerNames.O = nameO;

  playerSetup.hidden = true;
  gameArea.hidden = false;

  restartGame();
});

// Handle cell clicks
function handleCellClick(event) {
  const cell = event.currentTarget;
  const index = Array.from(cells).indexOf(cell);

  if (!gameActive || gameState[index] !== "") {
    return;
  }

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.style.color = currentPlayer === "X" ? "#007bff" : "#e63946";

  cell.disabled = true;

  if (checkWinner()) {
    statusText.textContent = `🎉 ${playerNames[currentPlayer]} (${currentPlayer}) Wins!`;

    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "🤝 It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  statusText.textContent = `${playerNames[currentPlayer]}'s Turn (${currentPlayer})`;
}

// Check winning combinations
function checkWinner() {
  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;

    return (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

// Restart the current round
function restartGame() {
  currentPlayer = "X";
  gameActive = true;

  gameState = ["", "", "", "", "", "", "", "", ""];

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.style.color = "";
  });

  statusText.textContent = `${playerNames.X}'s Turn (X)`;
}

// Change player names
function changePlayers() {
  gameActive = false;
  playerSetup.hidden = false;
  gameArea.hidden = true;

  playerXInput.value = playerNames.X;
  playerOInput.value = playerNames.O;
}

// Add event listeners
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);
changePlayersBtn.addEventListener("click", changePlayers);
