/* Logic Part */

const position1 = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];
str = "";
function getRenderedGame(position) {
  for (let i = -1; i < position.length + 1; i++) {
    if (i < 0 || i == position.length) {
      str = str + "*******" + "\r\n";
    } else {
      str = str + "*" + position[i].join("*") + "*" + "\r\n";
    }
  }
  return str;
}
console.log(getRenderedGame(position1));

const OBJ = { winner: undefined, loser: undefined, hasEnded: false };

function getGameinfo(position) {
  for (let i = 0; i < position.length; i++) {
    if (position[i][0] == position[i][1] && position[i][1] == position[i][2]) {
      if (position[i][0] !== " ") {
        OBJ.winner = position[i][0];
        if (position[i][0] == "x") {
          OBJ.loser = "o";
        } else if (position[i][0] == "o") {
          OBJ.loser = "x";
        }
        OBJ.hasEnded = true;
      }
    }
    if (position[0][i] == position[1][i] && position[1][i] == position[2][i]) {
      if (position[0][i] !== " ") {
        OBJ.winner = position[0][i];
        if (position[0][i] == "x") {
          OBJ.loser = "o";
        } else if (position[0][i] == "o") {
          OBJ.loser = "x";
        }

        OBJ.hasEnded = true;
      }
    }
    if (position[0][0] == position[1][1] && position[1][1] == position[2][2]) {
      if (position[0][0] !== " ") {
        OBJ.winner = position[0][0];
        if (position[0][0] == "x") {
          OBJ.loser = "o";
        } else if (position[0][0] == "o") {
          OBJ.loser = "x";
        }
        OBJ.hasEnded = true;
      }
    }
    if (position[0][2] == position[1][1] && position[1][1] == position[2][0]) {
      if (position[0][2] !== " ") {
        OBJ.winner = position[0][2];
        if (position[0][2] == "x") {
          OBJ.loser = "o";
        } else if (position[0][2] == "o") {
          OBJ.loser = "x";
        }
        OBJ.hasEnded = true;
      }
    }
  }
  return OBJ;
}

/* Dom Part*/

const container = document.querySelector(".container");
const boxs = container.querySelectorAll(".box");
const a = '<i class="bi bi-x-lg"></i>';
const b = '<i class="bi bi-circle"></i>';
const h1 = document.querySelector("h1");
const h3 = document.querySelector("h3");
const btn = document.querySelector("button");
let flag = true;
let temp = null;
let number = 0;

for (let i = 0; i < boxs.length; i++) {
  boxs[i].addEventListener("click", playGame);
  function playGame() {
    number++;
    if (flag) {
      this.innerHTML = a;
      this.style.color = "black"; //#756477
      flag = false;
    } else {
      this.innerHTML = b;
      this.style.color = "white"; // #eda7a7
      flag = true;
    }
    if (this.innerHTML == a) {
      temp = "x";
    } else {
      temp = "o";
    }
    if (i < 3) {
      position1[0][i] = temp;
      console.log(position1);
    } else if (i > 2 && i < 6) {
      position1[1][i - 3] = temp;
    } else if (i > 5 && i < 9) {
      position1[2][i - 6] = temp;
    }

    const gameInfo = getGameinfo(position1);
    if (OBJ.hasEnded) {
      h1.innerHTML = "GAME OVER!";
      h1.style.animation = "swing 2s ";
      h1.style.color = "#eda7a7";
      h3.innerHTML =
        "Winner: " +
        OBJ.winner.toUpperCase() +
        " &nbsp;&nbsp;&nbsp; " +
        "Loser: " +
        OBJ.loser.toUpperCase();
    }
    console.log(gameInfo);
    if (number == 9 && OBJ.hasEnded == false) {
      h3.innerHTML = "You Are in Same Lavel!";
      h3.style.color = "#eda7a7";
    }
  }
}
btn.addEventListener("click", function () {
  location.reload();
});
