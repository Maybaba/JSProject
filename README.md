**팀 이름 : 빨간박스**

**프로젝트 : 디벨롭먼트 크로니클**

**세상에서 가장 어려운 게임 클론**

[세상에서 가장 어려운 게임 1 - The Worlds Hardest Game 1](https://vidkidz.tistory.com/12)

팀원별 핵심 구현기능**

1. 병모씨 - 빨간 박스 움직이는 이벤트, 테두리 밖으로 못나가게
2. 윤종씨 - 파란구슬과 충돌 시 벌어지는 이벤트
3. 준원씨 - 노란구슬 없애기, 다 못먹으면 끝나지 않게끔
4. 기범씨 - 도착지점 닿으면 클리어

일정**

4월 11일 목요일까지 구현 완료

4월 12일 금요일 ppt 및 발표준비 완료

4월 15일 월요일 발표

### CSS default

노랑 : #FFFF00

배경 #B4B5FE

맵 배경 : #E6E6FF

맵 배경 2 #F7F7FF

도착 및 시작점 : #B5FEB4

해상도

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/39127e5a-6196-4261-9954-f652c3026786/5ecbe26d-93d9-4e92-8c6d-4b4cd0184df3/Untitled.png)

reset css

 <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.2.0/uicons-regular-rounded/css/uicons-regular-rounded.css'>

icons

https://www.flaticon.com/icon-fonts-most-downloaded

[](https://www.flaticon.com/)

**발표내용**  

1. 프로젝트 선정배경 : 평소에 즐겨하던 게임 프로그래밍기술을 배웠을 때 가장 먼저 떠율랐고 만들어보고싶었음

2. 데이터를 통한 공식화된 자료: 이게임 알아? 응 마니 알아 점심시간에 다들 오 그개임 만들어”? 라는 호평을 얻음 이로인해서 이 게임을 개발하면 즐겨찾는 이가 많을 거라는 결론에 도달 → 제작

3. 타사 제품 비교

4.팀원소개에서 자신이 한 영역을 정확하게 작성 내일 오후 4시에 내용 합치는걸로

5. 일정 진행 : 적어놓은거 합치기

6. 다이어그램 ERD (아직은 필요없음) 

7. 기술스택 : html css js git 잔디 vsc GPT 3.5

8. 트러블 슈팅 (버그픽스 현황) 본인이 알아서 정리 내일 합침

9. 핵심 기능 소개(시연도 함께함) 시연할 때는 영상녹화로 진행하기 (직접해도 ㄱㅊ하긴한데) 병모님 시연

10. QR, 깃 링크 연결 내일합치기

11. 향후 업데이트 예정 :  애니메이션 , 맵 확장, 난이도 조절,  이스터에그

12. 마지막으로 무엇을 배웠는지 : 각자 정리

### 회의내용

**20240404 (목) 1일차 회의**

- 회의 전 생각하고 준비한 내용
    - 게임 지정 : 세상에서 가장 어려운 게임
        
        ![화면 기록 2024-04-04 오후 9.30.45.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/39127e5a-6196-4261-9954-f652c3026786/1e55c14f-3dbe-4ed3-80f0-17357f570aea/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2024-04-04_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9.30.45.gif)
        
    1. 이유 : js 함수로 게임 구현하기 위해
    2. 해결 및 수시확인해야 할 사항들
        1. 해상도를 맞출 수 없어 오류가 뜸. 그래서 윈도우에서 같이 확인하면서 작업하여야 함
            
            ![스크린샷 2024-04-04 오후 2.37.51.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/39127e5a-6196-4261-9954-f652c3026786/e2a2fbb4-2823-4522-ac4f-aa2efbbb31e8/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-04-04_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.37.51.png)
            
        2. 사람들이 새로운 가지를 파서 새 css를 만들어서 했는지, 아니면 기존의 파일을 임포트해서 수정했는지 확인 필요, css에서 컨플릭트 무조건 날 것 같음
            
            ![스크린샷 2024-04-04 오후 2.52.36.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/39127e5a-6196-4261-9954-f652c3026786/fdbba467-0b60-45c2-a946-0e17a371073d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-04-04_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.52.36.png)
            
        3. 기능을 하나하나 따로 만들어서 하나의 html에 합치려면 html도 한 곳으로 합쳐야 함
        4. 스토리텔링 필요
        5. js 기본 뼈대 구성 필요
        
        html 구현 함께 만들어서 완료
        
        - 소스가 모두 충돌한다, 파일 관리하기가 어렵다
        
        - 자바스크립트 로직 구현 : 1. 사용자의 입력 받아들이기 2. 캐릭터 움직임 관리하기 3. 적의 움직임 관리하기 4. 충돌 이벤트 관리
        - css, html 초입 구현 : 1. 헤더푸터, 초입 디자인, 중간 이미지 디자인
        - 깃, 파일 관리
        
- 가위바위보로 깃 관리와 팀장 정함
- 사다리타기로 csshtml 1명 js 3명 나누었음
- 3명이서 맵 하나씩 구현하기로 정하였고 이번주까지 디자인 완료 하기로 함
- 한명이서 하나의 맵을 개발하기로 함
- 추후 도입, 중간 글귀, 헤더푸터등의 디자인을 잡기로 함
- 생각해보니 동일한 작업을 하게 됨
- 그 작업에는 각자의 맵 디자인, 사용자움직임, 적움직임, 충돌관리 등이 있음
- 파일 충돌과 병합할 때 에러가 발생할 것으로 우려됨
    - 예를 들어, 한명이 만든 맵의 모든 기능을 import와 export할 때 이름이 겹치거나 서로 독립된 중복작업으로 돌아가지 않아서 구현이 되지 않을때
    - 서로 독립해서 같은 작업을 할 때 회의시간 > 각자의 기능을 구현해가면서 하는 회의시간
    - 그로 인해 생기는 수정과 에러 확인이 더 빠른 기간안에 끝날 것 같음
**20240405 (금) 2일차**
    
   각자 기능구현

1. 병모씨 - 빨간 박스 움직이는 이벤트, 테두리 밖으로 못나가게
2. 윤종씨 - 파란구슬과 충돌 시 벌어지는 이벤트 - html, css 만들기
3. 준원씨 - 노란구슬 없애기, 다 못먹으면 끝나지 않게끔
4. 기범씨 - 도착지점 닿으면 클리어


**240408 (월) 3일차**

구현기능 병합 - app.js : 팀원 전체 모두

배너, 데스카운팅 : 한기범

코인 다머겅야 넘어가게 하기 : 다같이 찾다가 황정원

팀플 할 때 다같이 하는 건 우선순위가 낮은 걸로, 우선순위가 높은  기능은 혼자 개발하는 것으로 의견제시하기

- 구현기능 병합, 부가기능 개발
1. 본인 새로운 맵 디자인하기 : 모두
2. 캐릭터 움직이는 모션 부드럽게 모두 
3. 시연할 때 못깰경우 숨겨진 클리어존 만들기,다음판에도 넘어가는 카운트 : 기범
4. 윤종 : 이스터에그, 죽었을때애니메이션 (- 죽었을 때 1초만에 그 자리에서 사라지는 이벤트), 모서리 디테일, z인덱스

**240409(화)**

- 각자 게임 기능 개발
- border 속성을 가진 Class script
    
    ```java
    <!DOCTYPE html>
    <html>
    <head>
        <title>Box Move within Boundary</title>
        <style>
            /* 컨테이너와 박스의 스타일을 정의합니다. */
            #container {
                width: 400px; /* 컨테이너의 너비 */
                height: 400px; /* 컨테이너의 높이 */
                position: relative; /* 박스를 컨테이너 내에서 절대 위치로 설정하기 위함 */
                background: #f0f0f0; /* 배경색 */
                border: 2px solid #000; /* 테두리 */
            }
            #box {
                width: 50px; /* 박스의 너비 */
                height: 50px; /* 박스의 높이 */
                position: absolute; /* 컨테이너 내에서의 절대 위치 */
                background: #333; /* 박스의 배경색 */
            }
        </style>
    </head>
    <body>
    
    <div id="container">
        <div id="box"></div>
    </div>
    
    <script>
        const box = document.getElementById('box'); // 움직일 박스 요소
        let x = 0, y = 0; // 박스의 초기 위치
        const step = 10; // 박스가 한 번에 움직일 수 있는 거리 (픽셀 단위)
    
        // 컨테이너 요소와 박스가 움직일 수 있는 최대 범위를 계산
        const container = document.getElementById('container');
        const maxRight = container.offsetWidth - box.offsetWidth; // 최대 오른쪽 이동 거리
        const maxBottom = container.offsetHeight - box.offsetHeight; // 최대 아래쪽 이동 거리
    
        function moveBox(e) {
            // 키보드 방향키에 따라 박스의 위치를 업데이트합니다.
            switch(e.key) {
                case 'ArrowUp': // 위쪽 화살표 키
                    y = Math.max(0, y - step); // 위로 이동. y 값이 0 미만이 되지 않도록 합니다.
                    break;
                case 'ArrowDown': // 아래쪽 화살표 키
                    y = Math.min(maxBottom, y + step); // 아래로 이동. y 값이 maxBottom을 초과하지 않도록 합니다.
                    break;
                case 'ArrowLeft': // 왼쪽 화살표 키
                    x = Math.max(0, x - step); // 왼쪽으로 이동. x 값이 0 미만이 되지 않도록 합니다.
                    break;
                case 'ArrowRight': // 오른쪽 화살표 키
                    x = Math.min(maxRight, x + step); // 오른쪽으로 이동. x 값이 maxRight을 초과하지 않도록 합니다.
                    break;
            }
            // 업데이트된 위치를 박스 스타일에 적용합니다.
            box.style.left = x + 'px';
            box.style.top = y + 'px';
        }
    
        // 키보드 이벤트 리스너를 추가하여, 키보드 입력이 있을 때 moveBox 함수를 호출합니다.
        window.addEventListener('keydown', moveBox);
    </script>
    
    </body>
    </html>
    
    ```
    
1. https://ko.javascript.info/settimeout-setinterval

**20240409 (화) ~ 0410 (수)**

각자 맡은 기능 구현 (게임모서리, 애니메이션 함수, 이스터에그), 본인 맵 구현 수요일 저녁까지 푸시하면 파일정리 

https://developer.mozilla.org/ko/docs/Web/API/window/requestAnimationFrame

**202404010 (목)**

기능구현 병합 , 클리어하면 페이지 연결

버그픽스 (윈도우 화면 해상도 맞추기, 충돌 애니메이션 함수, death 카운트 되는 함수)

향후업데이트 예정기능 정리







