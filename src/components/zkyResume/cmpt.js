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
		"$window",
		function($window){
			
			let data = {
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
						title:"关于我",
						infoList:[
							{icon:"1.png",key:"年龄",value:"26岁"},
							{icon:"2.png",key:"学历",value:"本科"},
							{icon:"3.png",key:"坐标",value:"成都"},
							{icon:"4.png",key:"状态",value:"在职"}
						],
						desList:[
							"三年互联网经验,两年半全职前端开发经验",
							"常用原生JS开发,深谙组件化,模块化开发之道",
							"高效的自学能力,独立分析解决问题能力,代码强迫症患者"
						]
					},
					skill:{
						title:"技能栈",
						outCircleList:["git","webpack","gulp","less","cordova","angular","nodejs","react"],
						innerCircleList:["es6","vue","ng2","fp"],
						desList:[
							"熟练使用angularJs1.x及各种类库的指令封装",
							"常驻PC/APP/微信三平台前端研发，自动化构建项目工程",
							"编码常思其健壮性，扩展性，维护性"
						]
					},
					demo:{
						title:"项目集"
					},
					experience:{
						title:"经历过",
						expList:[
							{
								title:"壹零陆文化传播有限责任公司",
								time:"2014年3月~2014年8月",
								post:"职位：SEO",
								imgUrl:"img/seo.png",
								tech:"SEO,SEM,百度（360，搜狗）竞价，百度（360,搜狗）推广等",
								contentList:[
									"负责网站后台维护，微博、微信等新媒体创意撰写，营销和推广",
									"负责百度PPC后台调整",
									"获得最佳新人奖",
									"同期工作之余开始系统性的自学web前端各项技术",
								]
							},
							{
								title:"卓煌企业管理有限公司",
								time:"2014年8月~2015年6月",
								post:"职位：网页开发兼SEO优化",
								tech:"html5,css3,javascript,jquery,bootstrap,underscore等",
								contentList:[
									"负责企业站静态页开发",
									"负责网站后台维护",
									"负责百度竞价操作及seo优化",
									"同期工作之余提升自己原生JS的编码能力",
								]
							},
							{
								title:"兰途网络科技有限公司",
								time:"2015年6月~至今",
								post:"职位：web前端研发工程师",
								tech:"less gulp angular1.x cordova git 原生javascript及若干类库",
								contentList:[
									"负责快速构建高质量移动app页面",
									"git版本控制，less预编译，gulp自动化构建，cordova打包",
									"使用原生JS+angularJS进行前端开发",
									"采用组件化,模块化，保证面向未来的单向数据流思想",
									"同期开始学习ES6及当下热门的vue,react,ng2,并思索设计模式及函数式编程的思想"
								]
							}
						]
					},
					contact:{
						title:"联系我"
					}
				},
				en:{
					
				}
			};
			
			let storageLang = $window.localStorage.getItem("storageLang");
			
			this.data = (storageLang && storageLang == "2") ? data.en : data.cn;
            
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