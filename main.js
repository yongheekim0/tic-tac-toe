/*----- constants -----*/
const PIECE = {
  0: null,
  1: "X",
  "-1": "O",
};

/*----- state variables -----*/
const state = {
  board: null,
  turn: null,
  winner: null,
};

/*----- cached elements  -----*/
const elements = {
  message: document.querySelector("h1"),
  playAgain: document.querySelector("button"),
  markers: document.querySelectorAll("#board > div"),
};

/*----- event listeners -----*/

[...elements.markers].forEach((marker) =>
  marker.addEventListener("click", handleDrop)
);
elements.playAgain.addEventListener("click", init);

/*----- functions -----*/
init();

function init() {
  state.turn = 1;
  state.winner = null;
  [...elements.markers].forEach((marker) => (marker.innerHTML = ""));
  elements.message.innerText = "X first";
  [...elements.markers].forEach((marker) =>
    marker.addEventListener("click", handleDrop)
  );
}

function handleDrop(event) {
  console.log("clicked");
  console.log(state.turn);
  if (event.target.innerHTML !== "") {
    return;
  }
  if (state.turn === 1) {
    event.target.innerHTML = "<h1 style='color: black;'>X</h1>";
  } else {
    event.target.innerHTML = "<h1 style='color: orange;'>O</h1>";
  }
  messageRender();
  state.turn *= -1;
  searchCases();
  getWinner();
  draw();
}

function searchCases() {
  checkHorizontal();
  checkVertical();
  checkDiagonal();
  checkAntiDiagonal();
  checkWinner([
    checkHorizontal(),
    checkVertical(),
    checkDiagonal(),
    checkAntiDiagonal(),
  ]);
}

function draw() {
  const drawArray = [...elements.markers].map((marker) => marker.innerText);
  if (!drawArray.includes("")) {
    elements.message.innerHTML = "Draw!";
  }
}

function getWinner() {
  if (state.winner === 1) {
    elements.message.innerHTML = "X Won!";
    [...elements.markers].forEach((marker) =>
      marker.removeEventListener("click", handleDrop)
    );
  } else if (state.winner === -1) {
    elements.message.innerHTML = "O Won!";
    [...elements.markers].forEach((marker) =>
      marker.removeEventListener("click", handleDrop)
    );
  }
}

function checkWinner(caseArray) {
  caseArray.forEach((e) => {
    let string = "";
    if (e.includes("XXX")) {
      state.winner = 1;
    } else if (e.includes("OOO")) {
      state.winner = -1;
    }
  });
}

function checkHorizontal() {
  let xOrOArray = [];
  for (let i = 0; i < 3; i++) {
    let xOrO = "";
    for (let j = 0; j < 3; j++) {
      xOrO += document.getElementById(`r${i}c${j}`).innerText;
      //console.log(xOrO);
    }
    xOrOArray.push(xOrO);
  }
  //console.log(xOrOArray);
  return xOrOArray;
}

function checkVertical() {
  let xOrOArray = [];
  for (let i = 0; i < 3; i++) {
    let xOrO = "";
    for (let j = 0; j < 3; j++) {
      xOrO += document.getElementById(`r${j}c${i}`).innerText;
      //console.log(xOrO);
    }
    xOrOArray.push(xOrO);
  }
  //console.log(xOrOArray);
  return xOrOArray;
}

function checkDiagonal() {
  let xOrOArray = [];
  let xOrO = "";
  for (let i = 0; i < 3; i++) {
    xOrO += document.getElementById(`r${i}c${i}`).innerText;
    //console.log(xOrO);
  }
  xOrOArray.push(xOrO);
  //console.log(xOrOArray);
  return xOrOArray;
}

function checkAntiDiagonal() {
  let xOrOArray = [];
  let xOrO = "";
  for (let i = 0; i < 3; i++) {
    xOrO += document.getElementById(`r${2 - i}c${i}`).innerText;
    //console.log(xOrO);
  }
  xOrOArray.push(xOrO);
  //console.log(xOrOArray);
  return xOrOArray;
}

function messageRender() {
  if (state.turn === 1) {
    elements.message.innerHTML = `${PIECE["-1"]}'s turn`;
  } else {
    elements.message.innerHTML = `${PIECE["1"]}'s turn`;
  }
}
