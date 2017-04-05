export default angular
	.module("rExperience", [
	])
	.component("resumeExperience", {
		templateUrl : "components/_rExperience/cmpt.html",
		controller  : ResumeExperienceCtrl,
		bindings:{
			pageIndex:"<"
		}
	})
	.directive("touchThreeD",[
		"$window",
		"actionEvent",
		function($window,actionEvent){
			function link($scope,ele){
				
				let
					bannerWidth,
				    bannerHeight,
				    offsetLeft,
					offsetTop;
				$scope.$watch("$parent.$parent.pageIndex",function(newV){
					if(Number(newV) !== 3){
						return;
					}
					bannerWidth = ele[0].offsetWidth;
					bannerHeight = ele[0].offsetHeight;
					offsetLeft = ele[0].offsetLeft;
					offsetTop = ele[0].offsetTop;
				});
				
				ele[0].addEventListener(actionEvent.event.move,mousemoveHandler);
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
		"actionEvent",
		function(actionEvent){
			function link($scope,ele){
				
				let
					vm = $scope.$ctrl,
					contentNode = document.body.querySelectorAll(".-experience-content")[0];

				vm.cutList = new Array(3);

				ele[0].addEventListener(actionEvent.event.start,switchExpList);
				
				function switchExpList(evt){
					if(evt.target.nodeName != "LI"){
						return;
					}
					
					if(evt.target.dataset.index !== vm.curIndex){
                        vm.curIndex = evt.target.dataset.index;
						contentNode.style.opacity = "0";
						contentNode.addEventListener("webkitTransitionEnd",transitionEndHandler);
					}
				}
				function transitionEndHandler(){
					contentNode.style.opacity = "1";
					$scope.$apply(function(){
						vm.exp = vm.expList[vm.curIndex];
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

ResumeExperienceCtrl.$inject = ["dataExtend","resumeData","$rootScope","$scope"];

function ResumeExperienceCtrl(dataExtend,resumeData,$rootScope,$scope) {
    let vm = this;

    dataExtend.extend(vm, resumeData.cn.experience);

    vm.curIndex = 0;

    vm.exp = vm.expList[vm.curIndex];

    $rootScope.$on("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.en.experience:resumeData.cn.experience;

        vm.isEng = Number(data) == 2;

        dataExtend.extend(vm, extendData);

        vm.exp = vm.expList[0];
	
	    $scope.$apply();
    });
}