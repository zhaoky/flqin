export default angular
	.module("rContact", [])
	.component("resumeContact", {
		templateUrl : "components/+rContact/cmpt.html",
		controller  : ResumeContactCtrl
	})
	.name;

function ResumeContactCtrl() {
	console.log("footer");
}