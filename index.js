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
  const figures42 = [...contents, contents[0], contents[1]];
  let fragment = document.createDocumentFragment();
  WHEEL.innerHTML = "";
  fragment.appendChild(WHEEL);

  figures42.forEach((el, index) => {
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
const firstItem = document.querySelector(".item1");

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

const showWinnersFigures = () => {
  const winFigures = getWinners();
  const firstWinnerItem = document.querySelector(
    `.${winFigures[0].classList[1]}`
  );
  const moveCoordinate = MotionPathPlugin.getRelativePosition(
    firstItem,
    firstWinnerItem
  );

  const tl = gsap
    .timeline({})
    .to(
      winFigures,
      {
        y: -moveCoordinate.y,
        opacity: 1,
        duration: 0.02,
      },
      "stop"
    )
    .fromTo(
      winFigures,
      { y: -100 + -moveCoordinate.y },
      { y: -moveCoordinate.y, ease: "bounce", duration: 1 },
      "stop"
    );
};

const LOOP = gsap
  .timeline({
    repeat: -1,
    paused: true,
    opacity: 1,
  })
  .add(runWheel());

function getWinners() {
  let num = gsap.utils.random(1, 40, 1),
    num1 = num + 1,
    num2 = num + 2;
  const winFigures = gsap.utils.toArray([
    `.item${num}, .item${num1},.item${num2}`,
  ]);
  return winFigures;
}

const showOrHideFigures = {
  start: () =>
    gsap.set(FIGURES, { opacity: 1, "-webkit-filter": "blur(25px)" }),
  stop: () => gsap.set(FIGURES, { opacity: 0, "-webkit-filter": "blur(0px)" }),
};

function controlLoop(e) {
  e.id === "start" || e.id === "stop" ? showOrHideFigures[e.id]() : null;
  if (e.id === "start") {
    LOOP.isActive() ? alert("Press STOP before") : LOOP.play();
  }
  if (e.id === "stop") {
    LOOP.isActive() ? LOOP.pause() : alert("Press START before");
    showWinnersFigures();
  }
  return;
}


