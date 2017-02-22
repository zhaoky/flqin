"use strict";

const
    check = require("./check"),
    gulp = require("gulp"),
    kit = require("./kit"),
    server = require("./server"),
    dist = require("./dist");

gulp.pkg = require(".././package");
gulp.kit = kit;

check.run(kit);


// // 拷贝依赖第的三方库(js/css/font/img)至开发服务器目录
// gulp.task("dist-lib", devLib.dev);
// gulp.task("dist-lib-js", devLib.devJs);
// gulp.task("dist-lib-font", devLib.devFont);

// // 构建基础模块命令
// gulp.task("dist-basis", devBasis.dev);
// gulp.task("dist-bas", ["dist-basis"]);

// // 构建业务模块命令
// gulp.task("dist-business", devBiz.dev);
// gulp.task("dist-biz", ["dist-business"]);

// gulp.task("biz-partial-html", devBiz.devHtml);
// gulp.task("biz-html", ["biz-partial-html"]);

// gulp.task("biz-less", devBiz.devCss);
// gulp.task("biz-image", devBiz.devImage);

// gulp.task("biz-demand-js", devBiz.devJs);
// gulp.task("biz-js", ["biz-demand-js"]);

// gulp.task("biz-favicon", devBiz.devFavicon);


// // 开发服务器
// gulp.task("server", devServer.server);
// gulp.task("default", ["server"], () => console.log("Hello Gulp!"));

// // 清理 开发目录
// gulp.task("dist-clean", (cb) => {
//     require("shelljs").exec("rm " + gulp.config.build["dest"] + " -r -f");
//     cb();
// });

// 整个项目构建
gulp.task("dev", dist.buildAll);
// gulp.task("dev-new", ["dist-clean"], dist.buildAll);

// // watcher
// gulp.task("watch", ["watch:dist-lib", "watch:dist-basis", "watch:dist-biz"]);
// gulp.task("w", ["watch"]);

// // 持续集成开发命令
gulp.task("d", ["dev"], () => server.server());

// gulp.task("dd", ["dev-new", "watch"], () => devServer.server());