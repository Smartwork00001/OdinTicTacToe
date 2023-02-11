const boardDiv = document.querySelector("#board");
const mO = document.querySelector("#mO");
const mX = document.querySelector("#mX");
const selectFirstMove = document.querySelector("#select-first-move");
const okButton = document.querySelector("#okButton");
const okButtonDiv = document.querySelector(".okButtonDiv");
const okButtonText = document.querySelector("#okButtonText");
const newGame = document.querySelector("#new-game");
let canClick = true;

function displayMessage(winner) {
  canClick = false;
  if (!!winner === false) {
    okButtonText.textContent = `The game is a draw`;
    okButtonDiv.style.display = "flex";
    return;
  }
  okButtonText.textContent = `Player ${winner} has won`;
  okButtonDiv.style.display = "flex";
}

const gameBoard = (function (doc) {
  const board = [];
  let move;
  let player1;

  function checkEqual(a, b, c) {
    if (board[a] !== " " && board[a] === board[b] && board[b] === board[c]) {
      displayMessage(board[a] === player1 ? "1" : "2");
      return true;
    }
    return false;
  }

  function setInitialMove(m) {
    move = m;
    player1 = m;
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
    okButtonDiv.style.display = "none";
    mO.style.display = "block";
    mX.style.display = "block";
    selectFirstMove.style.display = "block";
  }

  function updateBoard(id) {
    if (board[id[1]] === " ") {
      const b = doc.querySelector(`#${id}`);
      b.textContent = move;
      board[id[1]] = move;
      if (move === "O") {
        move = "X";
      } else {
        move = "O";
      }
    }
  }

  function hasWon() {
    if(checkEqual(1, 2, 3)) return true;
    if(checkEqual(4,5,6)) return true;
    if(checkEqual(7,8,9)) return true;
    if(checkEqual(1, 4,7)) return true;
    if(checkEqual(2,5,8)) return true;
    if(checkEqual(3,6,9)) return true;
    if(checkEqual(1, 5,9)) return true;
    if(checkEqual(3,5,7)) return true;
    return false;
  }

  function isBoardFilled() {
    return !board.some((b) => b === " ");
  }

  return {
    initBoard,
    displayBoard,
    updateBoard,
    setInitialMove,
    hasWon,
    isBoardFilled,
  };
})(document);

function createNewGame() {
  canClick = true;
  gameBoard.setInitialMove("");
  gameBoard.initBoard();
  gameBoard.displayBoard();
}

function removeMessage() {
  okButtonDiv.style.display = "none";
  createNewGame();
}

function handleBoardEvent(event) {
  if (canClick) {
    const child = event.target.closest(".board-key");
    if (child) {
      gameBoard.updateBoard(child.getAttribute("id"));
      if(gameBoard.hasWon()){
        return;
      }
      if (gameBoard.isBoardFilled()) {
        displayMessage(null);
      }
    }
  }
}

function firstMoveHandler(event) {
  const child = event.target;
  mO.style.display = "none";
  mX.style.display = "none";
  selectFirstMove.style.display = "none";
  if (child.getAttribute("id") === "mO") {
    gameBoard.setInitialMove("O");
  } else {
    gameBoard.setInitialMove("X");
  }
}

boardDiv.addEventListener("click", handleBoardEvent);
mO.addEventListener("click", firstMoveHandler);
mX.addEventListener("click", firstMoveHandler);
newGame.addEventListener("click", createNewGame);
okButton.addEventListener("click", removeMessage);

createNewGame();
