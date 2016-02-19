var glob = require('glob');
var q = require('q');
var fs = require('fs');
var path = require('path');
var Analysis = require('./codeAnalysis');

module.exports = {
    getSessionPath: function (sessionid) {
        var path = process.cwd();
        path += '/sessions/' + sessionid;

        return path;
    },
    getResultPath: function (sessionid) {
        return this.getSessionPath(sessionid) + '/result';
    },
    getSpecPath: function (sessionid) {
        return this.getSessionPath(sessionid) + '/specs';
    },
    getSpecs: function (sessionid) {
        var specPath = this.getSessionPath(sessionid);
        var d = q.defer();

        glob(specPath + '/**', function (err, files) {
            if (err) {
                d.reject(err);
                return;
            }

            var specFiles = files.filter(function (value) {
                return value.endsWith('.js');
            });
            d.resolve(specFiles);
        });

        return d.promise;
    },
    createBaseDirectory: function() {
        var d = q.defer();
        
        fs.mkdir(process.cwd()+'/sessions', function(err) {
            if(err) {
                d.reject(err);
                return;                
            }
            d.resolve();
        })
        
        return d.promise;   
    },
    createSessionDirectory: function (sessionid) {
        var d = q.defer();

        fs.mkdir(this.getSessionPath(sessionid), function (err) {            
            if (err) {                
                d.reject(err);                
            }else {
                d.resolve();    
            }
            
        });

        return d.promise;
    },
    createSpecDirectory: function (sessionid) {
        var d = q.defer();

        fs.mkdir(this.getSpecPath(sessionid), function (err) {
            if (err) {
                d.reject(err);
                return;
            }
            d.resolve();
        });

        return d.promise;
    },
    createResultDirectory: function (sessionid) {
        var d = q.defer();

        fs.mkdir(this.getResultPath(sessionid), function (err) {
            if (err) {
                d.reject(err);
                return;
            } else {
                d.resolve();
            }
        });

        return d.promise;
    },
    extractSpecs: function (sessionid, zip) {
        var basePath = this.getSpecPath(sessionid);	    
        var self = this;
        
        var codeAnalysis = new Analysis({});
         
        Object.keys(zip.files).forEach(function(name) {            
            var data = zip.files[name].asNodeBuffer();
            
            codeAnalysis.check(data.toString('utf-8'));
                        
            var destination = path.join(basePath, name);
            fs.writeFileSync(destination, data);
            console.log("Extracting to: " + destination);
        });       
    }
};