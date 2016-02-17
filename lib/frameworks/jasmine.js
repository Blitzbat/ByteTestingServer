var q = require('q');
var Jasmine = require('jasmine');
var Communication = require('../utils/communication');
var JasmineReporter = function (proc) {

    this.communication = new Communication(proc);

    this.suiteStarted = function (suite) {
        this.communication.sendSuiteStarted({
            name: suite.description
        });
    };

    this.specStarted = function (spec) {
      	 this.communication.sendSpecStarted({
            name: spec.description
        });
    };

    this.specDone = function (spec) {        
        this.communication.sendSpecDone({
            specName: spec.description,
            passed: spec.status !== 'failed',
            messages: this.buildMessages(spec.failedExpectations)           
        });
    };

    this.suiteDone = function (suite) {
       this.communication.sendSuiteDone(); 
    };

    this.buildMessages = function (expectations) {
        var messages = [];        
        expectations.forEach(function(expectation) {            
          messages.push({
              message: expectation.message,
              stack: expectation.stack
          });  
        });
        
        return messages;
    };
};

module.exports = {
    run: function (specs) {
        var d = q.defer();
        var jasmineRunner = new Jasmine();

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
        jasmineRunner.projectBaseDir = '';

        jasmineRunner.onComplete(function (failed) {
            d.resolve(failed);
        });


        jasmineRunner.addReporter(new JasmineReporter(process));
        jasmineRunner.execute(specs);

        return d.promise;
    }
};