export default angular
	.module("rAbout", [])
	.component("resumeAbout", {
		templateUrl : "components/+rAbout/cmpt.html",
		controller  : ResumeAboutCtrl
	})
	.name;

function ResumeAboutCtrl() {
	console.log("footer");
}