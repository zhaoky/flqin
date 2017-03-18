"use strict";

function devServer() {

    const
        _browser = require("child_process"),
        os = require('os'),
        server = require("gulp-connect");

    server.server({
        root: "dist",
        host: "localhost",
        port: 8888,
        // livereload: true
    });

    let platform = os.platform();
    switch (platform) {
        case "darwin":
            _browser.exec('open -a "Google Chrome" http://localhost:8888');
            break;
        case "win32":
            _browser.exec("start chrome http://localhost:8888");
            break;
    }

}

module.exports = {
    server: devServer
};