import rAbout from "../+rAbout/cmpt";
import rContact from "../+rContact/cmpt";
import rDefault from "../+rDefault/cmpt";
import rDemo from "../+rDemo/cmpt";
import rExpect from "../+rExpect/cmpt";
import rExperience from "../+rExperience/cmpt";
import rInfo from "../+rInfo/cmpt";
import rSkill from "../+rSkill/cmpt";

export default angular
	.module("rMain", [
        rAbout,
        rContact,
        rDefault,
        rDemo,
        rExpect,
        rExperience,
        rInfo,
        rSkill
	])
	.component("resumeMain", {
		controllerAs: "rh",
		controller  : ResumeMainCtrl
	})
	.name;

function ResumeMainCtrl() {
	console.log("Main");
}