import { figures } from "./modules/storage.js";

const WHEEL = document.querySelector(".wheel_area");
const TABLE = document.querySelector(".table__figures");

fillWheelContent();
fillTableContent(figures);

function fillWheelContent() {
  let fragment = document.createDocumentFragment();
  fragment.appendChild(WHEEL);
  let template = `<span class="wheel_area__text">testwork</span>
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
      </div>`;
  WHEEL.insertAdjacentHTML("beforeEnd", template);
  document.querySelector(".main").appendChild(fragment);
}

function fillTableContent(figures) {
  let fragment = document.createDocumentFragment();
  fragment.appendChild(TABLE);

  figures.forEach(function (figure, index) {
    let template = `  
           <li>
      <img src=${figure} id=${index} alt=""></img>
    </li>`;
    TABLE.insertAdjacentHTML("beforeEnd", template);
  });
  document.querySelector(".table").appendChild(fragment);
}
