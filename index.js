import { figures } from "./modules/storage.js";

const BODY = document.querySelector("body");

createMainContent();

function createMainContent() {
  let fragment = document.createDocumentFragment();
  const main = document.createElement("main");
  main.className = "main";

  fragment.appendChild(main);

  main.innerHTML = createTable();
  BODY.appendChild(fragment);
}

function createTable() {
  return `
   <section className="table">
     <span className="table__numbers"></span>
     <ul className="table__figures"></ul>
   </section>`;
}
