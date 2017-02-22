export default angular
	.module("rDefault", [])
	.component("resumeDefault", {
		templateUrl : "components/+rDefault/cmpt.html",
		controller  : ResumeDefaultCtrl
	})
	.name;

function ResumeDefaultCtrl() {
	console.log("footer");
}