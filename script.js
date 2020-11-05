let p1Nickname = localStorage.getItem("playerOneNickname");
let p2Nickname = localStorage.getItem("playerTwoNickname");
let changeNicknameForm = document.querySelector(".roulette");

let playerOne = {
  nickname: "",
  shotsTotal: 0,
  shotsInGoal: 0,
  shotsMissed: 0,
};

let playerTwo = {
  nickname: "",
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

let nicknameSubmitBtn = document.getElementById("nickname-sumbit-btn");
nicknameSubmitBtn.onclick = function () {
  setNicknames();
};

let changeNicknameButton = document.getElementById("change-nickname");
changeNicknameButton.onclick = function () {
  showForm();
};

function setNicknames() {
  let p1NicknameInp = document.getElementById("p1-nickname-input");
  playerOne.nickname = p1NicknameInp.value;
  localStorage.setItem("playerOneNickname", p1NicknameInp.value);

  let p2NicknameInp = document.getElementById("p2-nickname-input");
  playerTwo.nickname = p2NicknameInp.value;
  localStorage.setItem("playerTwoNickname", p2NicknameInp.value);

  document.getElementById("p1-nickname-text").innerHTML = playerOne.nickname;
  document.getElementById("p2-nickname-text").innerHTML = playerTwo.nickname;

  changeNicknameForm.style.display = "none";
}
// gameStarts();

function gameStarts() {
  let x = prompt("Where should your boat starts? (by X)", "0");
  x = x.trim();
  x = x.toLowerCase();
  x = Number(x);

  let y = prompt("Where should your boat starts? (by Y)", "0");
  y = y.trim();
  y = y.toLowerCase();
  y = Number(y);

  let XorY = prompt("Should your boat be Horizontal or Vertical?", "H or V");
  XorY = XorY.trim();
  XorY = XorY.toLowerCase();
}

