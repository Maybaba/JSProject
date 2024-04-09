
document.addEventListener("keydown", function (event) {
  const $box = document.querySelector(".box");
  const $boxStyle = getComputedStyle($box);
  const $boxLeft = parseInt($boxStyle.left);
  const $boxTop = parseInt($boxStyle.top);
  const $boxWidth = parseInt($boxStyle.width);
  const $boxHeight = parseInt($boxStyle.height);
  const step = 10;

  switch (event.key) {
    case "ArrowLeft":
      if (!checkCollision("left")) {
        $box.style.left = Math.max($boxLeft - step, 0) + "px";
      }
      break;
    case "ArrowUp":
      if (!checkCollision("up")) {
        $box.style.top = Math.max($boxTop - step, 0) + "px";
      }
      break;
    case "ArrowRight":
      if (!checkCollision("right")) {
        $box.style.left =
          Math.min(window.innerWidth - $boxWidth, $boxLeft + step) + "px";
      }
      break;
    case "ArrowDown":
      if (!checkCollision("down")) {
        $box.style.top =
          Math.min(window.innerHeight - $boxHeight, $boxTop + step) + "px";
      }
      break;
  }
});

function checkCollision(direction) {
  const $box = document.querySelector(".box");
  const $boxRect = $box.getBoundingClientRect();
  const $obstacles = document.querySelectorAll(".leftborder, .rightborder, .topborder, .bottomborder");

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
