import skillCircle from "../++skillCircle/cmpt";

export default angular
	.module("rSkill", [
		skillCircle
	])
	.component("resumeSkill", {
		templateUrl : "components/+rSkill/cmpt.html",
		controller  : ResumeSkillCtrl
	})
	.name;

function ResumeSkillCtrl() {
	console.log("footer");
}