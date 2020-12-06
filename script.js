"use strict";

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

// TODO: SHOW STATS
function showStats() {
  alert("*stats*(not working!)");
  // TODO: RESET STATS WHEN RESTARTED
}

const preGameContainer = document.querySelector(".pre-game___container");
const playerOneOcean = document.querySelector("#ocean-one");
const playerTwoOcean = document.querySelector("#ocean-two");

playerOneOcean.addEventListener('click',e => oceanOne(e))
playerTwoOcean.addEventListener('click',e => oceanTwo(e))

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

let coinWinner;

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

      coin.innerHTML = `${coinWinner} attacks first!`;
      coin.style.backgroundColor = "rgb(0, 0, 0, 0.5)";
      coin.style.color = "#39dfb0";
      coin.style.borderRadius = "50%";
      coin.style.fontSize = "0.65em";
      coin.style.letterSpacing = "1.5px";

      let startGameButton = document.createElement("button");
      
      startGameButton.classList.add("start-game___button");
      startGameButton.innerText = "Start game!";

      preGameContainer.append(startGameButton);
      startGameButton.addEventListener("click", function () {
        shipsMenu(coinWinner);
      })
    }
  }
}


function oceanOne(event) {
  if (playerOne.shipsPlaced === false) {
    alert("Placed")
  } else {

  }
}

function oceanTwo(event) {
  if (playerOne.shipsPlaced === false) {
    alert("Placed")
  } else {

  }
}

const playerOneContainer = document.querySelector("#player-one");
const playerTwoContainer = document.querySelector("#player-two");
const shipsList = document.querySelector(".placing-container");

function shipsMenu(winner) {
  preGameContainer.style.display = "none";
  console.log(`Congrats, ${winner}.`);
  if (winner === playerOne.nickname) {

    playerTwoContainer.style.display = "none";
    playerOneContainer.style.display = "flex";
    shipsList.style.display = "block";

  } else {

    playerOneContainer.style.display = "none";
    playerTwoContainer.style.display = "flex";
    shipsList.style.display = "block";

  }
}