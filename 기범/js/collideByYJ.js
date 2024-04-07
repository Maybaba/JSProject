// 빨간 박스
const $redBox = document.querySelector(".box");
console.log($redBox);

// 파란 공
const $avoid = [...document.querySelectorAll(".avoidCircle")];

//1. restartArea 위치
//1-1. safeArea 좌표 값을 변수로 선언(시작지점 safe-Area 네 번째 요소)
const safeArea = [...document.querySelectorAll(".safeArea")];
const restartArea = safeArea[3];
console.log(restartArea);

const rect = restartArea.getBoundingClientRect();
console.log(`restartArea 위치 정보: ${rect.x}, ${rect.y}`, rect);

// 2. 충돌 감지를 위한 함수
function detectCollision() {
  // 2-1. 빨간 박스의 위치와 크기 가져오기
  const redBoxRect = $redBox.getBoundingClientRect();
  console.log(`redBoxRect : `, redBoxRect);

  // 2-2. 파란 공들과 충돌 확인하기
  $avoid.forEach(($avoid) => {
    const avoidRect = $avoid.getBoundingClientRect();
    // 2-3. 충돌 감지 로직
    if (
      !(
        redBoxRect.right < avoidRect.left ||
        redBoxRect.left > avoidRect.right ||
        redBoxRect.bottom < avoidRect.top ||
        redBoxRect.top > avoidRect.bottom
      )
    ) {
      // 2-4. 충돌이 발생하면 해당 값의 아이디를 콘솔에 출력하고 safearea로 돌아가게 한다.
      console.log("충돌 발생:", $avoid.id);
      // 2-5. safeArea로 다시 돌아가는 로직
      //2-6. safeArea의 부모요소로부터 left값과 top값의 좌표값을 구하여 빨간박스 위치를
      //해당하는 값으로 재설정
      $redBox.style.left = restartArea.offsetLeft + 10 + "px"; //암묵적 형 변환
      $redBox.style.top = restartArea.offsetTop + 30 + "px";
      const redboxPosition = $redBox.getBoundingClientRect();
      console.log(
        `재시작 위치 :${redboxPosition.x}, ${redboxPosition.y}`,
        redboxPosition
      );
    }
  });
}
// 3. 매 100ms마다 충돌 감지 함수 실행
setInterval(detectCollision, 100);
