
import { $game, $redBox, $eatCircle1, $clear, $avoid, $death } from "./getDom.js";
import {keys} from "./app.js";

document.querySelectorAll('.backgroundInGame1').forEach(function(element) {
  element.textContent = ''; 
});
document.querySelectorAll('.backgroundInGame2').forEach(function(element) {
  element.textContent = ''; 
});
document.querySelectorAll('.number').forEach(function(element) {
  element.textContent = ''; 
});

export const totalDeathObject = {
  totalDeath: null,
};

let deathCount = 0;

// 충돌 애니메이션 충돌중복감지
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


// 충돌 전체애니메이션 함수
export function detectCollision() {
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
  const restartArea = document.querySelector(".start");
  // const parentRect = restartArea.parentElement.getBoundingClientRect();
  const restartAreaRect = restartArea.getBoundingClientRect();
  console.log(restartAreaRect);
  const redBoxX = restartAreaRect.left;
  const redBoxY = restartAreaRect.top;


  $redBox.style.left = `${redBoxX}px`;
  $redBox.style.top = `${redBoxY}px`;

  // red box 화면에 다시 표시
  $redBox.style.display = "block";

  //red box opacity 1로 되돌림
  $redBox.style.opacity = 1;


  // 충돌 감지 상태와 애니메이션 상태 초기화
  isitColliding = false;
  isAnimating = false;

  // 키 이벤트 다시 등록하는데 중복되니까 onkeyup으로 설정하기
  window.addEventListener("keydown", function (event) {
    keys[event.key] = true;
  });
  window.addEventListener("keyup", function (event) {
    delete keys[event.key];
  });

  console.log("리스폰 완료.");
}

/*

// 빨간 박스
const $redBox = document.querySelector(".box");
console.log($redBox);

// 파란 공
const $avoid = [...document.querySelectorAll(".avoidCircle")];

//초록 세모
const $avoidTriangle = [...document.querySelectorAll(".avoidTriangle")];

//pikaboo
// const $pikabooEvent = document.getElementById("pikabooEvent");

//1. restartArea 위치
//1-1. safeArea 좌표 값을 변수로 선언(시작지점 html의 safe-Area 네 번째 요소)
// const safeArea = [...document.querySelectorAll(".safeArea")];
// const restartArea = safeArea[3];
const restartArea = document.querySelector(".start");
console.log(restartArea);

let deathCount = 0;


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
      // 충돌 감지 함수에서 호출하여 삼각형 애니메이션 재활성화
      restartTriangleAnimation();
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
      console.log(`충돌 발생 세모 : ${$avoidTriangles.id}`);
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

      // 충돌 감지 함수에서 호출하여 삼각형 애니메이션 재활성화
      restartTriangleAnimation();

      // const $avoidTriangle = document.querySelectorAll(".avoidTriangle");
      // $avoidTriangle.forEach((e) => {
      //   e.style.display = "block";
      //   console.log("삼각애니재활성");
      // });

    }
  }
}
// 삼각형 애니메이션을 재활성화하는 함수
function restartTriangleAnimation() {
  const $avoidTriangle = document.querySelectorAll(".avoidTriangle");
  $avoidTriangle.forEach((triangle) => {
    // HTML 요소를 클론하여 기존 요소 대체
    const newTriangle = triangle.cloneNode(true);
    triangle.parentNode.replaceChild(newTriangle, triangle);
  });

}


*/
