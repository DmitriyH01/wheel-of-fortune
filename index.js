import { figures } from "./modules/storage.js";

const BODY = document.querySelector("body");

createMainContent();

function createMainContent() {
  let fragment = document.createDocumentFragment();
  const main = document.createElement("main");
  main.className = "main";

  fragment.appendChild(main);

  main.insertAdjacentHTML("beforeend", `${createTable()}`);
  main.insertAdjacentHTML("beforeend", `${createWheel()}`);
  BODY.appendChild(fragment);
}

function createTable() {
  return `
   <section class="table">
     <span class="table__numbers"></span>
     <ul class="table__figures"></ul>
   </section>`;
}

function createWheel() {
  return `<section class="wheel_area">
      <span class="wheel_area__text">testwork</span>
      <div class="wheel_area__wheel">
        <div class="wheel_area__wheel__inner">
          <ul class="wheel_area__wheel__inner__list">
          </ul>
        </div>
        <div class="wheel_area__wheel__rectangle_left"></div>
        <div class="wheel_area__wheel__rectangle_right"></div>
      </div>
      <div class="wheel_area__buttons_wrap">
        <button class="wheel_area__buttons_wrap__start">start</button>
        <button
          class="wheel_area__buttons_wrap__stop">
          stop
        </button>
      </div>
    </section>`;
}
