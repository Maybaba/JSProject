import { $redBox, $eatCircle1, $avoid, $hiddenClear, $clear } from "./getDom.js";
import { hiddenClear } from "./hiddenClear.js";
import { detectCollision } from "./collideByYJ.js";
import clear from "./makeFunction.js";

$hiddenClear.addEventListener('click', hiddenClear);

const $boxStyle = getComputedStyle($redBox);
let x = parseInt($boxStyle.left);
let y = parseInt($boxStyle.top);
const initialX = x;
const initialY = y;
const boxSize = parseInt($boxStyle.width);
const step = 5;

export let keys = {};

function moveBox() {
  if ("ArrowLeft" in keys && !checkCollision("left")) {
    x = Math.max(x - step, 0);
  }
  if ("ArrowRight" in keys && !checkCollision("right")) {
    x = Math.min(window.innerWidth - boxSize, x + step);
  }
  if ("ArrowUp" in keys && !checkCollision("up")) {
    y = Math.max(y - step, 0);
  }
  if ("ArrowDown" in keys && !checkCollision("down")) {
    y = Math.min(window.innerHeight - boxSize, y + step);
  }

  drawBox();
  requestAnimationFrame(moveBox);
}

function drawBox() {
  $redBox.style.left = x + "px";
  $redBox.style.top = y + "px";
}

function checkCollision(direction) {
  const $boxRect = $redBox.getBoundingClientRect();
  const $obstacles = document.querySelectorAll(
    ".leftborder, .rightborder, .topborder, .bottomborder, .leftLine, .rightLine, .topLine, .bottomLine"
  );

  let collision = false;

  $obstacles.forEach(function ($obstacle) {
    const obstacleRect = $obstacle.getBoundingClientRect();

    switch (direction) {
      case "left":
        if (
          $boxRect.left - 10 < obstacleRect.right &&
          $boxRect.right > obstacleRect.right &&
          $boxRect.top < obstacleRect.bottom &&
          $boxRect.bottom > obstacleRect.top
        ) {
          collision = true;
        }
        break;
      case "up":
        if (
          $boxRect.top - 10 < obstacleRect.bottom &&
          $boxRect.bottom > obstacleRect.bottom &&
          $boxRect.left < obstacleRect.right &&
          $boxRect.right > obstacleRect.left
        ) {
          collision = true;
        }
        break;
      case "right":
        if (
          $boxRect.right + 10 > obstacleRect.left &&
          $boxRect.left < obstacleRect.left &&
          $boxRect.top < obstacleRect.bottom &&
          $boxRect.bottom > obstacleRect.top
        ) {
          collision = true;
        }
        break;
      case "down":
        if (
          $boxRect.bottom + 10 > obstacleRect.top &&
          $boxRect.top < obstacleRect.top &&
          $boxRect.left < obstacleRect.right &&
          $boxRect.right > obstacleRect.left
        ) {
          collision = true;
        }
        break;
    }
  });

  return collision;
}

moveBox();

function isColliding(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

const intervalId = setInterval(function () {
  const redBoxRect = $redBox.getBoundingClientRect();
  let result = 0;

  Array.from($eatCircle1).forEach((circle) => {
    const circleRect = circle.getBoundingClientRect();
    if (isColliding(redBoxRect, circleRect)) {
      circle.style.display = "none";
    }
    if (circle.style.display !== "none") {
      result++;
    }
  });

  Array.from($avoid).forEach((circle) => {
    const circleRect = circle.getBoundingClientRect();
    if (isColliding(redBoxRect, circleRect)) {
      x = initialX;
      y = initialY;
      drawBox();
      Array.from($eatCircle1).forEach((circle) => {
        circle.style.display = "block";
      });
    }
  });

  let $redBoxXCoor = Math.floor(redBoxRect.x);

  if (result === 0 && $redBoxXCoor > $clear - 23) {
    clearInterval(intervalId);
    clear();
  }
}, 100);
