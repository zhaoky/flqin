export default angular
	.module("rSkill", [
	])
	.component("resumeSkill", {
		templateUrl : "components/_rSkill/cmpt.html",
		controller  : ResumeSkillCtrl
	})
	.name;

ResumeSkillCtrl.$inject = ["resumeData","$rootScope","$scope"];

function ResumeSkillCtrl(resumeData,$rootScope,$scope) {
    let vm = this;

    resumeData.extend(vm, resumeData.data.cn.skill);

    $rootScope.$on("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.data.en.skill:resumeData.data.cn.skill;

        vm.isEng = Number(data) == 2;

        resumeData.extend(vm, extendData);
	
	    $scope.$apply();
    });
}