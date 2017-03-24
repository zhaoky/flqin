export default angular
	.module("rWorks", [])
	.component("resumeWorks", {
		templateUrl : "components/_rWorks/cmpt.html",
		controller  : ResumeWorksCtrl
	})
	.directive("switchWork",[
		"actionEvent",
		function(actionEvent){
			function link($scope,ele,attr) {
				let worksContain = document.body.querySelector(".-work-list");
                let rotate = 0;
                ele[0].addEventListener(actionEvent.event.start,switchWorkHandler);

                function switchWorkHandler(evt){
                	console.log(evt);
                	if(evt.target.nodeName !== "I"){
                		return;
					}

					rotate += evt.target.className == "-left"?90:-90;

                    worksContain.style.transform ="rotateY("+rotate+"deg)";
				}

			}
			return{
				link:link
			}
		}
	])
	.name;

ResumeWorksCtrl.$inject = ["resumeData","$rootScope","$scope"];

function ResumeWorksCtrl(resumeData,$rootScope, $scope) {
    let vm = this;

    resumeData.extend(vm, resumeData.data.cn.works);

    $rootScope.$on("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.data.en.works:resumeData.data.cn.works;

        vm.isEng = Number(data) == 2;

        resumeData.extend(vm, extendData);
	
	    $scope.$apply();
    });
}