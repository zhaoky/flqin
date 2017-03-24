export default angular
	.module("rFooter", [])
	.component("resumeFooter", {
		templateUrl : "components/rFooter/cmpt.html",
		controllerAs: "rf",
		controller  : ResumeFooterCtrl
	})
	.name;

function ResumeFooterCtrl() {
}