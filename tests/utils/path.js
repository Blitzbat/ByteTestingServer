describe("PathUtil", () => {

    var pathUtil = require('./../../lib/utils/path.js');
    var q = require('q');
    var fs = require('fs');
    var rimraf = require('rimraf');
    var SESSIONID = "123456";

    var timeout;

    describe("path functions", () => {
        it('should return correct session path', () => {
            var path = pathUtil.getSessionPath(SESSIONID);
            expect(path).toBe(process.cwd() + '/sessions/' + SESSIONID);
        });

        it('should return correct result path', () => {
            var path = pathUtil.getResultPath(SESSIONID)
            expect(path).toBe(process.cwd() + '/sessions/' + SESSIONID + "/result");
        });

        it('should return correct spec path', () => {
            var path = pathUtil.getSpecPath(SESSIONID)
            expect(path).toBe(process.cwd() + '/sessions/' + SESSIONID + "/specs");
        });
    });

    describe("specs", () => {

        beforeEach((done) => {
            pathUtil
                .createBaseDirectory()
                .then(() => {
                    pathUtil.createSessionDirectory(SESSIONID)
                })
                .then(() => {
                    pathUtil.createSpecDirectory(SESSIONID)
                }).then(() => {
                    fs.writeFileSync(pathUtil.getSpecPath(SESSIONID) + "/spec1.js", "spec1");
                    fs.writeFileSync(pathUtil.getSpecPath(SESSIONID) + "/spec2.js", "spec2");
                    done();
                });

        });

        it("should get specs", (done) => {
            pathUtil.getSpecs(SESSIONID).then((files) => {
                expect(files).toBeDefined();
                expect(files.length).toBe(2);
                done();
            });
        });
        
        it("should extract spec files", (done) => {
           var zipObj = {
                files: {
                    test1: {
                        asNodeBuffer: function() {
                            return new Buffer("test1234");
                        }
                    }
                }
            };
            
            pathUtil.extractSpecs(SESSIONID, zipObj);
            
            fs.exists(pathUtil.getSpecPath(SESSIONID)+"/test1", (exists) => {
                expect(exists).toBeTruthy();
                done();
            });

        });

        afterEach((done) => {
            rimraf(process.cwd() + '/sessions', () => {
                done();
            });
        });

    });

    describe("where base directory does not exist", () => {
        it("should fail on creating session directory", (done) => {
            pathUtil.createSessionDirectory(SESSIONID).then(() => {
            }, (err) => {
                expect(err).toBeDefined()
                done();
            });
        });

        it("should fail on creating result directory", (done) => {
            pathUtil.createResultDirectory(SESSIONID).then(() => {
            }, (err) => {
                expect(err).toBeDefined()
                done();
            });
        });

        it("should fail on creating spec directory", (done) => {
            pathUtil.createSpecDirectory(SESSIONID).then(() => {
            }, (err) => {
                expect(err).toBeDefined()
                done();
            });
        });
    });

    describe("where base directory is exists", () => {
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

        if ("should create result directory", (done) => {
            pathUtil.createResultDirectory(SESSIONID).then(() => {
                fs.exists(pathUtil.getResultPath(SESSIONID), (exists) => {
                    expect(exists).toBeTruthy();
                    done();
                });
            }, (err) => {
                expect(err).toBeUndefined();
            });
        });

        if ("should create spec directory", (done) => {
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

});