document.addEventListener("keydown", function (event) {
  const $box = document.querySelector(".box");
  const $boxStyle = getComputedStyle($box);
  const $boxLeft = parseInt($boxStyle.left);
  const $boxTop = parseInt($boxStyle.top);
  const $boxWidth = parseInt($boxStyle.width);
  const $boxHeight = parseInt($boxStyle.height);
  const step = 5;
  const $left = document.querySelectorAll(".left");


  // console.log($left);
  const leftArr=[];
  for(const lf of $left){
    leftArr.push(lf);
  }
  console.log()
  setInterval(function () {
    const left = $left.getBoundingClientRect().right;
    const boxLeft = $box.getBoundingClientRect().left;

    if (left >= boxLeft) {
      console.log("왼쪽닿음");
      switch (event.key) {
        // case "ArrowLeft":
        //   $box.style.left = Math.max($boxLeft - step, 0) + "px";
        //   break;
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
        // case "ArrowLeft":
        //   if (event.key === "ArrowLeft" && event.key === "ArrowUp") {
        //     $box.style.left = Math.max($boxLeft - step, 0) + "px";
        //     $box.style.top = Math.max($boxTop - step, 0) + "px";
        //   }
        //   break;
        // case "ArrowLeft":
        //   if (event.key === "ArrowLeft" && event.key === "ArrowDown") {
        //     $box.style.left = Math.max($boxLeft - step, 0) + "px";
        //     $box.style.top =
        //       Math.min(window.innerHeight - $boxHeight, $boxTop + step) + "px";
        //   }
        //   break;
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
    }
  });
});