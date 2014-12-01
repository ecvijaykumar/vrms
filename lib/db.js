var mongo = require('mongodb');

var db = (function(){
    var monk = require('monk');
    return {
	access: function() {
	    return monk('localhost:27017/rms');
	}
    }
})();

module.exports = db;

