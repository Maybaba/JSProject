

// 클리어 시 삭제에 필요한 변수
const $body = document.body;
console.log($body);


// 파란 공
const $avoid = [...document.querySelectorAll('.avoidCircle')];
// 클리어존
const $clearZone = document.querySelector('.clearZone');
console.log($clearZone);
// 빨간 박스
const $redBox = document.querySelector('.box')

// 클리어존의 x(가로)좌표 값을 변수에 담는 과정
const $clearZoneCoor = $clearZone.getBoundingClientRect()
console.log(Math.floor($clearZoneCoor.x));
const $clear = $clearZoneCoor.x

// 게임이 끝나려면 빨간박스의 x좌표값이 클리어존의 좌표값
// 보다 커지면 끝난다. 빨간박스의 x좌표값을 변수에 담는다.
const $redBoxCoor = $redBox.getBoundingClientRect();
const $redBoxXCoor = Math.floor($redBoxCoor.x);
console.log($redBoxXCoor);

// char의 z-index가 safeArea보다 높다면 delete element.


function clear() {
  if ($redBoxXCoor > $clear) {
    console.log($redBoxXCoor);
    $body.innerHTML = '';
    return;
  }
}



document.addEventListener('keydown', function(event) {
  const $box = document.querySelector('.box');
  const $boxStyle = getComputedStyle($box);
  const $boxLeft = parseInt($boxStyle.left);
  const $boxTop = parseInt($boxStyle.top);
  const $boxWidth = parseInt($boxStyle.width);
  const $boxHeight = parseInt($boxStyle.height);
  const step = 20;

  switch(event.key) {
    case 'ArrowLeft':
      $box.style.left = Math.max($boxLeft - step, 0) + 'px';
      break;
    case 'ArrowUp':
      $box.style.top = Math.max($boxTop - step, 0) + 'px';
      break;
    case 'ArrowRight':
      $box.style.left = Math.min(window.innerWidth - $boxWidth, $boxLeft + step) + 'px';
      break;
    case 'ArrowDown':
      $box.style.top = Math.min(window.innerHeight - $boxHeight, $boxTop + step) + 'px';
      break;
    case 'ArrowLeft':
      if (event.key === 'ArrowLeft' && event.key === 'ArrowUp') {
        $box.style.left = Math.max($boxLeft - step, 0) + 'px';
        $box.style.top = Math.max($boxTop - step, 0) + 'px';
      }
      break;
    case 'ArrowLeft':
      if (event.key === 'ArrowLeft' && event.key === 'ArrowDown') {
        $box.style.left = Math.max($boxLeft - step, 0) + 'px';
        $box.style.top = Math.min(window.innerHeight - $boxHeight, $boxTop + step) + 'px';
      }
      break;
    case 'ArrowRight':
      if (event.key === 'ArrowRight' && event.key === 'ArrowUp') {
        $box.style.left = Math.min(window.innerWidth - $boxWidth, $boxLeft + step) + 'px';
        $box.style.top = Math.max($boxTop - step, 0) + 'px';
      }
      break;
    case 'ArrowRight':
      if (event.key === 'ArrowRight' && event.key === 'ArrowDown') {
        $box.style.left = Math.min(window.innerWidth - $boxWidth, $boxLeft + step) + 'px';
        $box.style.top = Math.min(window.innerHeight - $boxHeight, $boxTop + step) + 'px';
      }
      break;
  }
});

clear();