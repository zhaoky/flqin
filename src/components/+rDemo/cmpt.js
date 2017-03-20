export default angular
	.module("rDemo", [])
	.component("resumeDemo", {
		templateUrl : "components/+rDemo/cmpt.html",
		controller  : ResumeDemoCtrl
	})
	.directive("switchWork",[
		function(){
			function link($scope,ele,attr) {
				let worksContain = document.body.querySelector(".-work-list");
				let worksItemList = worksContain.querySelectorAll(".-work-item");
				let iWidth = document.body.offsetWidth*0.9;
				console.log(worksItemList);
			}
			return{
				link:link
			}
		}
	])
	.name;

ResumeDemoCtrl.$inject = ["resumeData","$rootScope"];

function ResumeDemoCtrl(resumeData,$rootScope) {
    let vm = this;

    resumeData.extend(vm, resumeData.data.cn.demo);

    $rootScope.$broadcast("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.data.en.demo:resumeData.data.cn.demo;

        resumeData.extend(vm, extendData);
    });
}