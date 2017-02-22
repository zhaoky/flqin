export default angular
	.module("rHeader", [])
	.component("resumeHeader", {
		templateUrl : "components/rHeader/cmpt.html",
		controllerAs: "rh",
		controller  : ResumeHeaderCtrl
	})
	.name;

function ResumeHeaderCtrl() {
	console.log("Header");
}