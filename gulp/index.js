"use strict";

const
	check  = require("./check"),
	gulp   = require("gulp"),
	kit    = require("./kit"),
	server = require("./server"),
	dist   = require("./dist");

gulp.pkg = require(".././package");
gulp.kit = kit;

check.run(kit);

// 开发服务器
gulp.task("server", server.server);
gulp.task("default", ["server"], () => console.log("Hello! welcome to build resume!"));

// 清理构建后工程
gulp.task("clean", dist.clean);

// 整个项目构建
gulp.task("dev", ["clean"], dist.buildAll);

// watcher
gulp.task("w", ["watch-index-html","watch-basis-html","watch-css","watch-lib-js","watch-basis-js"]);

// 持续集成开发命令
gulp.task("d", ["dev"], () => server.server());

// 刷新
gulp.task("dd", ["dev", "w"], () => server.server());