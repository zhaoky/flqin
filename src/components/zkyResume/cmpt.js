import rHeader from "../rHeader/cmpt";
import rFooter from "../rFooter/cmpt";
import rMain from "../rMain/cmpt";

// angular1 09年的框架 虽然老，但是很经典，有很多的设计思想非常优秀（现在出到angular5了 - -）
// 通过阅读别人写的代码，可以知道自己所没有涉及的地方和自己代码的不足之处
export default angular
	.module("zkyResume", [  //resume代表简历
		rHeader,  // 注入rHeader模块
		rFooter,  // 注入rFooter模块
		rMain
	])
	.component("zkyResume", {
		templateUrl : "components/zkyResume/cmpt.html",
		controllerAs: "zr",  // 避免命名冲突（一个很好的code style，我们之前项目里面就没有使用，导致scope混乱）
		controller  : ZkyResumeCtrl
	})
	.name;

function ZkyResumeCtrl() {}