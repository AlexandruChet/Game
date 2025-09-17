const map = document.getElementById("map");
const generations = document.querySelector(".generations");
let activeFigure = null;

const colors = ["red", "blue", "green", "yellow", "orange", "purple", "cyan"];

document.addEventListener("keydown", (event) => {
  if (!activeFigure) return;

  let left = parseInt(activeFigure.style.left);

  if (["a", "A", "ArrowLeft"].includes(event.key)) {
    if (left > 0) {
      activeFigure.style.left = left - 20 + "px";
    }
  } else if (["d", "D", "ArrowRight"].includes(event.key)) {
    if (left < 200) {
      activeFigure.style.left = left + 20 + "px";
    }
  }
});

function generateFigure() {
  const color = colors[Math.floor(Math.random() * colors.length)];

  const figure = document.createElement("div");
  figure.classList.add("figure");
  figure.style.left = "100px";
  figure.style.top = "0px";

  for (let i = 0; i < 4; i++) {
    const block = document.createElement("div");
    block.classList.add("block", color);
    figure.appendChild(block);
  }

  generations.appendChild(figure);
  activeFigure = figure;

  fall(figure);
}

function fall(figure) {
  let posY = 0;
  const interval = setInterval(() => {
    posY += 20;
    figure.style.top = posY + "px";

    if (posY >= 400) {
      freeze(figure);
      clearInterval(interval);
      generateFigure();
    }
  }, 300);
}

function freeze(figure) {
  [...figure.children].forEach((block) => {
    const frozen = block.cloneNode();
    frozen.classList.add("block");
    map.appendChild(frozen);
  });

  figure.remove();
  activeFigure = null;
}

generateFigure();
