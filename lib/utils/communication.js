var Communication = function(proc) {
  this._process = proc;
  
  this.sendSuiteStarted = function(suiteName) {
    this._process.send({
        event: 'suite:started',
        suiteName: suiteName,
        time: new Date()
    });  
  };
    
};
module.exports = Communication;