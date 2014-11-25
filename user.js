var bcrypt = require('bcryptjs');
var db = require('./db').access();
var Promise = require('bluebird');
var async = require('async');

var SALT_WORK_FACTOR = 10;
var MAX_LOGIN_ATTEMPTS = 3;
var LOCK_TIME = 2 * 60 * 60 * 1000; // 2hours



var User = (function() {
    var _user = db.get('user');
    function comparePasswords(_clientPassword, _storedPassword) {
	return new Promise(function(resolve, reject) {
	    bcrypt.compare(_clientPassword, _storedPassword, 
			   function(err, isMatch) {
			       if (err) {
				   reject("passwords do not match");
			       } else {
				   resolve(isMatch);
			       }		
			   });
	});
	
    }
    return {
	signup: function(info) {
	    console.log("User signup");
	    return new Promise(function(resolve,reject) {
	    
		async.waterfall([
		    function genSalt(cb) {
			bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
			    cb(err, salt);
			});
		    },
		    function genHash(salt, cb) {
			bcrypt.hash(info.password, salt, function(err, hash) {
			    cb(err, hash);
		    });
		    },
		    function insert(hash, cb) {
			info.password = hash; 
			_user.insert(info, function(err) {
			    if (err) return cb(err, "Signup failed");
			    return cb(null, "Signup success");
			});
		    }
		], function(err, result) {
		    if (err) {
			reject(err);
			return;
		    }
		    resolve(result);
		});
	    });
	        
	},
	authenticate: function(email, authPassword, cb) {
	    return new Promise(function(resolve, reject) {
		async.waterfall([
		    function getUser(cb) {
			_user.find({email: email}, function(err, data){
			    if (!data.length) {
				return cb(true, "No matching records");
			    } 
			    cb(err, data[0].name, data[0].password);
			});
		    },
		    function isUserValid(userName, password, cb) {
			if (!userName.length) {
			    return  cb(true, "Username not found")
			} 
			cb(null, userName, password);			
		    },
		    function isPasswordMatch(userName, password, cb) {
			comparePasswords(authPassword, password)
			    .then(function(result){
				cb(null, userName)
			    }).catch(function(err){
				cb(err, "Passwords not matching");
			    });
		    }		    
		], function(err, result){
		    if (err) {
			return reject(err);
		    }
		    resolve(result);
		});
	    });
	}
    }; 
})();

module.exports = User;
