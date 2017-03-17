export default angular
	.module("rSkill", [
	])
	.component("resumeSkill", {
		templateUrl : "components/+rSkill/cmpt.html",
		controller  : ResumeSkillCtrl
	})
	.name;

ResumeSkillCtrl.$inject = ["resumeData"];

function ResumeSkillCtrl(resumeData) {
	let vm = this;
	resumeData.extend(vm, resumeData.data.skill);
}