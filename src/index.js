import less from "./index.less";
import {
  actionEvent,
  stopDropDown,
  consoleTip,
  isMac,
  throttleGenerator
} from "../util.js";
let mainDom;
let nodeList;
let nodeListLen;
let curIndex;
let oldPageIndex;
let disY;
let moving;
let startTouchY;
function init() {
  curIndex = 0;
  consoleTip();
  stopDropDown();
  createArrowDom();
  resetAttr();
  mainDom.addEventListener(actionEvent.start, touchStartHandler);
  mainDom.addEventListener(
    "mousewheel",
    throttleGenerator(startWheelHandler, isMac() ? 1200 : 100)
  );
}
function createArrowDom() {
  const arrowDom = document.createElement("div");
  arrowDom.classList.add("-arrow");
  mainDom.appendChild(arrowDom);
}
function startWheelHandler(e) {
  if (
    moving ||
    (e.wheelDelta < 0 && curIndex === nodeListLen - 1) ||
    (e.wheelDelta > 0 && curIndex === 0)
  ) {
    return;
  }
  oldPageIndex = curIndex;
  e.wheelDelta < 0 ? curIndex++ : curIndex--;
  applyPageIndex();
}
function touchStartHandler(e) {
  if (moving) {
    return;
  }
  startTouchY = Array.from(e.changedTouches)[0].pageY;
  oldPageIndex = curIndex;
  mainDom.addEventListener(actionEvent.move, touchMoveHandler);
  mainDom.addEventListener(actionEvent.end, touchEndHandler);
}
function touchMoveHandler(e) {
  if (moving) {
    return;
  }
  disY = Array.from(e.changedTouches)[0].pageY - startTouchY; // 为负上滑 为正下滑
  if (
    (disY < 0 && oldPageIndex === nodeListLen - 1) ||
    (disY > 0 && oldPageIndex === 0)
  ) {
    return;
  }
  curIndex = disY < 0 ? oldPageIndex + 1 : oldPageIndex - 1;
  nodeList[curIndex].classList.add("touch-page");
  nodeList[curIndex].style.transform = `translateY(${(disY < 0
    ? mainDom.offsetHeight
    : -mainDom.offsetHeight) + disY}px)`;
  nodeList[
    disY < 0 ? curIndex - 1 : curIndex + 1
  ].style.transform = `translateY(${disY}px)`;
}
function touchEndHandler() {
  if (moving) {
    return;
  }
  Math.abs(disY) < 100 ? littleBounce() : applyPageIndex();
}
function littleBounce() {
  nodeList[curIndex].style.transform = "";
  nodeList[curIndex].style.transition = "transform 0.5s";
  nodeList[disY < 0 ? curIndex - 1 : curIndex + 1].style.transform = "";
  nodeList[disY < 0 ? curIndex - 1 : curIndex + 1].style.transition =
    "transform 0.5s";
  curIndex = disY > 0 ? curIndex + 1 : curIndex - 1;
  nodeList[curIndex].addEventListener("webkitTransitionEnd", resetAttr);
}
function applyPageIndex() {
  if (moving) {
    return;
  }
  moving = true;
  if (Math.abs(curIndex - oldPageIndex) > 1) {
    nodeList[curIndex].style.display = "block";
    nodeList[curIndex].style.transform = `translateY(${curIndex <
      oldPageIndex && "-"}100%)`;
  }
  nodeList[oldPageIndex].style.transform = `translateY(${curIndex >
    oldPageIndex && "-"}100%)`;
  nodeList[oldPageIndex].style.transition = "transform 0.5s";
  nodeList[curIndex].classList.add("active");
  nodeList[curIndex].addEventListener("webkitTransitionEnd", resetAttr);
}
function directToPage(index) {
  oldPageIndex = curIndex;
  curIndex = index;
  applyPageIndex();
}
function resetAttr() {
  Array.from(nodeList).forEach(item => {
    item.classList.remove(
      "prev-page",
      "active",
      "next-page",
      "cur-page",
      "touch-page"
    );
    item.style.transform = "";
    item.style.transition = "";
    item.removeEventListener("webkitTransitionEnd", resetAttr);
  });
  nodeList[curIndex].classList.add("cur-page");
  curIndex !== 0 && nodeList[curIndex - 1].classList.add("prev-page");
  curIndex !== nodeListLen - 1 &&
    nodeList[curIndex + 1].classList.add("next-page");
  moving = false;
  mainDom.removeEventListener(actionEvent.move, touchMoveHandler);
  mainDom.removeEventListener(actionEvent.end, touchEndHandler);
  mainDom.querySelectorAll(".-arrow")[0].style.display =
    curIndex === nodeListLen - 1 ? "none" : "block";
}
window.onload = () => {
  mainDom = document.getElementsByTagName("main")[0];
  nodeList = mainDom.getElementsByTagName("section");
  nodeListLen = nodeList.length;
  init();
};

function analyticDomTree(document) {}
