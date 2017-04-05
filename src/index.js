/**
 * 入口文件
 */
import appServices from "./app/service";
import zkyResume from "./components/zkyResume/cmpt";

angular.module("bootstrap", [
	appServices,
	zkyResume
]);