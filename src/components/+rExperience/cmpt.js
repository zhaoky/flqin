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
		
		function(){
			function link($scope,ele){
				
				let
					bannerWidth,
				    bannerHeight,
				    offsetLeft,
					offsetTop;
				console.log(ele);
				$scope.$watch("$ctrl.pageIndex",function(newV){
					if(newV !== 4){
						return;
					}
					bannerWidth = ele[0].offsetWidth;
					bannerHeight = ele[0].offsetHeight;
					offsetLeft = ele[0].offsetLeft;
					offsetTop = ele[0].offsetTop;
				
				});
				
				ele[0].addEventListener("mousemove",function(evt){
					let
						pageX = evt.pageX,
					    pageY = evt.pageY,
						x = pageX - offsetLeft - bannerWidth/2,
						y = pageY - offsetTop - bannerHeight/2;
					
					ele[0].style.transform = "rotateY(" + x/50 + "deg) rotateX(" + y/50 + "deg)";
				})
				
			
			}
			return{
				restrict:"A",
				link:link
			}
		}
	])
	.name;

ResumeExperienceCtrl.$inject = ["$scope"];

function ResumeExperienceCtrl($scope) {
	console.log("footer");
	
	var vm = this;
	console.log(vm.pageIndex);
	
	
}