export default angular
	.module("rContact", [])
	.component("resumeContact", {
		templateUrl : "components/+rContact/cmpt.html",
		controller  : ResumeContactCtrl
	})
	.name;
ResumeContactCtrl.$inject = ["resumeData","$rootScope"];

function ResumeContactCtrl(resumeData,$rootScope) {
    let vm = this;

    resumeData.extend(vm, resumeData.data.cn.contact);

    $rootScope.$broadcast("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.data.en.contact:resumeData.data.cn.contact;

        resumeData.extend(vm, extendData);
    });
}