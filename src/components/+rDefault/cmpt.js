export default angular
	.module("rDefault", [])
	.component("resumeDefault", {
		templateUrl : "components/+rDefault/cmpt.html",
		controller  : ResumeDefaultCtrl
	})
	.name;

ResumeDefaultCtrl.$inject= ["$scope","$element","$window"];

function ResumeDefaultCtrl($scope,$element,$window) {
	
	
}