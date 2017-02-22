export default angular
    .module("resumeHeaderM", [])
    .component("resumeHeader", {
        templateUrl: "",
        controllerAs: "rh",
        controller: ResumeHeaderCtrl
    })
    .name;

function ResumeHeaderCtrl() {
    console.log("Header");
}