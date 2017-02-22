export default angular
    .module("resumeMainM", [])
    .component("resumeMain", {
        templateUrl: "",
        controllerAs: "rh",
        controller: ResumeMainCtrl
    })
    .name;

function ResumeMainCtrl() {
    console.log("Main");
}