export default angular
	.module("rExpect", [])
	.component("resumeExpect", {
		templateUrl : "components/+rExpect/cmpt.html",
		controller  : ResumeExpectCtrl
	})
	.name;

function ResumeExpectCtrl() {
	console.log("footer");
}