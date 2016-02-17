var q = require('q');
var child_process = require('child_process');


module.exports = {
    run: function (config) {
        var deferred = q.defer()

        var runnerWorker = child_process.fork
            (process.cwd() + '/lib/runner/runnerWorker.js',
            ['--framework', config.framework, '--session', '12345678'],
             {
                cwd: process.cwd(),
            });
	    
        runnerWorker.on("message", function(msg) {
           console.log(msg); 
        });
         
        runnerWorker.on('exit', function (e) {
            deferred.resolve();
        });

        runnerWorker.on('error', function (e) {
            console.log("error");
            console.log(e);
            deferred.reject();
        });
        return deferred.promise;
    }
};  