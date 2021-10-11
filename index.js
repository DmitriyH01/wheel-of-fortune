import { figures } from "./modules/storage.js";
gsap.registerPlugin(ScrollTrigger);
var tl = gsap.timeline({ repeat: -1, delay: 0 });

const WHEEL = document.querySelector(".wheel_area__wheel__inner__list");
const TABLE = document.querySelector(".table__figures");
let ifFirstPress = true;
// let count = 0;

fillWheelContent(figures);
fillTableContent(figures);

document
  .querySelector(".wheel_area__buttons_wrap__start")
  .addEventListener("click", () => {
    startWheel();
  });
document
  .querySelector(".wheel_area__buttons_wrap__stop")
  .addEventListener("click", () => {
    tl.duration(8);
    setTimeout(() => tl.pause(), 2500);
  });

function fillWheelContent(arr) {
  let fragment = document.createDocumentFragment();
  fragment.appendChild(WHEEL);

  // let maxThreeArr = [count, count + 1, count + 2];

  // if (count === arr.length - 1) {
  //   maxThreeArr = [count, 0, 1];
  // }
  // if (count === arr.length - 2) {
  //   maxThreeArr = [count, count + 1, 0];
  // }

  arr.forEach((el, index) => {
    let template = ` <li id = "item${index}" class="wheel_area__wheel__inner__list__item">
          <img src=${el}></img>
        </li>`;
    WHEEL.insertAdjacentHTML("beforeEnd", template);
  });

  document.querySelector(".wheel_area__wheel__inner").appendChild(fragment);
}

function fillTableContent(figures) {
  let fragment = document.createDocumentFragment();
  fragment.appendChild(TABLE);

  figures.forEach(function (figure, index) {
    let template = `  
           <li id = ${index}>
      <img src=${figure} id=${index} alt=""></img>
    </li>`;
    TABLE.insertAdjacentHTML("beforeEnd", template);
  });
  document.querySelector(".table").appendChild(fragment);
}

function viewRandomFigures() {
  count = randomInteger(0, 39);
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

function startWheel() {
  if (ifFirstPress) {
    tl.to(".wheel_area__wheel__inner__list__item", {
      y: -7040,
      duration: 0.3,
    });
  }
  ifFirstPress = false;
  tl.duration(0.3);
  tl.resume();
}
