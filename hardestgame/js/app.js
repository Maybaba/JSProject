
import { clear } from './makeFunction.js'
import { detectCollision } from './collideByYJ.js'
import { intervalId } from './crush.js'


document.addEventListener("keydown", function (event) {
  const $box = document.querySelector(".box");
  const $boxStyle = getComputedStyle($box);
  const $boxLeft = parseInt($boxStyle.left);
  const $boxTop = parseInt($boxStyle.top);
  const $boxWidth = parseInt($boxStyle.width);
  const $boxHeight = parseInt($boxStyle.height);
  const step = 25;
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
  case "ArrowLeft":
    if (event.key === "ArrowLeft" && event.key === "ArrowDown") {
      $box.style.left = Math.max($boxLeft - step, 0) + "px";
      $box.style.top =
        Math.min(window.innerHeight - $boxHeight, $boxTop + step) + "px";
    }
    break;
  case "ArrowRight":
    if (event.key === "ArrowRight" && event.key === "ArrowUp") {
      $box.style.left =
        Math.min(window.innerWidth - $boxWidth, $boxLeft + step) + "px";
      $box.style.top = Math.max($boxTop - step, 0) + "px";
    }
    break;
  case "ArrowRight":
    if (event.key === "ArrowRight" && event.key === "ArrowDown") {
      $box.style.left =
        Math.min(window.innerWidth - $boxWidth, $boxLeft + step) + "px";
      $box.style.top =
        Math.min(window.innerHeight - $boxHeight, $boxTop + step) + "px";
    }
    break;
}
});



function isColliding(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

  // 매 100ms마다 각 동그라미와의 충돌 감지
 const intervalId = setInterval(function () {
  // 빨간 박스의 위치 및 크기 가져오기
  const redBoxRect = $redBox.getBoundingClientRect();

  // 각 동그라미마다 충돌 여부 확인 및 처리
  let result = 0;
  $eatCircle.forEach(circle => {
    const circleRect = circle.getBoundingClientRect();
    if (isColliding(redBoxRect, circleRect)) {
      circle.style.display = "none";
      
    }
    if (circle.style.display !== "none") {
      result++;
    }
  });


  let $redBox_Rect = Math.floor(redBoxRect.x)

  // 남은 동그라미 수가 0일 때 게임 종료
  if (result === 0 && $redBox_Rect > $clear -23 ) {
    clearInterval(intervalId);
    console.log(result);
    clear();
  }
}, 100); // 매 100ms마다 충돌 감지

setInterval(detectCollision, 100);
