const boardDiv = document.querySelector("#board");
const mO = document.querySelector("#mO");
const mX = document.querySelector("#mX");

const gameBoard = (function (doc) {
  const board = [];
  let move;

  function setInitialMove(m) {
    move = m;
  }

  function initBoard() {
    for (let i = 1; i < 10; i += 1) {
      board[i] = i;
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

  return { initBoard, displayBoard, updateBoard, setInitialMove };
})(document);

gameBoard.displayBoard();

function handleBoardEvent(event) {
  const child = event.target.closest(".board-key");
  if (child) {
    gameBoard.updateBoard(child.getAttribute("id"));
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
