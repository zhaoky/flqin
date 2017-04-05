/**
 * Created by zhaoky on 2017/4/5.
 */
import ResumeData from "../app/data.json";

class DataExtend {
	
	constructor() {
		
	}
	
	extend(destination, source) {
		for (let prop in source) {
			if (!source.hasOwnProperty(prop)) {
				continue;
			}
			destination[prop] = source[prop];
		}
	}
}

class ActionEvent {
	
	static get $inject(){ return ["$window"]; }
	
	constructor($window) {
		let
			isSupportTouch = "ontouchend" in $window.document,
			actionEvent
			;
		
		actionEvent = {
			start: isSupportTouch ? "touchstart" : "mousedown",
			move : isSupportTouch ? "touchmove" : "mousemove",
			end  : isSupportTouch ? "touchend" : "mouseup",
			wheel: "mousewheel",
		};
		
		this.event = actionEvent;
	}
}

class StopIosDropDown {
	
	
	constructor() {
		
	}
	
	stop(actionEvent) {
		document.querySelector("body").addEventListener(actionEvent.event.start, (ev)=> {
			if (_isPc() || (!_isPc() && ev.target.nodeName == "A")) {
				return;
			}
			ev.preventDefault();
		});
	}
	
}

class InitArrow {
	
	constructor() {
		
	}
	
	init() {
		let
			page      = document.querySelectorAll(".dock-fill"),
			arrowNode = document.createElement("div");
		
		arrowNode.classList.add("-arrow");
		
		page[0].appendChild(arrowNode);
	}
	
	destroy() {
		let
			arrowNode = document.querySelector(".-arrow");
		
		arrowNode.parentNode.removeChild(arrowNode);
	}
}

function _isPc() {
	
	return ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"].every(function (i) {
		return navigator.userAgent.indexOf(i) < 0;
	});
	
}

export default angular
	
	.module("appServices", [])
	
	.constant("resumeData", ResumeData)
	
	.service("actionEvent", ActionEvent)
	
	.service("stopIosDropDown", StopIosDropDown)
	
	.service("dataExtend", DataExtend)
	
	.service("initArrow", InitArrow)
	
	.name;
