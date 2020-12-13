"use strict";

let coinWinner;
let p1Nickname = sessionStorage.getItem("playerOneNickname");
let p2Nickname = sessionStorage.getItem("playerTwoNickname");

const changeNicknameForm = document.querySelector(".roulette");

const playerOne = {
  nickname: "",
  
  shipsPlaced: false,
  shipsLeft: [null,4,3,2,1],
  
  shotsTotal: 0,
  shotsInGoal: 0,
  shotsMissed: 0,
};

const playerTwo = {
  nickname: "",
  
  shipsPlaced: false,
  shipsLeft: [null,4,3,2,1],

  shotsTotal: 0,
  shotsInGoal: 0,
  shotsMissed: 0,
};

if (p1Nickname == undefined || p2Nickname == undefined) {
  showForm();
} else {
  document.getElementById("p1-nickname-text").innerHTML = p1Nickname;
  document.getElementById("p2-nickname-text").innerHTML = p2Nickname;
}

function showForm() {
  changeNicknameForm.style.display = "flex";
}

const changeNicknameButton = document.querySelector(".change-nickname___button");
const restartGameButton = document.querySelector(".restart-game___button");
const showStatisticsButton = document.querySelector(".show-statistics___button");
const nicknameSubmitBtn = document.getElementById("nickname-sumbit___button");
const closeFormButton = document.querySelector(".close-form___button");

changeNicknameButton.onclick = function () {
  showForm();
};

restartGameButton.onclick = function () {
  sessionStorage.removeItem("playerOneNickname");
  sessionStorage.removeItem("playerTwoNickname");
  location.reload();
};

showStatisticsButton.onclick = function () {
  showStats();
};

nicknameSubmitBtn.onclick = function () {
  setNicknames();
};

closeFormButton.onclick = function () {
  if (playerOne.nickname == "" || playerTwo.nickname == "" ) {
    nicknameError("Please set nickname!");
    return;
  }
    changeNicknameForm.style.display = "none";
}

function setNicknames() {
  if (changeNicknameForm.style.display === "none") {
    changeNicknameForm.style.display = "flex";
  }

  const p1NicknameInp = document.getElementById("p1-nickname-input");
  const p2NicknameInp = document.getElementById("p2-nickname-input");

  if (p1NicknameInp.value === p2NicknameInp.value) {
    nicknameError("Nicknames must be different!");
    return;
  } else {
    playerOne.nickname = p1NicknameInp.value;
    playerTwo.nickname = p2NicknameInp.value;  

    sessionStorage.setItem("playerOneNickname", p1NicknameInp.value);
    sessionStorage.setItem("playerTwoNickname", p2NicknameInp.value);
  
    document.getElementById("p1-nickname-text").innerHTML = playerOne.nickname;
    document.getElementById("p2-nickname-text").innerHTML = playerTwo.nickname;
  
    if (changeNicknameForm.style.display === "flex") {
      changeNicknameForm.style.display = "none";
    }
      preGame();
  }
}

function showStats() {
  showModalError("Stats will be aded later!");
 // TODO: SHOWSTATS
}

const preGameContainer = document.querySelector(".pre-game___container");
const playerOneOcean = document.querySelector("#ocean-one");
const playerTwoOcean = document.querySelector("#ocean-two");

playerOneOcean.addEventListener('click',e => shipOnOceanOne(e))
playerTwoOcean.addEventListener('click',e => shipOnOceanTwo(e))

function nicknameError(text) {
  let error = document.createElement('div');

  error.classList.add("error");
  error.innerText = text;
  error.style.display = "block";

  changeNicknameForm.append(error);
    setTimeout(function () {
      error.style.display = "none";
    }, 1500);
}

function preGame() {
  const coin = document.querySelector(".coin");

  document.querySelector(".player-one-nickname").innerText = playerOne.nickname;
  document.querySelector(".player-two-nickname").innerText = playerTwo.nickname;
  document.querySelector(".front").innerText = playerOne.nickname;
  document.querySelector(".back").innerText = playerTwo.nickname;
  
  preGameContainer.style.display = "flex";
  
  coin.onclick = function () {
    if (coinWinner !== undefined) {
      return;
    } else {
      coinWinner = Math.random() * 2;
      
      if (coinWinner <= 1) {
        coinWinner = playerOne.nickname;
      } else {
        coinWinner = playerTwo.nickname;
      }

      coin.classList.add("spinning");
      
      setTimeout(function() {
        coin.classList.remove("spinning");

        coin.innerHTML = `${coinWinner} attacks first!`;
        coin.style.backgroundColor = "rgb(0, 0, 0, 0.5)";
        coin.style.color = "#39df57";
        coin.style.borderRadius = "50%";
        coin.style.fontSize = "0.65em";
        coin.style.letterSpacing = "1.5px";
  
        let startGameButton = document.createElement("button");
        
        startGameButton.classList.add("start-game___button");
        startGameButton.innerText = "Start game!";
  
        preGameContainer.append(startGameButton);
        startGameButton.addEventListener("click", function () {
          shipsMenu(coinWinner);
        });
      }, 1000);
      //5000
    }
  };
}

const playerOneContainer = document.querySelector("#player-one");
const playerTwoContainer = document.querySelector("#player-two");
const shipsList = document.querySelector(".placing-container");
const playerNicknameSpan = document.querySelectorAll(".player-nickname");


function shipsMenu(winner) {
  preGameContainer.style.display = "none";
    if (winner === playerOne.nickname) {
        playerTwoContainer.style.display = "none";
        playerOneContainer.style.display = "flex";
        shipsList.style.display = "block";
        playerOneOcean.classList.add("active-ocean");

    } else {
        playerOneContainer.style.display = "none";
        playerTwoContainer.style.display = "flex";
        shipsList.style.display = "block";
        playerTwoOcean.classList.add("active-ocean");
    }
}

const shipTypeRadio = document.getElementsByName("shipsType");
const directionTypeRadio = document.getElementsByName("shipsDirection");
let selectedShip = null;
let direction = "horizontal";

for (let i = 0; i < shipTypeRadio.length; i++) {
  shipTypeRadio[i].onchange = function () {
      (selectedShip) ? console.log("changed type of ship") : null;
        if(this !== selectedShip) {
          selectedShip = this;
        }
      selectedShip = this.value;
  };
}

for (let i = 0; i < directionTypeRadio.length; i++) {
  directionTypeRadio[i].onchange = function () {
      (direction) ? console.log("changed direction of ship") : null;
        if(this !== direction) {
          direction = this;
        }
      direction = this.value;
  };
}

function shipOnOceanOne(event) {
  let cell = event.target;
  let cellClassList = cell.classList;

  cellClassList = Array.from(cellClassList);

  let isOcean = cellClassList.indexOf("ocean");
  let isRow = cellClassList.indexOf("row");
  let isShip = cellClassList.indexOf("ship");

  if (isOcean === -1 && isRow === -1 && isShip === -1) {
    cell.classList.add("ship");
  } else {
    return;
  }

  if (playerOne.shipsPlaced === false) {
    placeShip("p1", selectedShip);
  } else {
    showModalError("You have already placed ships, please attack your opponent by selecting one of his cells!");
  }
}

function shipOnOceanTwo(event) {
  let cell = event.target;
  let cellClassList = cell.classList;

  cellClassList = Array.from(cellClassList);

  let isOcean = cellClassList.indexOf("ocean");
  let isRow = cellClassList.indexOf("row");
  let isShip = cellClassList.indexOf("ship");

  if (isOcean === -1 && isRow === -1 && isShip === -1) {
    cell.classList.add("ship");
  } else {
    return;
  }

  if (playerOne.shipsPlaced === false) {
    placeShip("p2", selectedShip);
  } else {
    showModalError("You have already placed ships, please attack your opponent by selecting one of his cells!");
  }
}

function placeShip(player) {
  let currentPlayer;
  let currentShip = selectedShip;

  if (player === "p1") {
    currentPlayer = playerOne;
  } else {
    currentPlayer = playerTwo;
  }

  switch (currentShip) {
    case "[ ]ship":
      if (currentPlayer.shipsLeft[1] > 0) {
        currentPlayer.shipsLeft[1]--;

        let currentTypeLabel = document.querySelector("#\\[\\ \\]ship-label");
        currentTypeLabel.innerHTML = `${currentPlayer.shipsLeft[1]} Battleship(s) left [ ]`;
      } else {
        showModalError("No ships of this type left, try another one!");
      }
    break;

    case "[ ][ ]ship":

    break;

    case "[ ][ ][ ]ship":

    break;

    case "[ ][ ][ ][ ]ship":

    break;
  }
}

function showModalError(text) {
  let modalErrorContainer = document.createElement("div");
  modalErrorContainer.classList.add("modal-error");
  document.body.append(modalErrorContainer);

  let errorTextContainer = document.createElement("div");
  errorTextContainer.classList.add("error-text___container");
  modalErrorContainer.append(errorTextContainer);

  let closeError = document.createElement("div");
  closeError.innerHTML = `<svg width="1.4em" height="1.4em" viewBox="0 0 16 16" class="bi bi-x-square-fill"
  fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2
  2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0
  0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>`;
  errorTextContainer.append(closeError);
  closeError.onclick = function() {
    closeModalError();
  };

  let errorText = document.createElement("span");
  errorText.innerHTML = text;
  errorTextContainer.append(errorText);

  let okButton = document.createElement("button");
  okButton.innerHTML = "OK";
  okButton.onclick = function() {
    closeModalError();
  };
  errorTextContainer.append(okButton);
}

function closeModalError() {
  let modalError = document.querySelector(".modal-error");
  modalError.parentNode.removeChild(modalError);
}

// TODO: TIMER COUNTDOWN AFTER SHIPS PLACED
// TODO: PLACE SHIPS H OR V