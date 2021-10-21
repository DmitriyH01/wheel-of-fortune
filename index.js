import { figures } from "./modules/storage.js";

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

const FIGURES = gsap.utils.toArray(".wheel_area__wheel__inner__list__item");
const viewListWindow = 540;
const moveDistance =
  document.querySelector(".wheel_area__wheel__inner__list").scrollHeight -
  viewListWindow;

const loopConfig = {
  repeat: -1,
  speed: 50,
  paddingRight: -7900,
  paused: false,
  reversed: true,
};
// const LOOP = gsap
//   .timeline({
//     repeat: -1,
//     paused: true,
//     opacity: 1,
//   })

horizontalLoop(FIGURES, loopConfig);
// .fromTo(
//   FIGURES,
//   { y: 0 },
//   {
//     y: -moveDistance,
//     ease: "none",
//     duration: 1.5,
//     reversed: true,
//     opacity: 0.2,
//   }
// );

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};

  // console.log(items[1].offsetTop);
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () =>
        tl.pause().totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startY = items[0].offsetTop,
    times = [],
    widths = [],
    yPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalHeight,
    curY,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    yPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "height", "px")));
      yPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "y", "px")) / w) * 100 +
          gsap.getProperty(el, "y")
      );
      return yPercents[i];
    },
  });
  gsap.set(items, { y: 0 });
  totalHeight = items[length - 1].offsetTop;
  // +
  // (yPercents[length - 1] / 100) * widths[length - 1] -
  // startY +
  // items[length - 1].offsetTop *
  //   gsap.getProperty(items[length - 1], "scaleY") +
  // (parseFloat(config.paddingRight) || 0);
  console.log(totalHeight);
  for (i = 0; i < length; i++) {
    item = items[i];
    curY = (yPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetTop + curY - startY; ////   OVER THERE
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleY");
    tl.to(
      item,
      {
        yPercent: snap(((curY - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          yPercent: snap(
            ((curY - distanceToLoop + totalHeight) / widths[i]) * 100
          ),
        },
        {
          yPercent: yPercents[i],
          duration:
            (curY - distanceToLoop + totalHeight - curY) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

// LOOP.seek(getNestedLabelTime(LOOP, "figure20"));

function shiftWheel() {
  // console.log(LOOP.labels);
  // one.pause();
  if (startPressed) {
    LOOP.play();
  }
  if (!startPressed) {
    console.log("stop");

    LOOP.pause();
  }
  /////////////////////////////////////////////////////////////////////
}
