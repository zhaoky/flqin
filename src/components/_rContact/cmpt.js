export default angular
	.module("rContact", [])
	.component("resumeContact", {
		templateUrl : "components/_rContact/cmpt.html",
		controller  : ResumeContactCtrl
	})
	.name;
ResumeContactCtrl.$inject = ["resumeData","$rootScope","$scope"];

function ResumeContactCtrl(resumeData,$rootScope,$scope) {
    let vm = this;

    resumeData.extend(vm, resumeData.data.cn.contact);

    $rootScope.$on("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.data.en.contact:resumeData.data.cn.contact;

        vm.isEng = Number(data) == 2;

        resumeData.extend(vm, extendData);
	
	    $scope.$apply();
    });
}