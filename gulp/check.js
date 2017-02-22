"use strict";

function run(kit) {
    console.log("kit");
    // Tips for building
    kit.log("CAUTION: 在项目根目录, 运行构建任务.");

    // 检测构建环境
    kit.checkNodeVer();
    kit.checkNpm();
}

module.exports = {
    run: run
};