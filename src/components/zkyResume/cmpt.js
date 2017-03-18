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
                        titleList:[
                        	{svg:"img/homePage.svg", title:"首页"},
                        	{svg:"img/user.svg", title:"关于我"},
                        	{svg:"img/skills.svg", title:"技能栈"},
                        	{svg:"img/experience.svg", title:"经历"},
                        	{svg:"img/production.svg", title:"作品集"},
                        	{svg:"img/contact.svg", title:"联系我"}
						]
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
                            {icon:"img/homePage.svg",key:"年龄",value:"26岁"},
                            {icon:"img/tech.png",key:"学历",value:"本科"},
                            {icon:"img/site.png",key:"坐标",value:"成都"},
                            {icon:"img/status.png",key:"状态",value:"在职"}
                        ],
                        desList:[
                            "三年互联网经验,两年半全职前端开发经验",
                            "常用原生JS开发,深谙组件化,模块化开发之道",
                            "高效的自学能力,独立分析解决问题能力,代码强迫症患者"
                        ]
                    },
                    skill:{
                        outCircleList:[
                            {color:"rgba(121,100,102,0.8)", name:"gulp"},
                            {color:"rgba(49,65,82,0.8)", name:"angular"},
                            {color:"rgba(76,157,160,0.8)", name:"webpack"},
                            {color:"rgba(66,66,66,0.8)", name:"less"},
                            {color:"rgba(193,131,106,0.8)", name:"git"},
                            {color:"rgba(117,148,179,0.8)", name:"nodejs"},
                            {color:"rgba(71,83,94,0.8)", name:"cordova"},
                            {color:"rgba(147,147,189,0.8)", name:"react"}
                        ],
                        innerCircleList:[
                            {color:"rgba(179,164,140,0.8)", name:"es6"},
                            {color:"rgba(171,209,220,0.8)", name:"vue"},
                            {color:"rgba(238,215,163,0.8)", name:"ng2"},
                            {color:"rgba(207,184,178,0.8)", name:"fp"}
                        ],
                        desList:[
                            "熟练使用angularJs1.x及各种类库的指令封装",
                            "常驻PC/APP/微信三平台前端研发，自动化构建项目工程",
                            "编码常思其健壮性，扩展性，维护性"
                        ]
                    },
                    demo:{
                        demoList:[
                            {
                                title:"web前端工程师简历",
                                tech:"angularJS",
                                des:"web前端工程师简历web前端工程师简历web前端工程师简历web前端工程师简历web前端工程师简历",
                                bg:"img/tech.png"
                            },
                            {
                                title:"web前端工程师简历",
                                tech:"angularJS",
                                des:"web前端工程师简历web前端工程师简历web前端工程师简历web前端工程师简历web前端工程师简历",
                                bg:"img/tech.png"
                            },
                            {
                                title:"web前端工程师简历",
                                tech:"angularJS",
                                des:"web前端工程师简历web前端工程师简历web前端工程师简历web前端工程师简历web前端工程师简历",
                                bg:"img/tech.png"
                            },
                            {
                                title:"web前端工程师简历",
                                tech:"angularJS",
                                des:"web前端工程师简历web前端工程师简历web前端工程师简历web前端工程师简历web前端工程师简历",
                                bg:"img/tech.png"
                            }
                        ],
                        viewMore:"github上面查看更多..."
                    },
                    experience:{
                        expList:[
                            {
                                title:"兰途网络科技有限公司",
                                time:"2015年6月~至今",
                                post:"web前端研发工程师",
                                imgUrl:"img/js.png",
                                tech:"less gulp angular1.x cordova git 原生javascript及若干类库",
                                contentList:[
                                    "负责快速构建高质量移动APP/PC/微信页面，",
                                    "git版本控制，less预编译，gulp自动化构建，cordova打包",
                                    "使用原生JS+angularJS进行前端开发",
                                    "采用组件化,模块化，保证面向未来的单向数据流思想",
                                    "同期学习ES6及当下热门的vue,react,ng2,并思索设计模式及函数式编程思想"
                                ]
                            },
                            {
                                title:"卓煌企业管理有限公司",
                                time:"2014年8月~2015年6月",
                                post:"网页开发兼SEO优化",
                                imgUrl:"img/h5.png",
                                tech:"html5,css3,javascript,jquery,bootstrap,underscore等",
                                contentList:[
                                    "负责企业站静态页开发",
                                    "负责网站后台维护",
                                    "负责百度竞价操作及seo优化",
                                    "同期工作之余提升自己原生JS的编码能力",
                                ]
                            },
                            {
                                title:"壹零陆文化传播有限责任公司",
                                time:"2014年3月~2014年8月",
                                post:"SEO",
                                imgUrl:"img/seo.png",
                                tech:"SEO,SEM,百度（360，搜狗）竞价，百度（360,搜狗）推广等",
                                contentList:[
                                    "负责网站后台维护，微博、微信等新媒体创意撰写，营销和推广",
                                    "负责百度PPC后台调整",
                                    "获得最佳新人奖",
                                    "同期工作之余开始系统性的自学web前端各项技术",
                                ]
                            }
                        ]
                    },
                    contact:{
                        desList1:["灵感","代码","梦想","未来"],
                        desList2:[
                            "前端即兴趣，前端即未来",
                            "前端即未来，",
                            "行路有良友，便是捷径",
                            "带上我吧，一起看到更大的世界",
                        ],
                        download:"下载简历",
                        typeList:[
                            "img/github.png",
                            "img/sf.png",
                            "img/blog.png",
                            "img/zh.png",
                            "img/oc.png",
                        ]
                    }
                },
                en:{
                    header:{
                        langList:["CN","EN"],
                        titleList:[
                            {svg:"img/homePage.svg", title:"Home"},
                            {svg:"img/user.svg", title:"About"},
                            {svg:"img/skills.svg", title:"Skills"},
                            {svg:"img/experience.svg", title:"Exp"},
                            {svg:"img/production.svg", title:"Works"},
                            {svg:"img/contact.svg", title:"Contact"}
                        ]
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
                            "常用原生JS开发,深谙组件化,模块化开发之道",
                            "高效的自学能力,独立分析解决问题能力,代码强迫症患者"
                        ]
                    },
                    skill:{
                        outCircleList:[
                            {color:"", name:"git"},
                            {color:"", name:"webpack"},
                            {color:"", name:"gulp"},
                            {color:"", name:"less"},
                            {color:"", name:"cordova"},
                            {color:"", name:"angular"},
                            {color:"", name:"nodejs"},
                            {color:"", name:"react"}
                        ],
                        innerCircleList:[
                            {color:"", name:"es6"},
                            {color:"", name:"vue"},
                            {color:"", name:"ng2"},
                            {color:"", name:"fp"}
                        ],
                        desList:[
                            "熟练使用angularJs1.x及各种类库的指令封装",
                            "常驻PC/APP/微信三平台前端研发，自动化构建项目工程",
                            "编码常思其健壮性，扩展性，维护性"
                        ]
                    },
                    demo:{
                    },
                    experience:{
                        expList:[
                            {
                                title:"兰途网络科技有限公司",
                                time:"2015年6月~至今",
                                post:"web前端研发工程师",
                                imgUrl:"img/js.png",
                                tech:"less gulp angular1.x cordova git 原生javascript及若干类库",
                                contentList:[
                                    "负责快速构建高质量移动APP/PC/微信页面，",
                                    "git版本控制，less预编译，gulp自动化构建，cordova打包",
                                    "使用原生JS+angularJS进行前端开发",
                                    "采用组件化,模块化，保证面向未来的单向数据流思想",
                                    "同期学习ES6及当下热门的vue,react,ng2,并思索设计模式及函数式编程思想"
                                ]
                            },
                            {
                                title:"卓煌企业管理有限公司",
                                time:"2014年8月~2015年6月",
                                post:"网页开发兼SEO优化",
                                imgUrl:"img/h5.png",
                                tech:"html5,css3,javascript,jquery,bootstrap,underscore等",
                                contentList:[
                                    "负责企业站静态页开发",
                                    "负责网站后台维护",
                                    "负责百度竞价操作及seo优化",
                                    "同期工作之余提升自己原生JS的编码能力",
                                ]
                            },
                            {
                                title:"壹零陆文化传播有限责任公司",
                                time:"2014年3月~2014年8月",
                                post:"SEO",
                                imgUrl:"img/seo.png",
                                tech:"SEO,SEM,百度（360，搜狗）竞价，百度（360,搜狗）推广等",
                                contentList:[
                                    "负责网站后台维护，微博、微信等新媒体创意撰写，营销和推广",
                                    "负责百度PPC后台调整",
                                    "获得最佳新人奖",
                                    "同期工作之余开始系统性的自学web前端各项技术",
                                ]
                            }
                        ]
                    },
                    contact:{
                    }
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