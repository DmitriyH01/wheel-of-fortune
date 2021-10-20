import { figures } from "./modules/storage.js";
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollToPlugin);

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
  // const reversedFigures = arr.reverse();
  console.log(figures);
  let fragment = document.createDocumentFragment();
  WHEEL.innerHTML = "";
  fragment.appendChild(WHEEL);

  figures.forEach((el, index) => {
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

const BOXES = gsap.utils.toArray(".wheel_area__wheel__inner__list__item");
const listHeight =
  document.querySelector(".wheel_area__wheel__inner__list").scrollHeight - 540;

const LOOP = gsap.timeline({
  repeat: -1,
  paused: true,
});

LOOP.fromTo(".item1", { id: "figure1", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item2", { id: "figure2", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item3", { id: "figure3", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item4", { id: "figure4", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item5", { id: "figure5", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item6", { id: "figure6", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item7", { id: "figure7", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item8", { id: "figure8", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item9", { id: "figure9", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item10", { id: "figure10", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item11", { id: "figure11", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item12", { id: "figure12", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item13", { id: "figure13", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item14", { id: "figure14", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item15", { id: "figure15", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item16", { id: "figure16", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item17", { id: "figure17", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item18", { id: "figure18", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item19", { id: "figure19", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item20", { id: "figure20", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item21", { id: "figure21", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item22", { id: "figure22", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item23", { id: "figure23", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item24", { id: "figure24", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item25", { id: "figure25", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item26", { id: "figure26", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item27", { id: "figure27", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item28", { id: "figure28", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item29", { id: "figure29", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item30", { id: "figure30", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item31", { id: "figure31", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item32", { id: "figure32", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item33", { id: "figure33", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item34", { id: "figure34", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item35", { id: "figure35", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item36", { id: "figure36", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item37", { id: "figure37", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item38", { id: "figure38", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(".item39", { id: "figure39", y: 0 }, { y: -listHeight, ease: "none" })
  .fromTo(
    ".item40",
    { id: "figure40", y: 0 },
    { y: -listHeight, ease: "none" }
  );

function shiftWheel() {
  // console.log(tl.progress());
  // one.pause();
  if (startPressed) {
    // console.log(ScrollTrigger.positionInViewport(".item40", "top"));
    LOOP.play();
  }
  if (!startPressed) {
    console.log("stop");
    console.log(LOOP.labels);

    LOOP.pause();
  }
  /////////////////////////////////////////////////////////////////////
}
function createTl() {
  let fragment = document.createDocumentFragment();
  const allItems = document.createElement("span");
  fragment.appendChild(allItems);

  for (let index = 1; index <= 40; index++) {
    let template = `.fromTo(".item${index}",{ id:"figure${index}", y: 0} , {  y: -listHeight,
    ease: "none",})`;
    allItems.insertAdjacentHTML("beforeEnd", template);
  }
  console.log(fragment.textContent);
}
createTl();
