export default angular
	.module("rExperience", [])
	.component("resumeExperience", {
		templateUrl : "components/+rExperience/cmpt.html",
		controller  : ResumeExperienceCtrl
	})
	.name;

function ResumeExperienceCtrl() {
	console.log("footer");
}