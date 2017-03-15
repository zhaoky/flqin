import rContact from "../+rContact/cmpt";
import rDefault from "../+rDefault/cmpt";
import rDemo from "../+rDemo/cmpt";
import rExperience from "../+rExperience/cmpt";
import rInfo from "../+rInfo/cmpt";
import rSkill from "../+rSkill/cmpt";

export default angular
	.module("rMain", [
		rContact,
		rDefault,
		rDemo,
		rExperience,
		rInfo,
		rSkill
	])
	.service("initArrow", [
		function () {
			function Arrow() {
				
			}
			
			Arrow.prototype = {
				
				init   : function () {
					
					var
						page      = document.querySelectorAll(".dock-fill"),
						arrowNode = document.createElement("div");
					
					arrowNode.classList.add("-arrow");
					
					page[0].appendChild(arrowNode);
				},
				destroy: function () {
					
					var arrowNode = document.querySelector(".-arrow");
					
					arrowNode.parentNode.removeChild(arrowNode);
				}
			};
			
			return Arrow;
		}
	])
	.service("stopWxDropDown", function () {
		
		this.stop = function () {
			
			document.querySelector("body").addEventListener('touchstart', function (ev) {
				
				ev.preventDefault();
				
			});
			
		}
	})
	.directive("resumeMain", [
		"initArrow",
		"stopWxDropDown",
		function (initArrow, stopWxDropDown) {
			
			function link($scope, ele) {
				
				let
					pageIndex = 0,
					moving,
					startTouchY,
					disY,
					curTouchPageIndex,
					offsetHeight,
					nodeList  = ele[0].querySelectorAll(".page-section"),
					nodeListLen,
					arrow;
				
				
				// nodeList = Array.from(nodeList);
				
				nodeListLen = nodeList.length;
				
				ele[0].classList.add("dock-fill");
				
				nodeList[0].classList.add("cur-page");
				
				nodeList[pageIndex + 1].classList.add("next-page");
				
				offsetHeight = ele[0].offsetHeight;
				
				arrow = new initArrow();
				
				arrow.init();
				
				stopWxDropDown.stop();
				
				ele[0].addEventListener("touchstart", touchStartHandler);
				ele[0].addEventListener("mousewheel", startWheelHandler);
				
				$scope.$on("$destroy", function () {
					
					arrow.destroy();
					ele[0].removeEventListener("touchstart", touchStartHandler);
					ele[0].removeEventListener("mousewheel", startWheelHandler);
					
				});
				
				function startWheelHandler(e) {
					
					let nodeList = ele[0].querySelectorAll(".page-section");
					
					if (moving || (e.wheelDelta > 0 && pageIndex == nodeListLen - 1) || (e.wheelDelta < 0 && pageIndex == 0)) {
						return;
					}
					
					moving = true;
					
					e.wheelDelta > 0 ? pageIndex++ : pageIndex--;
					
					nodeList[pageIndex].classList.add("active");
					
					nodeList[e.wheelDelta > 0 ? (pageIndex - 1) : (pageIndex + 1)].style.transform = e.wheelDelta < 0 ? "translateY(100%)" : "translateY(-100%)";
					nodeList[e.wheelDelta > 0 ? (pageIndex - 1) : (pageIndex + 1)].style.transition = "transform 0.5s ease-in-out";
					
					nodeList[pageIndex].addEventListener("webkitTransitionEnd", transitionEndHandler);
					
				}
				
				function touchStartHandler(e) {
					console.log("start");
					
					if (moving) {
						return;
					}
					
					startTouchY = e.changedTouches[0].pageY;
					
					ele[0].addEventListener("touchmove", touchMoveHandler);
				}
				
				function touchMoveHandler(e) {
					console.log("move");
					
					if (moving) {
						return;
					}
					
					disY = e.changedTouches[0].pageY - startTouchY; //为负上滑 为正下滑
					
					if ((disY < 0 && pageIndex == nodeListLen - 1) || (disY > 0 && pageIndex == 0)) {
						return;
					}
					
					let nodeList = ele[0].querySelectorAll(".page-section");
					
					curTouchPageIndex = disY < 0 ? (pageIndex + 1) : (pageIndex - 1);
					
					nodeList[curTouchPageIndex].classList.add("touch-page");
					
					nodeList[curTouchPageIndex].style.transform = disY < 0 ? "translateY(" + (offsetHeight + disY) + "px)" : "translateY(" + (-offsetHeight + disY) + "px)";
					
					nodeList[disY < 0 ? (curTouchPageIndex - 1) : (curTouchPageIndex + 1)].style.transform = "translateY(" + (disY) + "px)";
					
					ele[0].addEventListener("touchend", touchEndHandler);
				}
				
				function touchEndHandler() {
					
					console.log("end");
					
					if (moving) {
						return;
					}
					
					moving = true;
					
					let nodeList = ele[0].querySelectorAll(".page-section");
					
					if (Math.abs(disY) < 100) {
						
						nodeList[curTouchPageIndex].style.transform = "";
						nodeList[curTouchPageIndex].style.transition = "transform 0.5s ease-in-out";
						
					} else {
						
						pageIndex = curTouchPageIndex;
						nodeList[pageIndex].classList.add("active");
						
					}
					
					nodeList[disY < 0 ? (curTouchPageIndex - 1) : (curTouchPageIndex + 1)].style.transform = Math.abs(disY) < 100 ? "" : (disY < 0 ? "translateY(-100%)" : "translateY(100%)");
					nodeList[disY < 0 ? (curTouchPageIndex - 1) : (curTouchPageIndex + 1)].style.transition = "transform 0.5s ease-in-out";
					
					nodeList[curTouchPageIndex].addEventListener("webkitTransitionEnd", transitionEndHandler);
					
				}
				
				function transitionEndHandler() {
					
					console.log("进入回调");
					
					let nodeList = ele[0].querySelectorAll(".page-section");
					
					nodeList.forEach(function (item, index) {
						
						item.classList.remove("prev-page", "active", "next-page", "cur-page", "touch-page");
						
						item.style.transform = "";
						item.style.transition = "";
						
						(pageIndex !== 0) && (index == pageIndex - 1) && (item.classList.add("prev-page"));
						
						(index == pageIndex) && (item.classList.add("cur-page"));
						
						(pageIndex !== nodeListLen - 1) && (index == pageIndex + 1) && (item.classList.add("next-page"));
						
						item.removeEventListener("webkitTransitionEnd", transitionEndHandler);
						
					});
					
					ele[0].querySelectorAll(".-arrow")[0].style.display = (pageIndex == nodeListLen - 1) ? "none" : "block";
					
					moving = false;
					
					$scope.$apply(function(){
						$scope.pageIndex = pageIndex;
					});
					ele[0].removeEventListener("touchmove", touchMoveHandler);
					ele[0].removeEventListener("touchend", touchEndHandler);
					
				}
				
			}
			
			function Controller(){
				
			}
			
			return {
				restrict  : "E",
				link      : link,
				template  : "<div ng-transclude></div>",
				transclude: true,
				replace   : true,
				controller: Controller,
				controllerAs:"aaa",
				scope     : {
					pageIndex: "="
				}
			}
		}
	])
	
	.name;
