"use strict";

let p1Nickname = localStorage.getItem("playerOneNickname");
let p2Nickname = localStorage.getItem("playerTwoNickname");
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
  restartGame();
  location.reload();
};

showStatisticsButton.onclick = function () {
  showStats();
};


nicknameSubmitBtn.onclick = function () {
  setNicknames();
};

closeFormButton.onclick = function () {
  changeNicknameForm.style.display = "none";
}

function setNicknames() {
  if (changeNicknameForm.style.display === "none") {
    changeNicknameForm.style.display = "flex";
  }

  const p1NicknameInp = document.getElementById("p1-nickname-input");
  const p2NicknameInp = document.getElementById("p2-nickname-input");

  playerOne.nickname = p1NicknameInp.value;
  playerTwo.nickname = p2NicknameInp.value;

  if (playerOne.nickname === playerTwo.nickname) {
    let error = document.createElement('div');

    error.classList.add("error");
    error.innerText = "Nicknames must be different!";
    error.style.display = "block";

    changeNicknameForm.append(error);
      setTimeout(function () {
        error.style.display = "none";
      }, 1500);
  } else {
    localStorage.setItem("playerOneNickname", p1NicknameInp.value);
    localStorage.setItem("playerTwoNickname", p2NicknameInp.value);
  
    document.getElementById("p1-nickname-text").innerHTML = playerOne.nickname;
    document.getElementById("p2-nickname-text").innerHTML = playerTwo.nickname;
  
    if (changeNicknameForm.style.display === "flex") {
      changeNicknameForm.style.display = "none";
    }
  }
}

// TODO: RESET STATS
function restartGame() {
  alert("restarted(not working!");
}

// TODO: SHOW STATS
function showStats() {
  alert("*stats*(not working!)");
}

const playerOneOcean = document.querySelector("#ocean-one");
const playerTwoOcean = document.querySelector("#ocean-two");

playerOneOcean.addEventListener('click',e => oceanOne(e))
playerTwoOcean.addEventListener('click',e => oceanTwo(e))

function oceanOne(event) {
  if (playerOne.shipsPlaced === false) {
    placeShips("one");
  }
}

function oceanTwo(event) {
  
}

function placeShips(player) {
  (player === "one") ? {

  } : {

  }
}