import { figures } from "./modules/storage.js";
gsap.registerPlugin(ScrollTrigger);
var tl = gsap.timeline({ repeat: -1, delay: 0 });

const WHEEL = document.querySelector(".wheel_area__wheel__inner__list");
const TABLE = document.querySelector(".table__figures");

let ifStartPress = true;
let count = 0;

fillWheelContent(figures);
fillTableContent(figures);

document
  .querySelector(".wheel_area__buttons_wrap__start")
  .addEventListener("click", () => {
    ifStartPress = true;
    fillWheelContent(figures);
    startWheel();
  });
document
  .querySelector(".wheel_area__buttons_wrap__stop")
  .addEventListener("click", () => {
    tl.duration(7);
    setTimeout(() => tl.duration(10), 1000);
    setTimeout(() => tl.pause(), 2500);
    setTimeout(() => fillWheelContent(figures), 2500);
  });

function fillWheelContent(figures) {
  console.log(ifStartPress);
  let fragment = document.createDocumentFragment();
  WHEEL.innerHTML = "";
  fragment.appendChild(WHEEL);

  if (ifStartPress) {
    figures.forEach((el, index) => {
      let template = ` <li id = "item${index}" class="wheel_area__wheel__inner__list__item">
          <img src=${el}></img>
        </li>`;
      WHEEL.insertAdjacentHTML("beforeEnd", template);
    });
  }
  if (!ifStartPress) {
    count = randomInteger(0, 39);
    let maxThreeArr = [count, count + 1, count + 2];

    if (count === figures.length - 1) {
      maxThreeArr = [count, 0, 1];
    }
    if (count === figures.length - 2) {
      maxThreeArr = [count, count + 1, 0];
    }

    maxThreeArr.forEach((el, index) => {
      let template = ` <li id = "item${index}" class="wheel_area__wheel__inner__list__item">
          <img src=${figures[el]}></img>
        </li>`;
      WHEEL.insertAdjacentHTML("beforeEnd", template);
    });
    setTimeout(
      () =>
        gsap.fromTo(
          ".wheel_area__wheel__inner__list__item",
          {
            y: 80,
          },
          {
            y: 0,
            ease: "bounce",
            duration: 2,
          }
        ),
      100
    );
  }

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

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

function startWheel() {
  if (ifStartPress) {
    tl.to(".wheel_area__wheel__inner__list__item", {
      y: -7040,
      duration: 0.3,
    });
    ifStartPress = false;
  }

  tl.play({ duration: 0.3 });
}
