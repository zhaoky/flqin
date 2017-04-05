"use strict";

const
	gulp     = require("gulp"),
	concat   = require("gulp-concat"),
	uglify   = require("gulp-uglify"),
	$if      = require("gulp-if"),
	cached   = require("gulp-cached"),
	less     = require("gulp-less"),
	rename   = require("gulp-rename"),
	minCss   = require("gulp-minify-css"),
	webpack  = require("webpack-stream"),
	plumber  = require("gulp-plumber"),
	imageMin = require("gulp-imagemin"),
	shell    = require("shelljs"),
	postcss      = require('gulp-postcss'),
	autoprefixer = require('autoprefixer');

const kit = require("./kit");

const
	SRC = {
		html   : [
			"src/components/**/*.html"
		],
		js     : [
			"src/index.js",
			"components/**/*.js"
		],
		img    : [
			"src/img/**"
		],
		favicon: [
			"src/img/favicon"
		]
	};

const
	concatLib = ["lib/angular.js"];


function buildAll() {
	return Promise
		.all([
			distIndexHtml(),
			distBasisHtml(),
			distCss(),
			distLibJs(),
			distBasisJs(),
			distImage(),
			distFavicon()
		])
		.then(() => {
			kit.log("V5! All DONE!!");
		})
		.catch(function (err) {
			kit.log("Bad Thins Happen! Cause :");
			kit.log(err);
		});
}

/**
 * 构建 html of index
 */
function distIndexHtml() {
	return new Promise((resolve, reject) => {
		gulp
			.src("src/index.html")
			.pipe(gulp.dest("dist/"))
			.on("end", function () {
				resolve();
			})
			.on("error", function () {
				reject();
			})
	});
}
// Watch Task
(()=> {
	gulp.task("watch-index-html", ()=> {
		gulp
			.watch("src/index.html", kit.getWatcherConfig())
			.on("change", (event)=> {
				console.log("watch index html", event);
				distIndexHtml();
			})
		;
	});
})();
/**
 * 构建 html of basis
 
 */
function distBasisHtml() {
	return new Promise((resolve, reject) => {
		gulp
			.src(SRC.html, {
				base: "src"
			})
			.pipe(gulp.dest("dist"))
			.on("end", function () {
				resolve();
			})
			.on("error", function () {
				reject();
			});
	});
}
// Watch Task
(()=> {
	gulp.task("watch-basis-html", ()=> {
		gulp
			.watch(SRC.html, kit.getWatcherConfig())
			.on("change", (event)=> {
				console.log("watch basis html", event);
				distBasisHtml();
			})
		;
	});
})();
/**
 * 构建 less
 */
function distCss() {
	return new Promise((resolve, reject) => {
		gulp
			.src("src/index.less")
			.pipe(less())
			.pipe(postcss([autoprefixer()]))
			.pipe(rename("style.css"))
			.pipe($if(gulp.kit.isProduction(), minCss()))
			.pipe(gulp.dest("dist/css/"))
			.on("end", function () {
				resolve();
			})
			.on("error", function () {
				reject();
			});
	});
}
// Watch Task
(()=> {
	gulp.task("watch-css", ()=> {
		gulp
			.watch(["src/index.less","src/components/**/*.less"], kit.getWatcherConfig())
			.on("change", (event)=> {
				console.log("watch css", event);
				distCss();
			})
		;
	});
})();
/**
 * 构建 js of lib
 *
 */
function distLibJs() {
	return new Promise((resolve, reject) => {
		gulp
			.src(concatLib)
			
			.pipe($if(gulp.kit.isProduction(), uglify(gulp.kit.getUglifyConfig())))
			
			.pipe(concat("lib.js"))
			
			.pipe(gulp.dest("dist/js/"))
			
			.on("end", function () {
				resolve();
			})
			
			.on("error", function (error) {
				
			});
		
	});
}
// Watch Task
(()=> {
	gulp.task("watch-lib-js", ()=> {
		gulp
			.watch(concatLib, kit.getWatcherConfig())
			.on("change", (event)=> {
				console.log("watch lib js", event);
				distLibJs();
			})
		;
	});
})();
/**
 * 构建 js of basis
 *
 */
function distBasisJs() {
	
	return new Promise((resolve, reject) => {
		gulp
			.src(SRC.js)
			.pipe(webpack({
				
				watch : true,
				output: {
					filename: "basis.js"
				},
				
				module: {
					loaders: [
						{
							test  : /\.json$/,
							loader: 'json-loader'
						}, {
							test   : /\.js$/,
							exclude: /(node_modules)/,
							loader : "babel-loader?presets[]=es2015"
						}
					]
				},
				
				plugins: []
			}, null, (err, stats) => {
				if (err) {
					return console.log("webpack 执行出错: ", err, stats);
				}
				console.log("webpack 热执行完成!");
				resolve();
			}))
            .pipe($if(gulp.kit.isProduction(), uglify(gulp.kit.getUglifyConfig())))
			.pipe(gulp.dest("dist/js/"))
			.on("end", function () {
				resolve();
			})
			.on("error", function () {
				reject();
			});
	});
}
// Watch Task
(()=> {
	gulp.task("watch-basis-js", ()=> {
		gulp
			.watch(SRC.js, kit.getWatcherConfig())
			.on("change", (event)=> {
				console.log("watch basis js", event);
				distBasisJs();
			})
		;
	});
})();
/**
 *  构建 image
 *
 */
function distImage() {
	
	return new Promise((resolve, reject) => {
		
		gulp
			.src(SRC.img)
			.pipe(imageMin())
			.pipe(gulp.dest("dist/img"))
			.on("end", function () {
				resolve();
			})
			.on("error", function () {
				reject();
			});
	});
}
/**
 *  构建 favicon
 *
 */
function distFavicon() {
	
	return new Promise((resolve, reject) => {
		
		gulp
			.src(SRC.favicon)
			.pipe(imageMin())
			.pipe(gulp.dest("dist"))
			.on("end", function () {
				resolve();
			})
			.on("error", function () {
				reject();
			});
	});
}
/**
 *  清理产品文件
 */
function clean() {
	shell.exec("rm dist -r -f");
}

module.exports = {
	buildAll: buildAll,
	clean   : clean
};