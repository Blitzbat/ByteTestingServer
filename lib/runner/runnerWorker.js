var program = require('commander');
var pathUtil = require('../utils/path');

program
    .version('1.0.0')
    .usage('<configFile>')
    .option('-f, --framework <framework>', 'Testing framework')
    .option('-s, --session <session>', 'Session id')
    .parse(process.argv);    
    
var frameworkRunner = require('./../frameworks/'+program.framework);

pathUtil.getSpecs(program.session).then(function(specFiles) {
    console.log("Running tests");
    frameworkRunner.run(specFiles).then(function(failed) {
        console.log("Done. Failed specs: "+failed);  
    });    
}, function(error) {
   console.error(error);
   process.exit(1); 
});