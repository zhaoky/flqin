export default angular
	.module("rInfo", [])
	.component("resumeInfo", {
		templateUrl : "components/+rInfo/cmpt.html",
		controller  : ResumeInfoCtrl
	})
	.name;

function ResumeInfoCtrl() {
	console.log("footer");
}