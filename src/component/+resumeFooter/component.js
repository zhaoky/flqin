export default angular
    .module("resumeFooterM", [])
    .component("resumeFooter", {
        templateUrl: "",
        controllerAs: "rf",
        controller: ResumeFooterCtrl
    })
    .name;

function ResumeFooterCtrl() {
    console.log("footer");
}