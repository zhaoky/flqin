export default angular
	.module("rInfo", [])
	.component("resumeInfo", {
		templateUrl : "components/+rInfo/cmpt.html",
		controller  : ResumeInfoCtrl
	})
	.name;

ResumeInfoCtrl.$inject = ["resumeData"];

function ResumeInfoCtrl(resumeData) {
	let vm = this;
	resumeData.extend(vm, resumeData.data.info);
}