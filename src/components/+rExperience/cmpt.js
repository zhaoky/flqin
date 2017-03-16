export default angular
	.module("rExperience", [
	])
	.component("resumeExperience", {
		templateUrl : "components/+rExperience/cmpt.html",
		controller  : ResumeExperienceCtrl,
		bindings:{
			pageIndex:"<"
		}
	})
	.constant("expList",[
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
	])
	.directive("touchThreeD",[
		"$window",
		function($window){
			function link($scope,ele){
				
				let
					bannerWidth,
				    bannerHeight,
				    offsetLeft,
					offsetTop;
				$scope.$watch("$ctrl.pageIndex",function(newV){
					if(newV !== 4){
						return;
					}
					bannerWidth = ele[0].offsetWidth;
					bannerHeight = ele[0].offsetHeight;
					offsetLeft = ele[0].offsetLeft;
					offsetTop = ele[0].offsetTop;
				});
				
				ele[0].addEventListener("mousemove",mousemoveHandler);
				ele[0].addEventListener("mouseout",mouseoutHandler);

				function mousemoveHandler(evt){
                    let
                        pageX = evt.pageX,
                        pageY = evt.pageY,
                        x = pageX - offsetLeft - bannerWidth/2,
                        y = bannerHeight/2-pageY + offsetTop+140;
                    ele[0].style.transform = "rotateY(" + x/50 + "deg) rotateX(" + y/50 + "deg)";
                }

                function mouseoutHandler(evt){
                    ele[0].style.transform = "rotateY(0deg) rotateX(0deg)";
                }

                $window.onresize= onResize;

                function onResize(){
                    offsetLeft = ele[0].offsetLeft;
                    offsetTop = ele[0].offsetTop;
				}

			}
			return{
				restrict:"A",
				link:link
			}
		}
	])
	.directive("switchExp",[
		"expList",
		function(expList){
			function link($scope,ele){
				
				let
					vm = $scope.$ctrl,
					index = 0,
					contentNode = document.body.querySelectorAll(".-experience-content")[0];
				
				ele[0].addEventListener("click",switchExpList);
				
				function switchExpList(evt){
					if(evt.target.nodeName != "LI"){
						return;
					}
					
					if(evt.target.dataset.index !== index){
						index = evt.target.dataset.index;
						contentNode.style.opacity = "0";
						contentNode.addEventListener("webkitTransitionEnd",transitionEndHandler);
					}
				}
				function transitionEndHandler(){
					contentNode.style.opacity = "1";
					$scope.$apply(function(){
						vm.exp = expList[index];
					});
					contentNode.removeEventListener("webkitTransitionEnd",transitionEndHandler);
				}
			}
			return{
				link:link
			}
		}
	])
	.name;

ResumeExperienceCtrl.$inject = ["expList"];

function ResumeExperienceCtrl(expList) {
	
	var vm = this;
	
	vm.cutList = new Array(3);
	
	vm.exp = expList[0];
	
}