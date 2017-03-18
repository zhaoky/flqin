export default angular
	.module("rDemo", [])
	.component("resumeDemo", {
		templateUrl : "components/+rDemo/cmpt.html",
		controller  : ResumeDemoCtrl
	})
	.name;

ResumeDemoCtrl.$inject = ["resumeData","$rootScope"];

function ResumeDemoCtrl(resumeData,$rootScope) {
    let vm = this;

    resumeData.extend(vm, resumeData.data.cn.demo);

    $rootScope.$broadcast("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.data.en.demo:resumeData.data.cn.demo;

        resumeData.extend(vm, extendData);
    });
}