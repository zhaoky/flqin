import rHeader from "../rHeader/cmpt";
import rFooter from "../rFooter/cmpt";
import rMain from "../rMain/cmpt";

export default angular
	.module("zkyResume", [
		rHeader,
		rFooter,
		rMain
	])
	.service(resumeData,[
		function(){
			var data = {
				cn:{
					header:{
						langList:["中","英"],
						titleList:["首页","我的信息","我的技能","我的经历","我的作品","联系我"]
					},
					footer:{},
					default:{},
					info:{},
					skill:{},
					demo:{},
					experience:{},
					contact:{}
				},
				en:{
					
				}
				
			};
		}
	])
	
	.component("zkyResume", {
		templateUrl : "components/zkyResume/cmpt.html",
		controllerAs: "zr",
		controller  : ZkyResumeCtrl
	})
	.name;

function ZkyResumeCtrl() {
	console.log("ZkyResumeCtrl");
}