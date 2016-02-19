describe("PathUtil", () => {

    var pathUtil = require('./../../lib/utils/path.js');
    var q = require('q');
    var fs = require('fs');
	var rimraf = require('rimraf'); 
    var SESSIONID = "123456";

    var timeout;

    beforeEach((done) => {
        timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
        
        pathUtil.createBaseDirectory().then(() => {
            done();
        });
        done();
    });

    it("should create session directory", (done) => {
        pathUtil.createSessionDirectory(SESSIONID).then(() => {
            fs.exists(pathUtil.getSessionPath(SESSIONID), (exsists) => {
               expect(exsists).toBeTruthy();
               done(); 
            });            
        }, (err) => {
            expect(err).toBeUndefined();
            done();            
        });
    });
    
    if("should create result directory", (done) => {
        pathUtil.createResultDirectory(SESSIONID).then(() => {
            fs.exists(pathUtil.getResultPath(SESSIONID), (exists) => {
                expect(exists).toBeTruthy();
                done();   
            });
        }, (err) => {
            expect(err).toBeUndefined();
        });
    });

    if("should create spec directory", (done) => {
        pathUtil.createSpecDirectory(SESSIONID).then(() => {
            fs.exists(pathUtil.getSpecPath(SESSIONID), (exists) => {
                expect(exists).toBeTruthy();
                done();   
            });
        }, (err) => {
            expect(err).toBeUndefined();
        });
    });

    afterEach((done) => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
        rimraf(process.cwd() + "/sessions", () => {
            done();
        })
    });

});