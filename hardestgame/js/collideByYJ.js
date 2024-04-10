// 빨간 박스
const $redBox = document.querySelector(".box");
console.log($redBox);

// 파란 공
const $avoid = [...document.querySelectorAll(".avoidCircle")];

//초록 세모
const $avoidTriangle = [...document.querySelectorAll(".avoidTriangle")];

//pikaboo
const $pikabooEvent = document.getElementById("pikabooEvent");

//1. restartArea 위치
//1-1. safeArea 좌표 값을 변수로 선언(시작지점 html의 safe-Area 네 번째 요소)
// const safeArea = [...document.querySelectorAll(".safeArea")];
// const restartArea = safeArea[3];
const restartArea = document.querySelector(".start");
console.log(restartArea);

const rect = restartArea.getBoundingClientRect();
console.log(`restartArea 위치 정보: ${rect.x}, ${rect.y}`, rect);

// 충돌 감지를 위한 함수
export function detectCollision() {
  // 빨간 박스의 위치와 크기 가져오기
  const redBoxRect = $redBox.getBoundingClientRect();

  // 파란 공들 충돌 확인하기
  for (const $avoidCircle of $avoid) {
    const avoidRect = $avoidCircle.getBoundingClientRect();
    // 충돌 감지 로직
    if (
      !(
        redBoxRect.right < avoidRect.left ||
        redBoxRect.left > avoidRect.right ||
        redBoxRect.bottom < avoidRect.top ||
        redBoxRect.top > avoidRect.bottom
      )
    ) {
      // 충돌이 발생하면 해당 값의 아이디를 콘솔에 출력하고 safearea로 돌아가게 한다.
      console.log(`충돌 발생 avoid(파란공) : ${$avoidCircle.id}`);
      // safeArea로 다시 돌아가는 로직
      // safeArea의 부모요소로부터 left값과 top값의 좌표값을 구하여 빨간박스 위치를 해당하는 값으로 재설정
      $redBox.style.left = restartArea.offsetLeft + 10 + "px"; // 암묵적 형 변환
      $redBox.style.top = restartArea.offsetTop + 30 + "px";
      // 노란 동그라미 재활성 로직
      const $eatCircle = document.querySelectorAll(".eatCircle");
      $eatCircle.forEach((e) => {
        e.style.display = "block";
      });

      const redboxPosition = $redBox.getBoundingClientRect();

      console.log(
        `재시작 위치 :${redboxPosition.x}, ${redboxPosition.y}`,
        redboxPosition
      );
    }
  }

  // 마찬가지로 세모 장애물 충돌 처리
  for (const $avoidTriangles of $avoidTriangle) {
    const triangleRect = $avoidTriangles.getBoundingClientRect();
    // 충돌 감지 로직
    if (
      !(
        redBoxRect.right < triangleRect.left ||
        redBoxRect.left > triangleRect.right ||
        redBoxRect.bottom < triangleRect.top ||
        redBoxRect.top > triangleRect.bottom
      )
    ) {
      // 충돌이 발생하면 해당 값의 아이디를 콘솔에 출력하고 safearea로 돌아가게 한다.
      console.log(`충돌 발생 avoidTriangle(초록세모) : ${$avoidTriangles.id}`);
      // safeArea로 다시 돌아가는 로직
      // safeArea의 부모요소로부터 left값과 top값의 좌표값을 구하여 빨간박스 위치를 해당하는 값으로 재설정
      $redBox.style.left = restartArea.offsetLeft + 10 + "px"; // 암묵적 형 변환
      $redBox.style.top = restartArea.offsetTop + 30 + "px";
      // 노란 동그라미 재활성 로직
      const $eatCircle = document.querySelectorAll(".eatCircle");
      $eatCircle.forEach((e) => {
        e.style.display = "block";
      });

      const redboxPosition = $redBox.getBoundingClientRect();

      console.log(
        `재시작 위치 :${redboxPosition.x}, ${redboxPosition.y}`,
        redboxPosition
      );
    }
  }

  // 피카부 이벤트존 충돌 감지 로직
  // const picabooRect = $pikabooEvent.getBoundingClientRect();
  // if (
  //   !(
  //     redBoxRect.right < picabooRect.left ||
  //     redBoxRect.left > picabooRect.right ||
  //     redBoxRect.bottom < picabooRect.top ||
  //     redBoxRect.top > picabooRect.bottom
  //   )
  // ) {
    // 충돌이 발생하면 해당 값의 아이디를 콘솔에 출력하고 2개의 초록세모를 움직인다
  //   console.log(
  //     `pikaboo 이벤트존 입성 : ${$pikabooEvent.id}, 초록세모 애니메이션 시작`
  //   );
  //   // 이벤트존 충돌에만 움직이는 초록세모 애니메이션 적용
  //   $avoidTriangle.forEach(($triangle) => {
  //     $triangle.style.animation = "moveTriangleUp 0.7s infinite";
  //   });
  // }
}



// // 2. 충돌 감지를 위한 함수
// export function detectCollision() {
//   // 2-1. 빨간 박스의 위치와 크기 가져오기
//   const redBoxRect = $redBox.getBoundingClientRect();
//   // console.log(`redBoxRect : `, redBoxRect);

//   // 2-2. 파란 공들과 세모 장애물 충돌 확인하기
//   $avoid.forEach(($avoid) => {
//     const avoidRect = $avoid.getBoundingClientRect();
//     // 2-3. 충돌 감지 로직
//     if (
//       !(
//         redBoxRect.right < avoidRect.left ||
//         redBoxRect.left > avoidRect.right ||
//         redBoxRect.bottom < avoidRect.top ||
//         redBoxRect.top > avoidRect.bottom
//       )
//     ) {
//       // 2-4. 충돌이 발생하면 해당 값의 아이디를 콘솔에 출력하고 safearea로 돌아가게 한다.
//       console.log(`충돌 발생 avoid(파란공) : ${$avoid.id}, triangle : ${$avoidTriangle.id}`);
//       // 2-5. safeArea로 다시 돌아가는 로직
//       //2-6. safeArea의 부모요소로부터 left값과 top값의 좌표값을 구하여 빨간박스 위치를
//       //해당하는 값으로 재설정
//       $redBox.style.left = restartArea.offsetLeft + 10 + "px"; //암묵적 형 변환
//       $redBox.style.top = restartArea.offsetTop + 30 + "px";
//       // 노란 동그라미 재활성 로직
//       const $eatCircle = document.querySelectorAll(".eatCircle");
//       $eatCircle.forEach(e=>{
//         e.style.display="block";
//       })

//       const redboxPosition = $redBox.getBoundingClientRect();

//       console.log(
//         `재시작 위치 :${redboxPosition.x}, ${redboxPosition.y}`,
//         redboxPosition
//       );
//     }
//   });
// }
