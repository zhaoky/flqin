export default angular
	.module("rHeader", [])
	.component("resumeHeader", {
		templateUrl: "components/rHeader/cmpt.html",
		controller : ResumeHeaderCtrl,
		bindings   : {
			pageIndex: "="
		}
	})
	.directive("showNav", [
		"actionEvent",
		function (actionEvent) {
			function link($scope, ele) {
				let vm = $scope.$ctrl;
				ele[0].addEventListener(actionEvent.event.start, clickHandler);
				function clickHandler() {
					vm.isShowNav = !vm.isShowNav;
					$scope.$apply();
				}
			}
			
			return {
				restrict: "A",
				link    : link
			}
		}
	])
	.directive("switchLang", [
		"actionEvent",
		"$rootScope",
		function (actionEvent, $rootScope) {
			function link($scope, ele) {
				let vm = $scope.$ctrl;
				ele[0].addEventListener(actionEvent.event.start, clickHandler);
				function clickHandler(ev) {
					if (ev.target.nodeName !== "SPAN") {
						return;
					}
					vm.selectedLang = Number(ev.target.dataset.index) + 1;
					
					$scope.$apply();
					
					$rootScope.$broadcast("switchLang", vm.selectedLang);
					
				}
			}
			
			return {
				restrict: "A",
				link    : link
			}
		}
	])
	.directive("selectedNavItem", [
		"resumeData",
		"actionEvent",
		function (resumeData, actionEvent) {
			
			function link($scope, ele) {
				let vm = $scope.$ctrl;
				
				ele[0].addEventListener(actionEvent.event.start, clickHandler);
				function clickHandler(evt) {
					if (evt.target.nodeName != "EM") {
						return;
					}
					
					(+evt.target.dataset.index !== vm.pageIndex) && (!resumeData.moving) && (vm.pageIndex = +evt.target.dataset.index);
					vm.isShowNav = false;
					$scope.$apply();
				}
			}
			
			return {
				restrict: "A",
				link    : link
			}
		}
	])
	.name;

ResumeHeaderCtrl.$inject = ["dataExtend","resumeData", "$rootScope", "$scope"];

function ResumeHeaderCtrl(dataExtend,resumeData, $rootScope, $scope) {
	
	let vm = this;
	
	dataExtend.extend(vm, resumeData.cn.header);
	
	vm.pageIndex = 0;
	
	vm.selectedLang = 1; //1为中文,2为英文
	
	$rootScope.$on("switchLang", function (evt, data) {
		
		let extendData = Number(data) == 2 ? resumeData.en.header : resumeData.cn.header;
		
		dataExtend.extend(vm, extendData);
		
		$scope.$apply();
		
	});
	
}