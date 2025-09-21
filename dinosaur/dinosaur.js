const dino = document.getElementById("dinosaur");
const cactus = document.getElementById("cactus");
const modal = document.getElementById("hidden");
const restartBtn = document.getElementById("new-game");
const timeText = document.getElementById("time");

const GAME_SETTINGS = {
  cactusSpeed: 5,
  cactusStart: -60,
  cactusEnd: 860,
  jumpDuration: 600,
  timerInterval: 1000,
};

let isAlive = true;
let time = 0;
let timerId;
let cactusAnimationId;

const startGame = () => {
  resetGame();
  animateCactus();
  startTimer();
  setupControls();
};

const resetGame = () => {
  isAlive = true;
  time = 0;
  timeText.textContent = "Time: 0";
  cactus.style.right = GAME_SETTINGS.cactusStart + "px";
};

const startTimer = () => {
  timerId = setInterval(() => {
    if (isAlive) {
      time++;
      timeText.textContent = `Time: ${time}`;
    }
  }, GAME_SETTINGS.timerInterval);
};

const animateCactus = () => {
  let position = GAME_SETTINGS.cactusStart;

  const step = () => {
    if (!isAlive) return;

    position += GAME_SETTINGS.cactusSpeed;
    if (position > GAME_SETTINGS.cactusEnd) {
      position = GAME_SETTINGS.cactusStart;
    }

    cactus.style.right = position + "px";

    if (checkCollision(dino, cactus)) {
      gameOver();
      return;
    }

    cactusAnimationId = requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const jump = () => {
  if (dino.classList.contains("jump") || !isAlive) return;

  dino.classList.add("jump");
  setTimeout(() => dino.classList.remove("jump"), GAME_SETTINGS.jumpDuration);
};

const checkCollision = (el1, el2) => {
  const r1 = el1.getBoundingClientRect();
  const r2 = el2.getBoundingClientRect();

  return (
    r1.left < r2.right &&
    r1.right > r2.left &&
    r1.top < r2.bottom &&
    r1.bottom > r2.top
  );
};

const gameOver = () => {
  isAlive = false;

  modal.classList.add("active");

  clearInterval(timerId);
  cancelAnimationFrame(cactusAnimationId);
};

const setupControls = () => {
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "ArrowUp") { jump(); }
  });

  restartBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    startGame();
  });
};

startGame();