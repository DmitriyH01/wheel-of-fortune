import { figures } from "./modules/storage.js";
gsap.registerPlugin(ScrollTrigger);

const WHEEL = document.querySelector(".wheel_area__wheel__inner__list");
const TABLE = document.querySelector(".table__figures");

fillWheelContent(figures);
fillTableContent(figures);

document
  .querySelector(".wheel_area__buttons_wrap__start")
  .addEventListener("click", () => {
    startWheel();
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
    let template = ` <li id = ${index} class="wheel_area__wheel__inner__list__item">
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
  doFirstTime++;
  count = randomInteger(0, 39);
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

///////////GS|/////
/////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

function startWheel(params) {
  const stagger = 0.05; // Used in our shifting tween
  const BOXES = gsap.utils.toArray(".wheel_area__wheel__inner__list__item");

  const getShift = () =>
    gsap.fromTo(
      BOXES,
      {
        yPercent: 0,
      },
      {
        yPercent: -4000,
        stagger,
        duration: 1,
        ease: "none",
      }
    );

  const LOOP = gsap
    .timeline({
      repeat: -1,
    })
    .add(getShift(), 0)
    .add(getShift(), BOXES.length * stagger)
    .add(getShift(), BOXES.length * stagger * 2);
}

// const getShift = () =>
//   gsap.fromTo(
//     ".wheel_area__wheel__inner__list__item",
//     {
//       yPercent: 0,
//     },
//     {
//       yPercent: -4000,
//       stagger: 0.05,
//       duration: 1,
//       ease: "none",
//     }
//   );

// const LOOP = gsap.timeline().add(getShift()).add(getShift()).add(getShift());

// const SHIFT = gsap.fromTo(
//   ".wheel_area__wheel__inner__list__item",
//   {
//     yPercent: 0,
//   },
//   {
//     paused: true,
//     yPercent: -5000,
//     stagger: 0.05,
//     duration: 2,
//     repeat: -1,
//     ease: "none",
//   }
// );

// const DURATION = SHIFT.duration();

// function startWheel() {
//   gsap.to(SHIFT, {
//     totalTime: DURATION,
//     repeat: -1,
//     duration: DURATION,
//     ease: "none",
//   });
// }

/////////////////////////////////////
