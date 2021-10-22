import { figures } from "./modules/storage.js";

const WHEEL = document.querySelector(".wheel_area__wheel__inner__list");
const TABLE = document.querySelector(".table__figures");
const BUTTONS = document.querySelector(".wheel_area__buttons_wrap");

fillWheelContent(figures);
fillTableContent(figures);

BUTTONS.addEventListener("click", (e) => {
  controlLoop(e.target);
});

function fillWheelContent(contents) {
  let fragment = document.createDocumentFragment();
  WHEEL.innerHTML = "";
  fragment.appendChild(WHEEL);

  contents.forEach((el, index) => {
    let template = ` <li 
     class="wheel_area__wheel__inner__list__item item${index + 1}">


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
      <img src=${figure} alt=""></img>
    </li>`;
    TABLE.insertAdjacentHTML("beforeEnd", template);
  });
  document.querySelector(".table").appendChild(fragment);
}

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

const stopWheel = () => {
  const winFigures = getWinners();
  console.log();
  gsap.fromTo(
    winFigures,
    { y: 0 },
    { y: -winFigures[0].getBoundingClientRect().y }
  );
};

const LOOP = gsap
  .timeline({
    repeat: -1,
    paused: true,
  })
  .add(runWheel())
  .addLabel("figuresCycl");

function getWinners() {
  let num = gsap.utils.random(1, 40, 1),
    num1 = num + 1,
    num2 = num + 2;

  if (num === 39) {
    num2 = 1;
  }
  if (num === 40) {
    num1 = 1;
    num2 = 2;
  }
  const winFigures = gsap.utils.toArray([
    `.item${num}, .item${num1},.item${num2}`,
  ]);
  return winFigures;
}

function prepareWheel() {}

function controlLoop(e) {
  // console.log(getWinners());
  if (e.id === "start") {
    console.log();
    LOOP.isActive() ? alert("Press STOP before") : LOOP.play();
  }
  if (e.id === "stop") {
    LOOP.isActive() ? LOOP.pause() : alert("Press START before");
    stopWheel();
  }
  // console.log(LOOP.labels);
  return;
}
