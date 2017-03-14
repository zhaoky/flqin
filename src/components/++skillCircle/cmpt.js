export default angular
	.module("skillCircle", [])
	.component("skillCircle", {
		templateUrl : "components/++skillCircle/cmpt.html",
		controller  : SkillCircleCtrl
	})
	.name;

function SkillCircleCtrl() {
	console.log("SkillCircleCtrl");
}