/**
 * Created by zhaoky on 2017/4/5.
 */
import ResumeData from "../app/data.json";

class DataExtend {
  constructor() {}

  extend(destination, source) {
    for (const prop in source) {
      if (!source.hasOwnProperty(prop)) {
        continue;
      }
      destination[prop] = source[prop];
    }
  }
}

class ActionEvent {
  static get $inject() {
    return ["$window"];
  }

  constructor($window) {
    const isSupportTouch = "ontouchend" in $window.document;
    let actionEvent;

    actionEvent = {
      start: isSupportTouch ? "touchstart" : "mousedown",
      move: isSupportTouch ? "touchmove" : "mousemove",
      end: isSupportTouch ? "touchend" : "mouseup",
      wheel: "mousewheel"
    };

    this.event = actionEvent;
  }
}

class StopIosDropDown {
  constructor() {}

  stop(actionEvent) {
    document
      .querySelector("body")
      .addEventListener(actionEvent.event.start, ev => {
        if (_isPc() || (!_isPc() && ev.target.nodeName == "A")) {
          return;
        }
        ev.preventDefault();
      });
  }
}

class InitArrow {
  constructor() {}

  init() {
    const page = document.querySelectorAll(".dock-fill");
    const arrowNode = document.createElement("div");

    arrowNode.classList.add("-arrow");

    page[0].appendChild(arrowNode);
  }

  destroy() {
    const arrowNode = document.querySelector(".-arrow");

    arrowNode.parentNode.removeChild(arrowNode);
  }
}

export default angular

  .module("appServices", [])

  .constant("resumeData", ResumeData)

  .service("actionEvent", ActionEvent)

  .service("stopIosDropDown", StopIosDropDown)

  .service("dataExtend", DataExtend)

  .service("initArrow", InitArrow).name;
