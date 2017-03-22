export default angular
	.module("rSkill", [
	])
	.component("resumeSkill", {
		templateUrl : "components/_rSkill/cmpt.html",
		controller  : ResumeSkillCtrl
	})
	.name;

ResumeSkillCtrl.$inject = ["resumeData","$rootScope"];

function ResumeSkillCtrl(resumeData,$rootScope) {
    let vm = this;

    resumeData.extend(vm, resumeData.data.cn.skill);

    $rootScope.$on("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.data.en.skill:resumeData.data.cn.skill;

        resumeData.extend(vm, extendData);
    });
}