"use strict";

const
    gulp = require("gulp");

const oKit = {
    BASE_VERSION: "6.7.0"
};

let _iAliasFactory = initAliasFactory();

const kit = {
    checkVersion: checkVersion,
    checkNodeVer: checkNodeVer,
    checkNpm: checkNpm,

    loadConfig: loadConfigFactory(),
    loadCampusConfig: loadCampusConfig,
    getCliArgs: getCliArgsFactory(),
    isProduction: isProduction,
    getSrcFilter: getSrcFilter,
    renamePath: renamePath,

    getAlias: _iAliasFactory.getAlias,
    setAlias: _iAliasFactory.setAlias,

    log: log,
    wLog: wLogFactory(),
    getErrors: getErrors,

    getUglifyConfig: getUglifyConfig,
    getHtmlConfig: getHtmlConfig,
    getCssConfig: getCssConfig,
    getPreProcessConfig: getPreProcessConfig,
    getWatcherConfig: getWatcherConfig,

    isCordovaDir: isCordovaDir,

    task: task,
    taskBuildApp: taskBuildApp,

    getDestPath: getDestPathFactory()
};

/**
 * 读取 构建平台模式
 */
function _loadConfig() {
    const
        campusAlias = kit.getAlias(),
        onfRawDefault = require("../default_config");

    var

        onfCampus,
        config;

    log(`[CAMPUS_ALIAS]: ${campusAlias}`);

    config = onfRawDefault.defaultConfig;
    onfCampus = loadCampusConfig();

    // 校园自定数据 写入 配置数据
    assignDeep(config, onfCampus);

    config.build.isProduction = isProduction();
    config.project.version = config.project.version || gulp.pkg.version;
    config.project.alias = campusAlias;

    return config;

}

function loadConfigFactory() {
    var config;
    return (isForce) => {
        config = config && !isForce ? config : _loadConfig();
        return config;
    }
}

/**
 * 加载 校园配置
 * @returns {*}
 */
function loadCampusConfig() {

    var
        campusAlias = kit.getAlias();

    try {
        return require(`../campus_config/${campusAlias}_config`);
    } catch (e) {
        return {};
    }

}

/**
 * 获取 getter/setter run-time-building 校园别名
 * @returns {*}
 */
function initAliasFactory() {
    var _alias;
    return {
        setAlias: (alias) => {
            _alias = alias;
        },
        getAlias: () => {
            if (!_alias) {
                _alias = kit.getCliArgs()["alias"] || require("../default_config")["defaultConfig"]["project"]["alias"];
            }
            return _alias
        }
    }
}

/**
 * 获取 "命令行" 参数
 * @returns {() => }
 */
function getCliArgsFactory() {
    var
        minimist = require("minimist"),
        cliAgr;
    return (isFore) => {
        if (!cliAgr && !isFore) {
            cliAgr = cliAgr || minimist(process.argv.slice(2), {
                default: {}
            });
            delete cliAgr._;
        }
        return cliAgr;
    };
}

/**
 * 检测 Node 版本
 * @returns { Boolean } 是否为稳定版
 */
function checkNodeVer() {

    var
        shell = require("shelljs"),

        baseVersion,
        curVersion,

        isNodeAvailable,
        isNodeLessVer;

    if (!shell.which("node")) {
        shell.echo("Require Node Environment.");
        shell.echo("Please install by: http://nodejs.org");
        shell.exit();
    }

    baseVersion = oKit.BASE_VERSION;
    curVersion = shell.exec("node -v", {
        silent: true
    }).stdout;

    isNodeAvailable = checkVersion(curVersion, baseVersion).eq;
    isNodeLessVer = checkVersion(curVersion, baseVersion).lt;

    if (!isNodeAvailable) {
        let error = isNodeLessVer ?
            `Your Node Version Is Out Of Date! \nPlease Install V${baseVersion} Node On: http://nodejs.org` :
            `Your Node Version Is Too High \nFor Stable,Please Install V${baseVersion} Node On: http://nodejs.org`;
        getErrors(error);
    }

    return isNodeAvailable;
}

/**
 * 错误提示
 * @param { String } error 错误提示语
 */
function getErrors(error) {
    const shell = require("shelljs");
    shell.echo(" ");
    shell.echo("### Caution: ###");
    shell.echo("");
    shell.echo(error);
    shell.echo("");
}

/**
 * 检测版本号
 * @param { String } curVersion 当前版本号
 * @param { String } baseVersion 基准版本号
 * @returns { Object } onf 是否通过验证
 * @returns { Boolean } onf.eq 是否相等
 * @returns { Boolean } onf.lt 是否小于
 * @returns { Boolean } onf.gt 是否大于
 */
function checkVersion(curVersion, baseVersion) {

    const
        curVer = transVersion(curVersion),
        baseVer = transVersion(baseVersion);

    let
        equal = true,
        lessThan = undefined;

    equal = curVer.reduce((lastVal, cur, index) => {
        if (!lastVal) { return false }

        let isEqual = Number(cur) === Number(baseVer[index] || 0);

        if (!isEqual) {
            lessThan = Number(cur) < Number(baseVer[index]);
        }

        return isEqual;

    }, equal);

    return {
        eq: equal,
        lt: lessThan,
        gt: !lessThan
    };

}

/**
 * 将版本号转换为数组以便于比较
 * @param { String } version 版本号
 * @returns { Array } 转换后的版本号
 */
function transVersion(version) {
    return version.match(/([\d\.]+)/g)[0].split(".");
}

/**
 * 检测 npm package 是否安装正确
 * @returns { Boolean } 是否通过验证
 */
function checkNpm() {

    const
        dependenvies = gulp.pkg.devDependencies,
        plugins = Object.keys(dependenvies),
        shell = require("shelljs"),
        promise = [];

    let
        isPassed = true,
        isNotFind = false;

    for (let plugin of plugins) {
        const baseVersion = dependenvies[plugin];
        let sInstallTips = `Can Not Find node_module: [${plugin}] \nPlease Install At First:\n` +
            `\n` +
            `   npm install ${plugin}` +
            `\n`;

        try {
            require(plugin);
            promise.push(checkNpmVer(plugin, baseVersion)
                .then((value) => value)
                .catch((msg) => {
                    let error;
                    isPassed = false;
                    switch (msg) {
                        case "notFind":
                            isNotFind = true;
                            error = sInstallTips;
                            break;
                        case "<":
                            error = `Your [${plugin}] version is out of date! \nPlease Install V${baseVersion.match(/([\d\.]+)/g)[0]}!`;
                            break;
                        case ">":
                            error = `Your [${plugin}] version is too High, \nFor Stable,Please Install V${baseVersion.match(/([\d\.]+)/g)[0]}!`;
                    }

                    getErrors(error);
                }));
        } catch (err) {
            isPassed = false;
            isNotFind = true;
            let error = sInstallTips;
            getErrors(error);
        }

    }

    isNotFind && shell.exit(1);

    Promise.all(promise)
        .then(() => {
            isNotFind && shell.exit(1);
            return isPassed;
        });

}

/**
 * 检测 npm 版本
 * @returns { Promise }
 */
function checkNpmVer(plugin, baseVersion) {

    const fs = require("fs");

    return new Promise((resolve, reject) => {
        fs.readFile(`./node_modules/${plugin}/package.json`, "utf-8", (err, data) => {
            if (err) {
                reject("notFind");
                return;
            }

            let
                isEqual,
                isLessThan,
                curVersion = JSON.parse(data).version;

            isEqual = checkVersion(curVersion, baseVersion).eq;
            isLessThan = checkVersion(curVersion, baseVersion).lt;

            if (!isEqual) {
                let msg = isLessThan ? "<" : ">";
                reject(msg);
            }

            resolve(true);

        });
    });
}

/**
 * 是否为 "产品级" 构建模式
 * @returns {boolean}
 */
function isProduction() {
    var cliArgs = kit.getCliArgs();
    return !!(cliArgs.p || true === cliArgs.production);
}

/**
 * print something
 */
function log() {
    var arrLog = Array.prototype.slice.call(arguments);
    arrLog.unshift("-----");
    console.log.apply(console, arrLog);
}

/**
 * Log for Gulp Watch
 * @param taskName
 * @param event
 */
function wLogFactory() {

    const
        path = require("path");

    return (taskName, event) => {
        let rawPath = event.path.split(path.sep);
        kit.log(rawPath.slice(-3).join(path.sep) + ` was changed by ${event.type}, running task: [${taskName}]`);
    }

}

/**
 * 获取 Uglify 默认配置
 * @param { Object } [onf]
 * @returns { Object }
 */
function getUglifyConfig(onf) {
    return assignDeep({
        mangle: true,
        compress: {
            sequences: true, // join consecutive statemets with the “comma operator”
            properties: true, // optimize property access: a["foo"] → a.foo
            dead_code: true, // discard unreachable code
            drop_debugger: true, // discard “debugger” statements
            unsafe: false, // some unsafe optimizations (see below)
            conditionals: true, // optimize if-s and conditional expressions
            comparisons: true, // optimize comparisons
            evaluate: true, // evaluate constant expressions
            booleans: true, // optimize boolean expressions
            loops: true, // optimize loops
            unused: true, // drop unused variables/functions
            hoist_funs: true, // hoist function declarations
            hoist_vars: false, // hoist variable declarations
            if_return: true, // optimize if-s followed by return/continue
            join_vars: true, // join declarations
            cascade: true, // try to cascade `right` into `left` in sequences
            side_effects: true, // drop side-effect-free statements
            drop_console: false, // drop console
            warnings: false // warn about potentially dangerous optimizations/code
        }
    }, onf);
}

/**
 * 获取 html-min 默认配置
 * @param { Object } [onf]
 * @returns { Object }
 */
function getHtmlConfig(onf) {
    return Object.assign({
        collapseWhitespace: true,
        conservativeCollapse: true,
        preserveLineBreaks: true,
        minifyJS: true,
        minifyCSS: true
    }, onf);
}

/**
 * 获取 process css 默认配置
 * @param { Object } [onf]
 * @returns { Object }
 */
function getCssConfig(onf) {
    return Object.assign({
        advanced: false
    }, onf);
}

/**
 * 获取 preProcess 默认配置
 *
 * @param { Object } [data]
 * @param { Object } [data.build]
 * @param { Object } [data.project]
 * @param { Object } [data.cordova]
 * @param { Object } [data.h5]
 *
 * @param { Object } [onf]
 * @param { Object } [onf.isForce] 是否重新获取 配置数据
 * @returns { Object }
 */
function getPreProcessConfig(data, onf) {

    var config;

    data = data || {};
    onf = onf || {};

    /**
     * @type { Object } onf
     * @type { Object } onf.build
     * @type { Object } onf.project
     * @type { Object } onf.cordova
     * @type { Object } onf.h5
     */
    config = assignDeep({}, kit.loadConfig(onf.isForce));

    assignDeep(config, data);

    return {
        context: config
    };
}

/**
 * 获取 gulp-watch 默认配置
 * @returns {{interval: number, debounceDelay: number, mode: string}}
 */
function getWatcherConfig(onf) {

    // docs: https://github.com/shama/gaze

    return Object.assign({
        interval: 800,
        debounceDelay: 200,

        // "auto", "watch", "poll"
        mode: "auto"
    }, onf);
}

/**
 * 获取 src 路径
 * @param { Array | String } path
 */
function getSrcFilter(path) {

    var
        arrPath = [],
        alias = kit.getAlias();

    if ("[object Array]" === Object.prototype.toString.call(path)) {
        arrPath.push.apply(arrPath, path);
    } else {
        arrPath.push(path);
    }

    arrPath.push(`!**/_$!(${alias})_*/*`, `!**/_$!(${alias})_*/`);

    return arrPath;
}

/**
 * 获取 { Object } path
 * @param path
 */
function renamePath(path) {
    var reg = /(_\$[^_]+_)/;
    path.basename = path.basename.replace(reg, "$");
    path.dirname = path.dirname.replace(reg, "$");
    return path;
}

/**
 * Deep Mode For Object.assign
 * @param target
 * @param source
 * @returns {*}
 */
function assignDeep(target, source) {

    for (let prop in source) {

        let isDeepAssign;

        if (!source.hasOwnProperty(prop)) { continue }

        isDeepAssign = isObject(source[prop]);

        if (isDeepAssign) {
            target[prop] = isObject(target[prop]) ?
                target[prop] : {};
        }

        target[prop] = isDeepAssign ?
            assignDeep(target[prop], source[prop]) :
            "" === source[prop] ?
            target[prop] :
            source[prop];

    }

    return target;

}

const toString = Object.prototype.toString;

function isObject(target) {
    return "[object Object]" === toString.call(target);
}

/**
 * 检测当前是否在 Cordova 目录
 * @returns {boolean}
 */
function isCordovaDir() {
    const
        shell = require("shelljs"),
        path = require("path"),
        currentPath = shell.pwd();

    let _raw;

    _raw = currentPath.split(path.sep).join("*");

    return -1 !== _raw.lastIndexOf("*" + gulp.config.build + "*app");

}

/**
 * @deprecated
 * @param { String } taskCliAli
 * @param { String } taskName
 * @param { Array } [dependTask]
 * @param { Function } taskFn
 */
function task(taskCliAli, taskName, dependTask, taskFn) {
    const
        dargs = require("dargs");

    var isRunningFlag = `_isTask${taskName}`;

    if ("function" === typeof dependTask) {
        taskFn = dependTask;
        dependTask = [];
    }

    gulp.task(taskName, dependTask, (cb) => {

        if (kit.getCliArgs()["isRunningFlag"]) {
            return taskFn.call(this, cb);

        } else {

            let
                arrDrags;

            arrDrags = dargs(kit.getCliArgs(), { useEquals: false });
            arrDrags.push(`--${isRunningFlag}`);

            taskCliAli += " " + arrDrags.join(" ");
            console.log(taskCliAli);

            require("shelljs").exec(`gulp ${taskName} ${taskCliAli}`);

        }

    });
}

/**
 * @deprecated
 * @param { String } taskName
 * @param { Array } [dependTask]
 * @param { Function } taskFn
 */
function taskBuildApp(taskName, dependTask, taskFn) {
    return task.call(this, "--mode app", taskName, dependTask, taskFn);
}

function getDestPathFactory() {
    var path;
    return (isForce) => {
        return path = isForce ? getDestPath() : path || getDestPath();
    }
}

function getDestPath() {
    return gulp.config.build["dest"];
}

module.exports = kit;