
import { clear } from "./makeFunction.js";
import { detectCollision } from "./collideByYJ.js";
import { $redBox, $eatCircle1, $clear } from "./getDom.js";
// import { intervalId } from './crush.js'

//div 숫자 안보이게 하기 240410
document.querySelectorAll('.backgroundInGame1').forEach(function(element) {
  element.textContent = ''; 
});
document.querySelectorAll('.backgroundInGame2').forEach(function(element) {
  element.textContent = ''; 
});
document.querySelectorAll('.number').forEach(function(element) {
  element.textContent = ''; 
});

document.addEventListener("keydown", function (event) {
  const $box = document.querySelector(".box");
  const $boxStyle = getComputedStyle($box);
  const $boxLeft = parseInt($boxStyle.left);
  const $boxTop = parseInt($boxStyle.top);
  const $boxWidth = parseInt($boxStyle.width);
  const $boxHeight = parseInt($boxStyle.height);
  const step = 15;

    switch (event.key) {
      case "ArrowLeft":
        $box.style.left = Math.max($boxLeft - step, 0) + "px";  
        break;
      case "ArrowUp":
        $box.style.top = Math.max($boxTop - step, 0) + "px";
        break;
      case "ArrowRight":
        $box.style.left =
          Math.min(window.innerWidth - $boxWidth, $boxLeft + step) + "px";
        break;
      case "ArrowDown":
        $box.style.top =
          Math.min(window.innerHeight - $boxHeight, $boxTop + step) + "px";
        break;
      case "ArrowLeft":
        if (event.key === "ArrowLeft" && event.key === "ArrowUp") {
          $box.style.left = Math.max($boxLeft - step, 0) + "px";
          $box.style.top = Math.max($boxTop - step, 0) + "px";

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
