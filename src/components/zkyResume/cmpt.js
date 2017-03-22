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
                            "熟悉MV*开发,深谙自动化,模块化开发之道",
                            "高效的自学能力,具备独立分析解决问题能力",
                            "强烈的自我驱动力,代码强迫症患者"
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
                            "常驻PC/APP/微信三平台前端研发",
                            "擅长组件/插件开发，能脱离库书写JS代码",
                            "编码常思其健壮性，扩展性，维护性"
                        ]
                    },
                    demo:{
                        demoList:[
                            {
                                title:"web前端工程师简历",
                                des:"上线一个月，百度关键词“web前端工程师简历”即排名前三，截止今日依旧排在前五，深受广大初学者好评，以至于该关键词前10页都处处能见该简历影子。",
                                url:"www.baidu.com",
                                bg:"img/tech.png"
                            },
                            {
                                title:"移动校园APP",
                                des:"一站式、全生命周期的校园官方移动服务平台，涵盖PC、安卓、IOS、微信平台，上线学校包括中央财经大学，北京交通大学，中国戏曲学院，辽宁大学，西南财经大学等等，下载量数十万，深受学生老师喜爱。",
                                bg:"img/tech.png"
                            },
                            {
                                title:"移动校园管理系统",
                                des:"针对校园APP的后台管理系统，包括人员架构，权限设置，H5生产机，数据交换平台，各个模块的数据管理，反馈设置等等",
                                bg:"img/tech.png"
                            },
                            {
                                title:"企业官网",
                                des:"一般性企业站开发，兼容IE8+,适配全移动机型",
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
                                imgUrl:"img/js.svg",
                                tech:"less gulp angular1.x cordova 原生js及若干类库",
                                contentList:[
                                    "负责快速构建高质量移动APP/PC/微信页面",
                                    "根据业务需求设计合适的工程项目",
                                    "高度组件化、模块化思维，拥有各平台调试能力",
                                    "同期学习ES6及vue,react,ng2,体会函数式编程思想"
                                ]
                            },
                            {
                                title:"卓煌企业管理有限公司",
                                time:"2014年8月~2015年6月",
                                post:"网页开发兼SEO优化",
                                imgUrl:"img/h5.svg",
                                tech:"html5,css3,javascript,jquery,bootstrap等",
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
                                imgUrl:"img/seo.svg",
                                tech:"SEO,SEM,百度（360，搜狗）竞价、推广等",
                                contentList:[
                                    "负责网站后台维护，微博、微信等新媒体营销和推广",
                                    "负责百度PPC后台调整",
                                    "获得最佳新人奖",
                                    "同期工作之余开始系统性的自学web前端各项技术",
                                ]
                            }
                        ],
                        des:""
                    },
                    contact:{
                        desList1:["灵感","代码","梦想","未来"],
                        desList2:[
                            "注重效率，偏爱敏捷开发",
                            "喜欢尝试，期待新鲜事物",
                            "前端即兴趣，兴趣即未来",
                            "行路有良友，便是捷径",
                            "带上我吧，一起看到更大的世界",
                        ],
                        download:"下载简历",
                        fileList:[
                            {title:"HTML版",url:"www.baidu.com"},
                            {title:"PDF版",url:"www.baidu.com"},
                        ],
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
    .service("actionEvent", [
        "$window",
        function($window){
            let
                isSupportTouch = "ontouchend" in $window.document,
                actionEvent
                ;

            actionEvent = {
                start: isSupportTouch ? "touchstart" : "mousedown",
                move : isSupportTouch ? "touchmove" : "mousemove",
                end  : isSupportTouch ? "touchend" : "mouseup"
            };

            this.event = actionEvent;
            this.isSupportTouch = isSupportTouch;

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