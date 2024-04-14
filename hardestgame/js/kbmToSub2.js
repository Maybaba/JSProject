
import { $hiddenClear } from "./getDom.js";

function nextLevel() {
  window.location.href = "http://127.0.0.1:5500/html/subPage2.html";
}



$hiddenClear.addEventListener('click', nextLevel)