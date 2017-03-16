import rHeader from "../rHeader/cmpt";
import rFooter from "../rFooter/cmpt";
import rMain from "../rMain/cmpt";

export default angular
	.module("zkyResume", [
		rHeader,
		rFooter,
		rMain
	])
	.service("resumeData",[
		function(){
            this.data = {
				cn:{
					header:{
						langList:["中","英"],
						titleList:["首页","我的信息","我的技能","我的经历","我的作品","联系我"]
					},
					footer:{},
					default:{
                    	quote:"生活是一种绵延不绝的渴望，渴望不断上升，变得更伟大而高贵。",
						desList:[
							"我叫赵柯宇",
							"一名前端研发工程师",
							"zhaoky2016@163.com"
						]
					},
					info:{
						infoList:[
                            {icon:"1.png",key:"年龄",value:"26岁"},
							{icon:"2.png",key:"学历",value:"本科"},
							{icon:"3.png",key:"坐标",value:"成都"},
							{icon:"4.png",key:"状态",value:"在职"}
						],
                        desList:[
                            "三年互联网经验,两年半全职前端开发经验",
                            "项目常用原生JS开发,深谙组件化,模块化开发之道",
                            "高效的自学能力,独立分析解决问题能力,代码强迫症患者"
                        ]
					},
					skill:{
                        outCircleList:["git","webpack","gulp","less","cordova","angular","nodejs","react"],
						innerCircleList:["es6","vue","ng2","fp"],
						desList:[
                            "三年互联网经验，两年半全职前端开发经验",
                            "项目常用原生JS开发，深谙组件化，模块化开发之道",
                            "高效的自学能力,独立分析解决问题能力，代码强迫症患者"
                        ]
					},
					demo:{},
					experience:{},
					contact:{}
				},
				en:{
					
				}
			};
            this.extend = function(destination,source){
                for (let prop in source) {
                    if (!source.hasOwnProperty(prop)) {
                        continue;
                    }
                    destination[prop] = source[prop];
                }
			}
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