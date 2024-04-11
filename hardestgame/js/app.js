import { $game, $redBox, $eatCircle1, $clear, $avoid, $death } from "./getDom.js";

// 게임 클리어 이벤트
console.log(`$eatCircle1= ${{ $eatCircle1 }}`);
// 게임이 끝나려면 빨간박스의 x좌표값이 클리어존의 좌표값
// 보다 커지면 끝난다. 빨간박스의 x좌표값을 변수에 담는다.

// char의 z-index가 safeArea보다 높다면 delete element.

export function clear() {
  if (true) {
    let $redBoxCoor = $redBox.getBoundingClientRect();
    let $redBoxXCoor = Math.floor($redBoxCoor.x);
    console.log($redBoxXCoor);

    if ($redBoxXCoor > $clear - 23) {
      // 23은 디테일, 끝내는 함수
      console.log(`dddd`);

      $game.innerHTML = "";
      window.location.href =
        "http://127.0.0.1:5500/hardestgame/html/subPage.html";
      return;
    }
  }
}



// 충돌 애니메이션 1
let isitColliding = false; // 충돌 감지 변수
let isAnimating = false; // 애니메이션 중인지 여부 변수

window.addEventListener("keydown", function (event) {
  if (!isitColliding) {
    // 충돌이 발생하지 않았을 때만 키 이벤트 처리
    keys[event.key] = true;
  }
});

window.addEventListener("keyup", function (event) {
  if (!isitColliding) {
    // 충돌이 발생하지 않았을 때만 키 이벤트 처리
    delete keys[event.key];
  }
});



//키보드 입력 이벤트 및 벽 밖으로 나가지 못하게 하는 이벤트
const $boxStyle = getComputedStyle($redBox);
let x = parseInt($boxStyle.left);
let y = parseInt($boxStyle.top);
const boxSize = parseInt($boxStyle.width);
const step = 5;

let keys = {};

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
    ".leftborder, .rightborder, .topborder, .bottomborder"
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

let deathCount = 0;



// 충돌 애니메이션 2
function detectCollision() {
  $death.textContent = `DEATH: ${deathCount}`;
  
  if (!isitColliding) {
    const redBoxRect = $redBox.getBoundingClientRect();
    $avoid.forEach(($avoid) => {
      const avoidRect = $avoid.getBoundingClientRect();
      
      if (
        !(
          redBoxRect.right < avoidRect.left ||
          redBoxRect.left > avoidRect.right ||
          redBoxRect.bottom < avoidRect.top ||
          redBoxRect.top > avoidRect.bottom
        )
      ) {
        if (!isAnimating) {
          isAnimating = true;
          isitColliding = true; // 충돌 감지 상태로 변경
          deathCount++;
          $death.textContent = `DEATH: ${deathCount}`;
          // 1초 동안 키 입력 무시
          window.removeEventListener("keydown", function (event) {
            keys[event.key] = true;
          });
          window.removeEventListener("keyup", function (event) {
            delete keys[event.key];
          });
          
          // 충돌 애니메이션 실행
          redboxDeadAnimation();
        }
      }
    });
  }
  
  // 충돌 감지 0.1초마다 실행
  setTimeout(detectCollision, 100);
}

// 충돌 애니메이션 함수
function redboxDeadAnimation() {
  const redBoxCollide = $redBox.getBoundingClientRect();
  const startTime = Date.now();

  function opacityDecreasing() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    if (elapsedTime < 1000) {
      const opacity = 1 - elapsedTime / 1000;
      $redBox.style.left = `${redBoxCollide.offsetLeft}px`;
      $redBox.style.top = `${redBoxCollide.offsetTop}px`;
      $redBox.style.opacity = opacity;
      requestAnimationFrame(opacityDecreasing);
    } else {
      // 1초가 지나면 애니메이션 종료 후 리스폰
      redboxRespawn();
    }
  }

  opacityDecreasing();
}

// 리스폰 함수
function redboxRespawn() {
  // red box를 다시 화면에 표시하기 전에 원래 위치로 되돌리기
  const restartArea = document.getElementById("safeArea");
  const parentRect = restartArea.parentElement.getBoundingClientRect();
  const restartAreaRect = restartArea.getBoundingClientRect();
  const redBoxX = restartAreaRect.left - parentRect.left;
  const redBoxY = restartAreaRect.top - parentRect.top;

  $redBox.style.left = `${redBoxX}px`;
  $redBox.style.top = `${redBoxY}px`;

  // red box 화면에 다시 표시
  $redBox.style.display = "block";

  //red box opacity 1로 되돌림
  $redBox.style.opacity = 1;


  // 충돌 감지 상태와 애니메이션 상태 초기화
  isitColliding = false;
  isAnimating = false;

  // 키 이벤트 다시 등록
  window.addEventListener("keydown", function (event) {
    keys[event.key] = true;
  });
  window.addEventListener("keyup", function (event) {
    delete keys[event.key];
  });

  console.log("리스폰 완료.");
}

// 0.1초마다 충돌 감지 함수 실행
setInterval(detectCollision, 100);