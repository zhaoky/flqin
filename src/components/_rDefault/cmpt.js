export default angular
	.module("rDefault", [])
	.component("resumeDefault", {
		templateUrl : "components/_rDefault/cmpt.html",
		controller  : ResumeDefaultCtrl
	})
	.name;

ResumeDefaultCtrl.$inject = ["dataExtend","resumeData","$rootScope","$scope"];

function ResumeDefaultCtrl(dataExtend,resumeData,$rootScope,$scope) {
	let vm = this;

    dataExtend.extend(vm, resumeData.cn.default);

    $rootScope.$on("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.en.default:resumeData.cn.default;

        dataExtend.extend(vm, extendData);
	
	    $scope.$apply();
    });
}