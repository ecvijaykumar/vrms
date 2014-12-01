var User = require('./user');
var Promise = require('bluebird');

var username = "samanvi@gmail.com";
var password = "rajxyz";

function test1() {
    var err = User.save(username, password);
    console.log(err);
}

function test2() {
    User.authenticate(username, password)
	.then(function(res) {
	    console.log(res)
	})
	.catch(function(err) {
	    console.log(err)
	});
}


function test3() {
    User.authenticate("dummy", password)
	.then(function(res) {
	    console.log(res)
	})
	.catch(function(err) {
	    console.log(err)
	});
}


function test4() {
    User.authenticate(username, "junk")
	.then(function(res) {
	    console.log(res)
	})
	.catch(function(err) {
	    console.log(err)
	});
}

test2();
