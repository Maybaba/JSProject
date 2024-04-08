import { $char, $avoid, $redBox, $game, $clearZone, $clearZoneCoor, $clear } from './getDom.js';;


// 게임이 끝나려면 빨간박스의 x좌표값이 클리어존의 좌표값
// 보다 커지면 끝난다. 빨간박스의 x좌표값을 변수에 담는다.


// char의 z-index가 safeArea보다 높다면 delete element.


function clear() {
  if (true) {
    let $redBoxCoor = $redBox.getBoundingClientRect();
    let $redBoxXCoor = Math.floor($redBoxCoor.x);
    console.log($redBoxXCoor);
    if ($redBoxXCoor >  $clear - 23) { // 23은 디테일
      console.log(`dddd`);
    $game.innerHTML = '';
    window.location.href = "http://127.0.0.1:5500/hardestgame/html/subPage.html";
    return;
    }
  }
}

document.addEventListener("keydown", function (event) {
  const $box = document.querySelector(".box");
  const $boxStyle = getComputedStyle($box);
  const $boxLeft = parseInt($boxStyle.left);
  const $boxTop = parseInt($boxStyle.top);
  const $boxWidth = parseInt($boxStyle.width);
  const $boxHeight = parseInt($boxStyle.height);
  const step = 25;

  // clear();

  
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


export default clear;


