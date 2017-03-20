export default angular
    .module("rHeader", [])
    .component("resumeHeader", {
        templateUrl: "components/rHeader/cmpt.html",
        controller: ResumeHeaderCtrl,
        bindings: {
            pageIndex: "="
        }
    })
    .directive("opacityCallback", [
        function () {
            function link($scope, ele) {
                let vm = $scope.$ctrl;
                ele[0].addEventListener("webkitTransitionEnd", transitionEndHandler);
                function transitionEndHandler() {
                    if (vm.isShowNav) {
                        ele[0].style.display = vm.isShowNav ? "block" : "none";
                    }
                }
            }
            return {
                restrict: "A",
                link: link
            }
        }
    ])
    .directive("selectedNavItem", [
        "resumeData",
        "actionEvent",
        function (resumeData,actionEvent) {

            function link($scope, ele) {
                let vm = $scope.$ctrl;

                ele[0].addEventListener(actionEvent.start, clickHandler);
                function clickHandler(evt) {
                    if (evt.target.nodeName != "EM") {
                        return;
                    }

                    (+evt.target.dataset.index !== vm.pageIndex) &&(!resumeData.moving)&& (vm.pageIndex = +evt.target.dataset.index);
                    vm.isShowNav = false;
                    $scope.$apply();
                }
            }

            return {
                restrict: "A",
                link: link
            }
        }
    ])
    .name;

ResumeHeaderCtrl.$inject = ["resumeData","$rootScope"];

function ResumeHeaderCtrl(resumeData,$rootScope) {

    let vm = this;

    console.log(vm);

    resumeData.extend(vm, resumeData.data.cn.header);

    vm.pageIndex = 0;

    vm.selected = 1;
    
    vm.switchLang = switchLang;

    $rootScope.$on("switchLang",function(evt,data){

        let extendData = Number(data) == 2?resumeData.data.en.header:resumeData.data.cn.header;

        resumeData.extend(vm, extendData);

    });

    function switchLang(index){

        vm.selected = index+1;

        $rootScope.$broadcast("switchLang",index+1);

    }

}