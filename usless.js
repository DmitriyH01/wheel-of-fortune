/////////////////////////////////////////////////////////////////////////////////////////////////
const listHeight = document.querySelector(
  ".wheel_area__wheel__inner__list"
).scrollHeight;
const workItemWindow = document.querySelector(
  ".wheel_area__wheel__inner"
).offsetHeight;
const workListHeight = listHeight - workItemWindow;
console.log(workListHeight);
/////////////////////////////////////////////////////////////////////////////////////////////
// сколько времени длительность(DURATION) столько и задежку(delay) элементам чтоб одновременно запускалась
//анимация каждой фигуры

//////////////////////////////FUNCTIONS/////////////////////////////////////////////////////////////
////////////////////////////////////////      1    /////////////////////////////////////////////////
function createTl() {
  let fragment = document.createDocumentFragment();
  const allItems = document.createElement("span");
  fragment.appendChild(allItems);

  for (let index = 1; index <= 40; index++) {
    let template = `.to(".item${index}" , { y: ${workListHeight}, duration: DURATION }, 
      "figure${index}")`;
    allItems.insertAdjacentHTML("beforeEnd", template);
  }
  console.log(fragment.textContent);
}
createTl();
////////////////////////////////////////    END of 1    ///////////////////////////////////////////////
////////////////////////////////////////       2        /////////////////////////////////////////////////
function createTl() {
  let fragment = document.createDocumentFragment();
  const allItems = document.createElement("span");
  fragment.appendChild(allItems);

  for (let index = 1; index <= 40; index++) {
    let template = `.fromTo(".item${index}",{y: 0} , {  y: -7420,
    duration: DURATION,
    ease: "none",}).addLabel(
      "figure${index}")`;
    allItems.insertAdjacentHTML("beforeEnd", template);
  }
  console.log(fragment.textContent);
}
createTl();
///////////////////////////////////////////      3      ////////////////////////////////////
function createTl() {
  let fragment = document.createDocumentFragment();
  const allItems = document.createElement("span");
  fragment.appendChild(allItems);

  for (let index = 1; index <= 40; index++) {
    let template = `.fromTo(".item${index}",{y: 0} , {  y: -7420,
    ease: "none",}).addLabel(
      "figure${index}")`;
    allItems.insertAdjacentHTML("beforeEnd", template);
  }
  console.log(fragment.textContent);
}
createTl();
////////////////////////////////////////       4       /////////////////////////////////////
function createTl() {
  let fragment = document.createDocumentFragment();
  const allItems = document.createElement("span");
  fragment.appendChild(allItems);

  for (let index = 1; index <= 40; index++) {
    let template = `.fromTo(".item${index}",{ id ="figure${index}", y: 0} , {  y: -listHeight,
    ease: "none",})`;
    allItems.insertAdjacentHTML("beforeEnd", template);
  }
  console.log(fragment.textContent);
}
createTl();
