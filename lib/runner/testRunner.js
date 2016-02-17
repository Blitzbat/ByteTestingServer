var q = require('q');
var child_process = require('child_process');
var ResultReporter = require('../reporter/resultReporter.js');

module.exports = {
    run: function (config) {
        var deferred = q.defer()

        var runnerWorker = child_process.fork
            (process.cwd() + '/lib/runner/runnerWorker.js',
            ['--framework', config.framework, '--session', config.session],
            {
                cwd: process.cwd(),
            });

        var reporter = new ResultReporter(config.session);

        runnerWorker.on("message", function (msg) {
            switch (msg.event) {
                case 'suite:started':
                    reporter.suiteStarted({ suiteName: msg.suiteName });
                    break;
                case 'spec:started':
                    reporter.specStarted({});
                    break;
                case 'spec:done':
                    reporter.specDone({
                        specName: msg.result.specName,
                        passed: msg.result.passed,
                        messages: msg.result.messages
                    }); 
                    break;
                case 'suite:done':
                	reporter.suiteDone({});                     
                    break;
                default:
                    break;
            }
        });

        runnerWorker.on('exit', function (e) {
            reporter.finish().then(deferred.resolve)             
        });

        runnerWorker.on('error', function (e) {
            console.log("error");
            console.log(e);
            deferred.reject();
        });
        return deferred.promise;
    }
};  