export default angular
	.module("rHeader", [])
	.component("resumeHeader", {
		templateUrl : "components/rHeader/cmpt.html",
		controller  : ResumeHeaderCtrl
	})
	.name;

function ResumeHeaderCtrl() {
}