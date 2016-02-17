var Communication = function (proc) {
    this._process = proc;

    this.sendSuiteStarted = function (suiteName) {
        this._process.send({
            event: 'suite:started',
            suiteName: suiteName,
            time: new Date()
        });
    };

    this.sendSpecStarted = function (spec) {
        this._process.send({
            event: 'spec:started',
            specName: spec.name,
            time: new Date()
        });
    };

    this.sendSpecDone = function (spec) {
        this._process.send({
            event: 'spec:done',
            result: spec,
            time: new Date()
        });
    };

    this.sendSuiteDone = function (suite) {
        this._process.send({
            event: 'suite:done',
            time: new Date() 
        });
    };

};
module.exports = Communication;