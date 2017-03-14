export default angular
	.module("sideBox", [])
	.component("sideBox", {
		templateUrl : "components/++sideBox/cmpt.html",
		controller  : SideBoxCtrl
	})
	.name;

function SideBoxCtrl() {
	console.log("SideBoxCtrl");
}