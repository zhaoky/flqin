import resumeHeaderM from "../+resumeHeader/component";
import resumeFooterM from "../+resumeFooter/component";
import resumeMainM from "../+resumeMain/component";

export default angular
    .module("zkyResumeM", [
        resumeHeaderM,
        resumeFooterM,
        resumeMainM
    ])

.component("zkyResume", {
        templateUrl: "component/+zkyResumeM/main.html",
        controllerAs: "zr",
        controller: ZkyResumeCtrl
    })
    .name;

function ZkyResumeCtrl() {
    console.log("ZkyResumeCtrl");
}