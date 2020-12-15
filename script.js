"use strict";

let coinWinner;
let p1Nickname = sessionStorage.getItem("playerOneNickname");
let p2Nickname = sessionStorage.getItem("playerTwoNickname");

const changeNicknameForm = document.querySelector(".roulette");

const playerOne = {
  nickname: "",
  
  shipsPlaced: false,
  shipsLeft: [null,4,3,2,1],
  // shipsLeft: [null,1,0,0,0],
  
  shotsTotal: 0,
  shotsInGoal: 0,
  shotsMissed: 0,
};

const playerTwo = {
  nickname: "",

  shipsPlaced: false,
  shipsLeft: [null,4,3,2,1],
  // shipsLeft: [null,1,0,0,0],

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
  showModalWindow("Stats will be aded later!");
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

      console.log("COIN WINNER IS " + coinWinner);

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

let selectedShip = "[ ]ship";
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
  if (clickWasOnCell(event)) {
    let cell = event.target;
      placeShip("p1", cell);
  } 
}

function shipOnOceanTwo(event) {
  if (clickWasOnCell(event)) {
    let cell = event.target;
      placeShip("p2", cell);
  } 
}

function clickWasOnCell(element) {
  let cell = element.target;
  let cellClassList = cell.classList;

  cellClassList = Array.from(cellClassList);

  let isOcean = cellClassList.indexOf("ocean");
  let isRow = cellClassList.indexOf("row");
  let isShip = cellClassList.indexOf("ship");

  if (isOcean === -1 && isRow === -1 && isShip === -1) {
    return true;
  } else {
    return false;
  }
}

let currentPlayer;
function placeShip(player, cell) {
  let currentShip = selectedShip;
    if (player === "p1") {
      currentPlayer = playerOne;
    } else {
      currentPlayer = playerTwo;
    }

  console.log("SHIPS PLACING | CURRENT PLAYER IS " + currentPlayer.nickname);

  if (leftShips(currentPlayer)) {
    switch (currentShip) {
      case "[ ]ship":
        if (currentPlayer.shipsLeft[1] > 0) {
          currentPlayer.shipsLeft[1]--;
          cell.classList.add("ship");

          let currentTypeLabel = document.querySelector("#\\[\\ \\]ship-label");
          currentTypeLabel.innerHTML = `${currentPlayer.shipsLeft[1]} Battleship(s) left [ ]`;
        } else {
          showModalWindow("No ships of this type left, try another one!");
        }
      break;

      case "[ ][ ]ship":
        if (currentPlayer.shipsLeft[2] > 0) {
          currentPlayer.shipsLeft[2]--;
          cell.classList.add("ship");

          let currentTypeLabel = document.querySelector("#\\[\\ \\]\\[\\ \\]ship-label");
          currentTypeLabel.innerHTML = `${currentPlayer.shipsLeft[2]} Battleship(s) left [ ][ ]`;
        } else {
          showModalWindow("No ships of this type left, try another one!");
        }
      break;

      case "[ ][ ][ ]ship":
        if (currentPlayer.shipsLeft[3] > 0) {
          currentPlayer.shipsLeft[3]--;
          cell.classList.add("ship");

          let currentTypeLabel = document.querySelector("#\\[\\ \\]\\[\\ \\]\\[\\ \\]ship-label");
          currentTypeLabel.innerHTML = `${currentPlayer.shipsLeft[3]} Battleship(s) left [ ][ ][ ]`;
        } else {
          showModalWindow("No ships of this type left, try another one!");
        }
      break;

      case "[ ][ ][ ][ ]ship":
        if (currentPlayer.shipsLeft[4] > 0) {
          currentPlayer.shipsLeft[4]--;
          cell.classList.add("ship");

          let currentTypeLabel = document.querySelector("#\\[\\ \\]\\[\\ \\]\\[\\ \\]\\[\\ \\]ship-label");
          currentTypeLabel.innerHTML = `${currentPlayer.shipsLeft[4]} Battleship(s) left [ ][ ][ ][ ]`;
        } else {
          showModalWindow("No ships of this type left, try another one!");
        }
      break;
    }
  } else {
    console.log("BEFORE NEXT TURN | CURRENT PLAYER IS " + currentPlayer.nickname);
    nextTurn(currentPlayer);
    console.log("AFTER NEXT TURN | CURRENT PLAYER IS " + currentPlayer.nickname);

    showModalWindow("<small>You have placed all the ships. Give control to the second player and press OK.</small>");
  }
}

function leftShips(player) {
  let sum = player.shipsLeft[1] + player.shipsLeft[2] + player.shipsLeft[3] + player.shipsLeft[4];

  if (sum !== 0) {
    return true;
  } else {
    return false;
  }
}

let shipsHidden = false;

function nextTurn(player) {
  let hideContainer = document.createElement("div");
  hideContainer.classList.add("hidden");
  document.body.append(hideContainer);
  shipsHidden = true;
  console.log(player);

  if (player.nickname === playerOne.nickname) {
    playerOneContainer.style.display = "none";
      if(player.shipsPlaced === false) {
        player.shipsPlaced = true;
      }
    currentPlayer = playerTwo
    playerTwoContainer.style.display = "flex";
  }
  
  else {
    playerTwoContainer.style.display = "none";
      if(player.shipsPlaced === false) {
        player.shipsPlaced = true;
      }
    currentPlayer = playerOne;
    playerOneContainer.style.display = "flex";
  }
}

function showModalWindow(text) {
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
    closeModalWindow();
  };

  let errorText = document.createElement("span");
  errorText.innerHTML = text;
  errorTextContainer.append(errorText);

  let okButton = document.createElement("button");
  okButton.classList.add("ok-button");
  okButton.innerHTML = "OK";
  okButton.onclick = function() {
    closeModalWindow();
  };

  errorTextContainer.append(okButton);
}

function closeModalWindow() {
  let modalError = document.querySelector(".modal-error");
  
  if (shipsHidden === true) {
    document.querySelector(".hidden").style.display = "none";  
    shipsHidden = false;
  }

  modalError.parentNode.removeChild(modalError);
}

// TODO: TIMER COUNTDOWN AFTER SHIPS PLACED
// TODO: PLACE SHIPS H OR V
// TODO: CHOOSE YOUR COLOR
// TODO: CHANGING SHIPS AND OCEAN CONTAINER COLOR