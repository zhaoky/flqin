export default angular
	.module("rMain", [])
	.component("resumeMain", {
		templateUrl : "components/rMain/cmpt.html",
		controllerAs: "rh",
		controller  : ResumeMainCtrl
	})
	.name;

function ResumeMainCtrl() {
	console.log("Main");
}