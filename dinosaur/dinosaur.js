const dino = document.getElementById("dinosaur");
const cactus = document.getElementById("cactus");
const modal = document.getElementById("hidden");
const restartBtn = document.getElementById("new-game");
const timeText = document.getElementById("time");

let isAlive = true;
let time = 0;
let timerInterval;

function moveCactus() {
  cactus.style.right = "-60px";
  let cactusPosition = -60;

  const move = setInterval(() => {
    if (!isAlive) {
      clearInterval(move);
      return;
    }

    cactusPosition += 5;
    cactus.style.right = cactusPosition + "px";

    if (cactusPosition > 860) {
      cactusPosition = -60;
    }

    if (checkCollision(dino, cactus)) {
      gameOver();
      clearInterval(move);
    }
  }, 30);
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (isAlive) {
      time++;
      timeText.textContent = "Time: " + time;
    }
  }, 1000);
}

function checkCollision(el1, el2) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

function jump() {
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");
    setTimeout(() => {
      dino.classList.remove("jump");
    }, 600);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    jump();
  }
});

function gameOver() {
  isAlive = false;
  modal.classList.add("active");
  clearInterval(timerInterval);
}

restartBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  isAlive = true;
  time = 0;
  timeText.textContent = "Time: 0";
  startGame();
});

function startGame() {
  moveCactus();
  startTimer();
}

startGame();
