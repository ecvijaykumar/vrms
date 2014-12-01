var mongo = require('mongodb');
var monk = require('monk');
var db = require('./db').access();
var Promise = require('bluebird');

var _owner = db.get('owner');

Promise.promisifyAll(_owner);

var owner = (function() {
    return {
	addProperty: function(obj, cb) {
	    return new Promise(function(resolve, reject) {	 
		_owner.insertAsync(obj)
		    .then(function(obj){
			resolve(obj)
		    })
		    .catch(function(err){
			reject(err)
		    });		
	    })		    
	},
	getProperties: function(query, cb) {
	    return new Promise(function(resolve, reject) {
		_owner.findAsync(query)
		.then(function(doc){
		    resolve(doc)
		})
		.catch(function(err) {
		    reject(err)
		});
	    })
	},
	deleteProperty: function(id, cb) {
	    return new Promise(function(resolve, reject) {
		_owner.removeAsync({_id: id})
		.then(function() {
		    resolve("Deleted successfully")
		})
		.catch(function(err) {
		    reject(err)
		});	
	    })	    
	}
    }
})();
	     

module.exports = owner;
