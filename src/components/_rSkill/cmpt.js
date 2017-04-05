export default angular
	.module("rSkill", [
	])
	.component("resumeSkill", {
		templateUrl : "components/_rSkill/cmpt.html",
		controller  : ResumeSkillCtrl
	})
	.name;

ResumeSkillCtrl.$inject = ["dataExtend","resumeData","$rootScope","$scope"];

function ResumeSkillCtrl(dataExtend,resumeData,$rootScope,$scope) {
    let vm = this;

    dataExtend.extend(vm, resumeData.cn.skill);

    $rootScope.$on("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.en.skill:resumeData.cn.skill;

        vm.isEng = Number(data) == 2;

        dataExtend.extend(vm, extendData);
	
	    $scope.$apply();
    });
}