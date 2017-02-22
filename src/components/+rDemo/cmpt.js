export default angular
	.module("rDemo", [])
	.component("resumeDemo", {
		templateUrl : "components/+rDemo/cmpt.html",
		controller  : ResumeDemoCtrl
	})
	.name;

function ResumeDemoCtrl() {
	console.log("footer");
}