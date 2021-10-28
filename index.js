import { figures } from "./modules/storage.js";
gsap.registerPlugin(MotionPathPlugin);

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

let FIGURES = gsap.utils.toArray(".wheel_area__wheel__inner__list__item");
const figuresWindow = 540;
const moveDistance =
  document.querySelector(".wheel_area__wheel__inner__list").scrollHeight -
  figuresWindow;
const firstFigure = document.querySelector(".item1");

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

const showWinnersFigures = (elements) => {
  const winnerItems = getWinner(elements);
  let winnerFigure = winnerItems.winFigure;
  const winNum = winnerItems.num;
  let mixedLastFiveBeforeFirst;

  const tl = gsap.timeline();

  if (winNum === 1) {
    mixedLastFiveBeforeFirst = [
      ...elements.slice(35, elements.length),
      ...elements.slice(0, 35),
    ];
    // const lastFive = elements.slice(35, elements.length);
    // const fromBeginToLastFive = elements.slice(0, 35);
    // mixedLastFiveBeforeFirst = [...lastFive, ...fromBeginToLastFive];
    // // fillWheelContent(mixedLastFiveBeforeFirst);
    // // FIGURES = gsap.utils.toArray(".wheel_area__wheel__inner__list__item");
    // // winnerFigure = FIGURES[6];
    // console.log(mixedLastFiveBeforeFirst);
    // console.log(winnerFigure);
  }

  const distances = {
    allLength: MotionPathPlugin.getRelativePosition(
      firstFigure,
      elements[elements.length - 1]
    ).y,
    winnerMove: MotionPathPlugin.getRelativePosition(firstFigure, winnerFigure)
      .y,
  };

  if (winNum >= 33) {
    console.log(FIGURES);
  }

  tl.fromTo(
    FIGURES,
    { y: -1000 + -distances.winnerMove },
    { y: -distances.winnerMove + 100, ease: "bounceOut", duration: 3 }
  ).to(FIGURES, {
    y: -distances.winnerMove,
    duration: 1,
    ease: "bounce",
  });
};

const LOOP = gsap
  .timeline({
    repeat: -1,
    paused: true,
    opacity: 1,
  })
  .add(runWheel());

function getWinner(elements) {
  // const num = gsap.utils.random(1, elements.length, 1);
  const num = 1;
  const winFigure = document.querySelector(`.item${num}`);
  return { winFigure, num };
}

const blurOrNot = {
  start: () => gsap.set(FIGURES, { "-webkit-filter": "blur(15px)" }),
  stop: () => gsap.set(FIGURES, { "-webkit-filter": "blur(0px)" }),
};

function controlLoop(e) {
  e.id === "start" || e.id === "stop" ? blurOrNot[e.id]() : null;

  if (e.id === "start") {
    LOOP.isActive() ? alert("Press STOP before") : LOOP.play();
  }
  if (e.id === "stop") {
    LOOP.isActive() ? LOOP.pause() : alert("Press START before");
    showWinnersFigures(figures);
  }
  return;
}
