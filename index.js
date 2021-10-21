import { figures } from "./modules/storage.js";

const WHEEL = document.querySelector(".wheel_area__wheel__inner__list");
const TABLE = document.querySelector(".table__figures");
const BUTTONS = document.querySelector(".wheel_area__buttons_wrap");

let count = 0;

fillWheelContent(figures);
fillTableContent(figures);

BUTTONS.addEventListener("click", (e) => {
  controlLoop(e.target);
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

// function fillWheelWithRandomThreeFigures() {
//   let fragment = document.createDocumentFragment();
//   WHEEL.innerHTML = "";
//   fragment.appendChild(WHEEL);

//   count = randomInteger(0, 39);
//   let maxThreeArr = [count, count + 1, count + 2];
//   if (count === figures.length - 1) {
//     maxThreeArr = [count, 0, 1];
//   }
//   if (count === figures.length - 2) {
//     maxThreeArr = [count, count + 1, 0];
//   }
//   maxThreeArr.forEach((el) => {
//     let template = ` <li class='wheel_area__wheel__inner__list__item'>
//           <img src=${figures[el]}></img>
//         </li>`;
//     WHEEL.insertAdjacentHTML("beforeEnd", template);
//   });
//   setTimeout(
//     () =>
//       gsap.fromTo(
//         ".wheel_area__wheel__inner__list__item",
//         {
//           y: 90,
//         },
//         {
//           y: 0,
//           ease: "bounce",
//           duration: 2,
//         }
//       ),
//     0.2
//   );
//   document.querySelector(".wheel_area__wheel__inner").appendChild(fragment);
// }

// function randomInteger(min, max) {
//   let rand = min + Math.random() * (max + 1 - min);
//   return Math.floor(rand);
// }

const FIGURES = gsap.utils.toArray(".wheel_area__wheel__inner__list__item");
const figuresWindow = 540;
const moveDistance =
  document.querySelector(".wheel_area__wheel__inner__list").scrollHeight -
  figuresWindow;

const runWheel = () =>
  gsap.fromTo(
    FIGURES,
    { y: 0 },
    {
      y: -moveDistance,
      ease: "none",
      duration: 1.1,
      reversed: true,
    }
  );

// const stopWheel = ()=>
// gsap.to()
const LOOP = gsap
  .timeline({
    repeat: -1,
    paused: true,
  })
  .add(runWheel());

function controlLoop(e) {
  const random = gsap.utils.random(1, 40, 1);
  console.log(random);
  if (e.id === "start") {
    console.log();
    LOOP.isActive() ? alert("Press STOP before") : LOOP.play();
  }
  if (e.id === "stop") {
    LOOP.isActive() ? LOOP.pause() : alert("Press START before");
  }
  return;
}
