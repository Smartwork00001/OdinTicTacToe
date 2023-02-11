const boardDiv = document.querySelector("#board");
const mO = document.querySelector("#mO");
const mX = document.querySelector("#mX");
const okButton = document.querySelector("#okButton");
const okButtonDiv = document.querySelector(".okButtonDiv");
const okButtonText = document.querySelector("#okButtonText");
const newGame = document.querySelector("#new-game");

function removeMessage() {
  okButtonDiv.style.display = "none";
}

function displayMessage(winner) {
  okButtonText.textContent = `Player ${winner} has won`;
  okButtonDiv.style.display = "flex";
}

const gameBoard = (function (doc) {
  const board = [];
  let move;
  let turn = 1;
  let player1;
  let player2;

  function checkEqual(a, b, c) {
    if (board[a] !== " " && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
    return false;
  }

  function setInitialMove(m) {
    move = m;
    player1 = m;
    player2 = m === "O" ? "X" : "O";
  }

  function initBoard() {
    for (let i = 1; i < 10; i += 1) {
      board[i] = " ";
    }
  }

  function displayBoard() {
    for (let i = 1; i < 10; i += 1) {
      const b = doc.querySelector(`#b${i}`);
      b.textContent = board[i];
    }
    const moveO = doc.querySelector("#mO");
    const moveX = doc.querySelector("#mX");
    moveO.style.display = "block";
    moveX.style.display = "block";
  }

  function updateBoard(id) {
    const b = doc.querySelector(`#${id}`);
    b.textContent = move;
    if (move === "O") {
      move = "X";
    } else {
      move = "O";
    }
  }

  function hasWon() {
    let won = checkEqual(1, 2, 3);
    if (won !== false) {
      displayMessage(won === player1 ? "1" : "2");
      return true;
    }
    won = checkEqual(4, 5, 6);
    if (won !== false) {
      displayMessage(won === player1 ? "1" : "2");
      return true;
    }
    won = checkEqual(7, 8, 9);
    if (won !== false) {
      displayMessage(won === player1 ? "1" : "2");
      return true;
    }
    won = checkEqual(1, 4, 7);
    if (won !== false) {
      displayMessage(won === player1 ? "1" : "2");
      return true;
    }
    won = checkEqual(2, 5, 8);
    if (won !== false) {
      displayMessage(won === player1 ? "1" : "2");
      return true;
    }
    won = checkEqual(3, 6, 9);
    if (won !== false) {
      displayMessage(won === player1 ? "1" : "2");
      return true;
    }
    won = checkEqual(1, 5, 9);
    if (won !== false) {
      displayMessage(won === player1 ? "1" : "2");
      return true;
    }
    won = checkEqual(3, 5, 7);
    if (won !== false) {
      displayMessage(won === player1 ? "1" : "2");
      return true;
    }
    return false;
  }

  return { initBoard, displayBoard, updateBoard, setInitialMove, hasWon };
})(document);

function createNewGame() {
  gameBoard.setInitialMove("");
  gameBoard.initBoard();
  gameBoard.displayBoard();
}

function handleBoardEvent(event) {
  const child = event.target.closest(".board-key");
  if (child) {
    gameBoard.updateBoard(child.getAttribute("id"));
    if (gameBoard.hasWon()) {
      createNewGame();
    }
  }
}

function moveHandler(event) {
  const child = event.target;
  const moveO = document.querySelector("#mO");
  const moveX = document.querySelector("#mX");
  moveO.style.display = "none";
  moveX.style.display = "none";
  if (child.getAttribute("id") === "mO") {
    gameBoard.setInitialMove("O");
  } else {
    gameBoard.setInitialMove("X");
  }
}

boardDiv.addEventListener("click", handleBoardEvent);
mO.addEventListener("click", moveHandler);
mX.addEventListener("click", moveHandler);
newGame.addEventListener("click", createNewGame);
okButton.addEventListener("click", removeMessage);

createNewGame();
