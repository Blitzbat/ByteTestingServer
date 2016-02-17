var q = require('q');
var Jasmine = require('jasmine');
var Communication = require('../utils/communication');
var JasmineReporter = function(proc) {
    
    this.communication = new Communication(proc); 
        
    this.suiteStarted = function(suite) {
         this.communication.sendSuiteStarted(suite.description);
    };  
};

module.exports = {
    run: function (specs) {        
        var d = q.defer();       
        var jasmineRunner = new Jasmine();
                   
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
        jasmineRunner.projectBaseDir = '';
        
        jasmineRunner.onComplete(function(failed) {
            d.resolve(failed);
        });      
	    
        
        jasmineRunner.addReporter(new JasmineReporter(process));                          
        jasmineRunner.execute(specs);
        
        return d.promise;     
    } 
};