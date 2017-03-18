export default angular
	.module("rInfo", [])
	.component("resumeInfo", {
		templateUrl : "components/+rInfo/cmpt.html",
		controller  : ResumeInfoCtrl
	})
	.name;

ResumeInfoCtrl.$inject = ["resumeData","$rootScope"];

function ResumeInfoCtrl(resumeData,$rootScope) {
    let vm = this;

    resumeData.extend(vm, resumeData.data.cn.info);

    $rootScope.$broadcast("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.data.en.info:resumeData.data.cn.info;

        resumeData.extend(vm, extendData);
    });
}