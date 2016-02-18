var fs = require('fs');
var q = require('q');
var pathUtil = require('../utils/path');

var ResultReporter = function (sessionid) {

    this.session = sessionid;

    this.result = {
        suites: []
    };

    this.suiteStarted = null;
    this.specStarted = null;
    this.currentSuite = null;

    this.suiteStarted = function (suite) {
        this.suiteStarted = new Date();
        this.currentSuite = {
            name: suite.suiteName,
            duration: 0,
            specs: []
        };
    };

    this.specStarted = function (spec) {
        this.specStarted = new Date();
    };

    this.specDone = function (spec) {
        var specResult = {
            name: spec.specName,
            duration: new Date() - this.specStarted,
            passed: spec.passed,
        };

        if (!spec.passed) {
            specResult.messages = spec.messages;
        }

        this.currentSuite.specs.push(specResult);
    };

    this.suiteDone = function (suite) {
        this.currentSuite.duration = new Date() - this.suiteStarted;
        this.result.suites.push(this.currentSuite);
    };


    this.finish = function () {
        var d = q.defer();
        var path = pathUtil.getResultPath(this.session)+'/result.json';;	    
        var result = this.result;
               
        fs.writeFile(path, JSON.stringify(result), function (err) {
            if (err) {
                d.reject(err);
                return;
            }
            d.resolve();
        });
        
        return d.promise;
    };
};

module.exports = ResultReporter;