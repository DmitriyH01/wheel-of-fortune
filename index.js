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
      duration: 1.1, //1.1
      reversed: true,
    }
  );

const showWinnersFigures = (elements) => {
  const winnerItems = getWinner(elements);
  const thirtyFive = elements[35];
  const thirtyFour = elements[34];
  const winnerFigure = winnerItems.winFigure;
  const winnerNum = winnerItems.num;

  const tl = gsap.timeline();

  const distances = {
    allLength: MotionPathPlugin.getRelativePosition(
      firstFigure,
      elements[elements.length - 1]
    ).y,
    winnerMove: MotionPathPlugin.getRelativePosition(firstFigure, winnerFigure)
      .y,
    toLastFive: MotionPathPlugin.getRelativePosition(firstFigure, thirtyFour).y,
    fromThirtyFiveToFirst: MotionPathPlugin.getRelativePosition(
      firstFigure,
      thirtyFive
    ).y,
  };

  const finalShift = () => {
    FIGURES = gsap.utils.toArray(".wheel_area__wheel__inner__list__item");
    tl.fromTo(
      FIGURES,
      { y: -1000 + -distances.winnerMove },
      { y: -distances.winnerMove + 100, ease: "bounceOut", duration: 3 }
    ).to(FIGURES, { y: -distances.winnerMove, duration: 1, ease: "bounce" });
  };

  const prepareFigure = () => {
    const lastFiveFigures = elements.slice(35, 40);
    tl.fromTo(
      elements,
      { y: 0 },
      { y: distances.allLength - distances.toLastFive, duration: 1 }
    ).to(lastFiveFigures, {
      y: -distances.fromThirtyFiveToFirst,
      duration: 1,
    });
    const changed = gsap.utils.toArray(".wheel_area__wheel__inner__list__item");
    console.log(changed);
    // .fromTo(
    //   elements,
    //   { y: -1000 + -distances.winnerMove },
    //   { y: -distances.winnerMove + 100, ease: "bounceOut", duration: 3 }
    // )
    // .to(elements, { y: -distances.winnerMove, duration: 1, ease: "bounce" });
  };

  if (winnerNum === 1) {
    prepareFigure();
  }

  if (winnerNum >= 33) {
    console.log(FIGURES);
  }

  // tl.fromTo(
  //   FIGURES,
  //   { y: -1000 + -distances.winnerMove },
  //   { y: -distances.winnerMove + 100, ease: "bounceOut", duration: 3 }
  // ).to(FIGURES, { y: -distances.winnerMove, duration: 1, ease: "bounce" });
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
    showWinnersFigures(FIGURES);
  }
  return;
}
