export default angular
	.module("rDefault", [])
	.component("resumeDefault", {
		templateUrl : "components/+rDefault/cmpt.html",
		controller  : ResumeDefaultCtrl
	})
	.name;

ResumeDefaultCtrl.$inject = ["resumeData"];

function ResumeDefaultCtrl(resumeData) {
	let vm = this;
	resumeData.extend(vm, resumeData.data.default);
}