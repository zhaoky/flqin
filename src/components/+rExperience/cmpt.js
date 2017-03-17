export default angular
	.module("rExperience", [
	])
	.component("resumeExperience", {
		templateUrl : "components/+rExperience/cmpt.html",
		controller  : ResumeExperienceCtrl,
		bindings:{
			pageIndex:"<"
		}
	})
	.directive("touchThreeD",[
		"$window",
		function($window){
			function link($scope,ele){
				
				let
					bannerWidth,
				    bannerHeight,
				    offsetLeft,
					offsetTop;
				$scope.$watch("$ctrl.pageIndex",function(newV){
					if(newV !== 4){
						return;
					}
					bannerWidth = ele[0].offsetWidth;
					bannerHeight = ele[0].offsetHeight;
					offsetLeft = ele[0].offsetLeft;
					offsetTop = ele[0].offsetTop;
				});
				
				ele[0].addEventListener("mousemove",mousemoveHandler);
				ele[0].addEventListener("mouseout",mouseoutHandler);

				function mousemoveHandler(evt){
                    let
                        pageX = evt.pageX,
                        pageY = evt.pageY,
                        x = pageX - offsetLeft - bannerWidth/2,
                        y = bannerHeight/2-pageY + offsetTop+140;
                    ele[0].style.transform = "rotateY(" + x/50 + "deg) rotateX(" + y/50 + "deg)";
                }

                function mouseoutHandler(evt){
                    ele[0].style.transform = "rotateY(0deg) rotateX(0deg)";
                }

                $window.onresize= onResize;

                function onResize(){
                    offsetLeft = ele[0].offsetLeft;
                    offsetTop = ele[0].offsetTop;
				}

			}
			return{
				restrict:"A",
				link:link
			}
		}
	])
	.directive("switchExp",[
		"expList",
		function(expList){
			function link($scope,ele){
				
				let
					vm = $scope.$ctrl,
					index = 0,
					contentNode = document.body.querySelectorAll(".-experience-content")[0];
				
				ele[0].addEventListener("click",switchExpList);
				
				function switchExpList(evt){
					if(evt.target.nodeName != "LI"){
						return;
					}
					
					if(evt.target.dataset.index !== index){
						index = evt.target.dataset.index;
						contentNode.style.opacity = "0";
						contentNode.addEventListener("webkitTransitionEnd",transitionEndHandler);
					}
				}
				function transitionEndHandler(){
					contentNode.style.opacity = "1";
					$scope.$apply(function(){
						vm.exp = expList[index];
					});
					contentNode.removeEventListener("webkitTransitionEnd",transitionEndHandler);
				}
			}
			return{
				link:link
			}
		}
	])
	.name;

ResumeExperienceCtrl.$inject = ["resumeData"];

function ResumeExperienceCtrl(resumeData) {
	
	var vm = this;
	
	resumeData.extend(vm, resumeData.data.experience);
	
	vm.exp = vm.expList[0];
	
}