export default angular
	.module("rInfo", [])
	.component("resumeInfo", {
		templateUrl : "components/_rInfo/cmpt.html",
		controller  : ResumeInfoCtrl
	})
	.name;

ResumeInfoCtrl.$inject = ["dataExtend","resumeData","$rootScope","$scope"];

function ResumeInfoCtrl(dataExtend,resumeData,$rootScope,$scope) {
    let vm = this;

    dataExtend.extend(vm, resumeData.cn.info);

    $rootScope.$on("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.en.info:resumeData.cn.info;

        vm.isEng = Number(data) == 2;

        dataExtend.extend(vm, extendData);
	    
	    $scope.$apply();
    });
}