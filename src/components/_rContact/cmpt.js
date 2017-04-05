export default angular
	.module("rContact", [])
	.component("resumeContact", {
		templateUrl : "components/_rContact/cmpt.html",
		controller  : ResumeContactCtrl
	})
	.name;
ResumeContactCtrl.$inject = ["dataExtend","resumeData","$rootScope","$scope"];

function ResumeContactCtrl(dataExtend,resumeData,$rootScope,$scope) {
    let vm = this;

    dataExtend.extend(vm, resumeData.cn.contact);

    $rootScope.$on("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.en.contact:resumeData.cn.contact;

        vm.isEng = Number(data) == 2;
	
	    dataExtend.extend(vm, extendData);
	
	    $scope.$apply();
    });
}