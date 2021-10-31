import { figures } from "./modules/storage.js";
gsap.registerPlugin(MotionPathPlugin);

const WHEEL = document.querySelector(".wheel_area__wheel__inner__list");
const TABLE = document.querySelector(".table__figures");
const BUTTONS = document.querySelector(".wheel_area__buttons_wrap");
const START = document.querySelector("#start");
const STOP = document.querySelector("#stop");

fillWheelContent(figures);
fillTableContent(figures);

BUTTONS.addEventListener("click", (e) => {
  controlLoop(e.target);
});

const FIGURES = gsap.utils.toArray(".wheel_area__wheel__inner__list__item");
const figuresWindow = 540;
const moveDistance =
  document.querySelector(".wheel_area__wheel__inner__list").scrollHeight -
  figuresWindow;
const firstFigure = document.querySelector("#item1");
const startFigure = FIGURES[5];
let winnerFigure = null;

const getToStartPosition = () => {
  gsap.to(FIGURES, {
    y: -MotionPathPlugin.getRelativePosition(firstFigure, startFigure).y,
    duration: 0.1,
  });
};

getToStartPosition();

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

const LOOP = gsap
  .timeline({
    repeat: -1,
    paused: true,
    opacity: 1,
  })
  .add(runWheel());

function fillWheelContent(contents) {
  let fragment = document.createDocumentFragment();
  const moreFigures = [
    ...contents.slice(35, contents.length),
    ...contents,
    ...contents.slice(0, 9),
  ];
  WHEEL.innerHTML = "";
  fragment.appendChild(WHEEL);

  moreFigures.forEach((el, index) => {
    let template = ` <li id ="item${index + 1}"
     class="wheel_area__wheel__inner__list__item">


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
           <li >
      <img src=${figure} alt=""></img>
    </li>`;
    TABLE.insertAdjacentHTML("beforeEnd", template);
  });
  document.querySelector(".table").appendChild(fragment);
}

function showRandomFigures(elements) {
  winnerFigure = getRandomFigure();
  const startButtonOn = () => (START.disabled = false);
  const stopButtonOff = () => (STOP.disabled = true);

  const checkWin = () => {
    const secondItem = winnerFigure.nextElementSibling,
      thirdItem = secondItem.nextElementSibling;
    if (
      secondItem.children[0].attributes[0].nodeValue ===
        winnerFigure.children[0].attributes[0].nodeValue &&
      thirdItem.children[0].attributes[0].nodeValue ===
        winnerFigure.children[0].attributes[0].nodeValue
    ) {
      alert("You are lucky");
    }
    startButtonOn();
  };

  const tl = gsap.timeline();

  const distances = {
    winnerMove: MotionPathPlugin.getRelativePosition(firstFigure, winnerFigure)
      .y,
    beginSmoothStop: 1000,
    elementOffBounds: 120,
  };

  tl.fromTo(
    elements,
    { y: -distances.beginSmoothStop + -distances.winnerMove },
    {
      y: -distances.winnerMove + distances.elementOffBounds,
      ease: "bounceOut",
      duration: 3,
      onStart: stopButtonOff,
    }
  ).to(elements, {
    y: -distances.winnerMove,
    duration: 1,
    ease: "bounce",
    onComplete: checkWin,
  });
}

function getRandomFigure() {
  const num = gsap.utils.random(6, 45, 1);
  const randomItem = document.querySelector(`#item${num}`);
  return randomItem;
}

const blurOrNot = {
  start: () => gsap.set(FIGURES, { "-webkit-filter": "blur(20px)" }),
  stop: () => gsap.set(FIGURES, { "-webkit-filter": "blur(0px)" }),
};

function controlLoop(e) {
  e === START || e === STOP ? blurOrNot[e.id]() : null;

  if (e === START) {
    STOP.disabled = false;
    LOOP.isActive() ? null : LOOP.play();
    START.disabled = true;
  }

  if (e === STOP) {
    LOOP.isActive() ? LOOP.pause() : null;
    !STOP.disabled ? showRandomFigures(FIGURES) : null;
  }
  return;
}
