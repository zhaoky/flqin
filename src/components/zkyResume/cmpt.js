import rHeader from "../rHeader/cmpt";
import rFooter from "../rFooter/cmpt";
import rMain from "../rMain/cmpt";

export default angular
	.module("zkyResume", [
		rHeader,
		rFooter,
		rMain
	])
	.component("zkyResume", {
		templateUrl : "components/zkyResume/cmpt.html",
		controllerAs: "zr",
		controller  : ZkyResumeCtrl
	})
	.name;

function ZkyResumeCtrl() {}