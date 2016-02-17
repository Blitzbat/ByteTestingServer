var fs = require('fs');
var Q = require('q');

module.exports = {
  read: function(file) {
      var d = Q.defer()
      
      fs.exists(file, function(exists) {
         if(!exists) d.reject('Could not locate file '+file);
         
         fs.readFile(file, function(error, data) {
            if(error) d.reject(error.message);            
            d.resolve(JSON.parse(data.toString('utf-8')));
         });     
      });
      
      return d.promise;                          
  }  
};