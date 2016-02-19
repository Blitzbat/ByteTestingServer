var esprima = require('esprima');
var fs = require('fs');

function CodeAnalysis(config) {
  
  this.config = config;
  
  this.check = function(sourceCode) {	         
      var result = esprima.parse(sourceCode);
      console.log(JSON.stringify(result, null, 4));
  };
    
};

module.exports = CodeAnalysis;