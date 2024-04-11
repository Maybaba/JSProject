import { $redBox, $eatCircle1, $hiddenClear, $clear, } from "./getDom.js";
import { hiddenClear } from "./hiddenClear.js";
import { detectCollision } from "./collideByYJ.js";
import clear from "./makeFunction.js";


$hiddenClear.addEventListener('click', hiddenClear)
// 게임 클리어 이벤트
console.log(`$eatCircle1= ${{ $eatCircle1 }}`);
// 게임이 끝나려면 빨간박스의 x좌표값이 클리어존의 좌표값
// 보다 커지면 끝난다. 빨간박스의 x좌표값을 변수에 담는다.

// char의 z-index가 safeArea보다 높다면 delete element.

//키보드 입력 이벤트 및 벽 밖으로 나가지 못하게 하는 이벤트
const $boxStyle = getComputedStyle($redBox);
let x = parseInt($boxStyle.left);
let y = parseInt($boxStyle.top);
const boxSize = parseInt($boxStyle.width);
const step = 5;

export let keys = {};

function moveBox() {
  if ("ArrowLeft" in keys) {
    if (!checkCollision("left")) {
      x = Math.max(x - step, 0);
    }
  }
  if ("ArrowRight" in keys) {
    if (!checkCollision("right")) {
      x = Math.min(window.innerWidth - boxSize, x + step);
    }
  }
  if ("ArrowUp" in keys) {
    if (!checkCollision("up")) {
      y = Math.max(y - step, 0);
    }
  }
  if ("ArrowDown" in keys) {
    if (!checkCollision("down")) {
      y = Math.min(window.innerHeight - boxSize, y + step);
    }
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
    ".leftborder, .rightborder, .topborder, .bottomborder .leftLine, .rightLine, .topLine, .bottomLine"
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



//노란 공 충돌 이벤트
function isColliding(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

// 노란 공 충돌 감지
const intervalId = setInterval(function () {
  const redBoxRect = $redBox.getBoundingClientRect();
  let result = 0;

  $eatCircle1.forEach((circle) => {
    const circleRect = circle.getBoundingClientRect();
    if (isColliding(redBoxRect, circleRect)) {
      circle.style.display = "none";
    }
    if (circle.style.display !== "none") {
      result++;
    }
  });

  let $redBoxXCoor = Math.floor(redBoxRect.x);

  if (result === 0 && $redBoxXCoor > $clear - 23) {
    clearInterval(intervalId);
    clear();
  }
}, 100);




// setInterval(detectCollision, 100);

// 0.1초마다 충돌 감지 함수 실행
setInterval(detectCollision, 100);

//죽은 시점의 논리변수, 죽은 판정 시작위치로  이동하기 전에 setInterval 끝내기
