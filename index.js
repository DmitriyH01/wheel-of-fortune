import { figures } from "./modules/storage.js";

const WHEEL = document.querySelector(".wheel_area__wheel__inner__list");
const TABLE = document.querySelector(".table__figures");

// let ifStartPress = true;
let count = 0;
let startPressed = true;

fillWheelContent(figures);
fillTableContent(figures);

document
  .querySelector(".wheel_area__buttons_wrap__start")
  .addEventListener("click", () => {
    shiftWheel();
    startPressed = false;
  });
document
  .querySelector(".wheel_area__buttons_wrap__stop")
  .addEventListener("click", () => {
    shiftWheel();
    startPressed = true;
  });

function fillWheelContent(arr) {
  let fragment = document.createDocumentFragment();
  WHEEL.innerHTML = "";
  fragment.appendChild(WHEEL);

  arr.forEach((el, index) => {
    let template = ` <li 
     class="wheel_area__wheel__inner__list__item item${index + 1}">


          <img id="figure${index}" src=${el}></img>
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
      <img src=${figure} alt=""></img>
    </li>`;
    TABLE.insertAdjacentHTML("beforeEnd", template);
  });
  document.querySelector(".table").appendChild(fragment);
}

function fillWheelWithRandomThreeFigures() {
  let fragment = document.createDocumentFragment();
  WHEEL.innerHTML = "";
  fragment.appendChild(WHEEL);

  count = randomInteger(0, 39);
  let maxThreeArr = [count, count + 1, count + 2];
  if (count === figures.length - 1) {
    maxThreeArr = [count, 0, 1];
  }
  if (count === figures.length - 2) {
    maxThreeArr = [count, count + 1, 0];
  }
  maxThreeArr.forEach((el) => {
    let template = ` <li class='wheel_area__wheel__inner__list__item'>
          <img src=${figures[el]}></img>
        </li>`;
    WHEEL.insertAdjacentHTML("beforeEnd", template);
  });
  setTimeout(
    () =>
      gsap.fromTo(
        ".wheel_area__wheel__inner__list__item",
        {
          y: 90,
        },
        {
          y: 0,
          ease: "bounce",
          duration: 2,
        }
      ),
    7040
  );
  document.querySelector(".wheel_area__wheel__inner").appendChild(fragment);
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const FIGURES = gsap.utils.toArray(".wheel_area__wheel__inner__list__item");
const listHeight =
  document.querySelector(".wheel_area__wheel__inner__list").scrollHeight - 540;

const LOOP = gsap
  .timeline({
    repeat: -1,
    paused: true,
  })
  .fromTo(
    FIGURES,
    { y: 0 },
    { y: -listHeight, ease: "none", duration: 1, reversed: true }
  );

// LOOP.seek(getNestedLabelTime(LOOP, "figure20"));

function shiftWheel() {
  // console.log(LOOP.labels);
  // one.pause();
  if (startPressed) {
    LOOP.play();
  }
  if (!startPressed) {
    console.log("stop");

    LOOP.pause();
  }
  /////////////////////////////////////////////////////////////////////
}
