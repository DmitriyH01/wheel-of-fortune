import { figures } from "./modules/storage.js";
gsap.registerPlugin(ScrollTrigger);

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
    // setTimeout(() => tl.pause(0), 2500);
    // setTimeout(() => fillWheelContent(figures), 2500);
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
  const FIGURES = gsap.utils.toArray(".wheel_area__wheel__inner__list__item");
  const STAGGER = 0.5;
  const DURATION = 1;
  const OFFSET = 5 * STAGGER;

  const LOOP = gsap.timeline({
    paused: true,
    repeat: -1,
  });

  const SHIFTS = [...FIGURES, ...FIGURES, ...FIGURES];

  SHIFTS.forEach((BOX, index) => {
    const BOX_TL = gsap
      .timeline()
      .fromTo(
        BOX,
        {
          yPercent: 300,
        },
        {
          yPercent: -300,
          duration: 1,
          ease: "none",
          immediatRender: false,
        },
        0
      )
      .fromTo(
        BOX,
        {
          // scale: 0,
        },
        {
          // scale: 1,
          repeat: 1,
          zIndex: FIGURES.length,
          // yoyo: true,
          ease: "none",
          duration: 0.5,
          immediateRender: false,
        },
        0
      );
    LOOP.add(BOX_TL, index * STAGGER);
  });

  const CYCLE_DURATION = STAGGER * FIGURES.length;
  const START_TIME = CYCLE_DURATION + DURATION * 0.5 + OFFSET;
  const END_TIME = START_TIME + CYCLE_DURATION;
  gsap.fromTo(
    LOOP,
    {
      totalTime: START_TIME,
    },
    {
      totalTime: END_TIME,
      duration: 3,
      ease: "none",
      repeat: -1,
    }
  );
}
