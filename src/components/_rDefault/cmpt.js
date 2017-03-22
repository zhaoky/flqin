export default angular
	.module("rDefault", [])
	.component("resumeDefault", {
		templateUrl : "components/_rDefault/cmpt.html",
		controller  : ResumeDefaultCtrl
	})
	.name;

ResumeDefaultCtrl.$inject = ["resumeData","$rootScope"];

function ResumeDefaultCtrl(resumeData,$rootScope) {
	let vm = this;

    resumeData.extend(vm, resumeData.data.cn.default);

    $rootScope.$on("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.data.en.default:resumeData.data.cn.default;

        resumeData.extend(vm, extendData);
    });
}