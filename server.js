var os = require('os');
var express = require('express');
var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var merge = require('merge');
var Config = require('./lib/configuration');
var Q = require('q');
var testrunner = require('./lib/runner/testRunner');

var serverConfig = {};

Config.read('config.json').then(function (json) {
    var defaults = {
        port: 3000,
    };

    serverConfig = merge(defaults, serverConfig);
    serverConfig.host = serverConfig.host || 'http://' + os.hostname() + ':' + serverConfig.port + '/';
    server.listen(3000);

    app.set('view engine', 'jade');
    app.use(express.static('public'))

    app.get("/", function (req, res) {
        res.render('index', {
            config: serverConfig
        });
    });

    io.on("connection", function (socket) {
        socket.on("startRunner", function () {

            var runnerConfig = {
                framework: 'jasmine',
                session: '12345678'
            };

            testrunner.run(runnerConfig).then(function () {
                console.log("Done");
                socket.emit("runnerComplete", { msg: 'complete' })
            });
        });
    });
});




