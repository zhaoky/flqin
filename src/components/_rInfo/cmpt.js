export default angular
	.module("rInfo", [])
	.component("resumeInfo", {
		templateUrl : "components/_rInfo/cmpt.html",
		controller  : ResumeInfoCtrl
	})
	.name;

ResumeInfoCtrl.$inject = ["resumeData","$rootScope","$scope"];

function ResumeInfoCtrl(resumeData,$rootScope,$scope) {
    let vm = this;

    resumeData.extend(vm, resumeData.data.cn.info);

    $rootScope.$on("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.data.en.info:resumeData.data.cn.info;

        vm.isEng = Number(data) == 2;

        resumeData.extend(vm, extendData);
	    
	    $scope.$apply();
    });
}