var glob = require('glob');
var q = require('q');

module.exports = {
    getSessionPath: function (sessionid) {
        var path = process.cwd();
        path += '/sessions/' + sessionid;

        return path;
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
    }
};