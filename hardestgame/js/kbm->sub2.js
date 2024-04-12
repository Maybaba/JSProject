
import { $hiddenClear } from "./getDom.js";

function nextLevel() {
  window.location.href = "http://127.0.0.1:5500/hardestgame/html/subPage2.html";
}

setTimeout(nextLevel, 2500);

$hiddenClear.addEventListener('click', nextLevel)