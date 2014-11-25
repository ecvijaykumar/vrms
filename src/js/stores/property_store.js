var PropertyDispatcher = require('../dispatcher/property_dispatcher');
var EventEmitter = require('events').EventEmitter;
var PropertyConstants = require('../constants/property_constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var Backbone = require('backbone');
Backbone.$ = $;

var PropertyModel = Backbone.Model.extend({
    urlRoot: "/property",
    idAttribute: "_id",
    
});

var PropertyCollection = Backbone.Collection.extend({
    model: PropertyModel,
    url: "/property"
});


var PropertyService =  {
    _properties: new PropertyCollection(),
    _message: '',
    
    addProperty: function(info) {
	var property = new PropertyModel(info);
	this._properties.create(info, {
	    wait: true,
	    success: function(resp) {
		console.log("Success callback");
		PropertyStore.emitChange({type:"Add"});		
		this._message = resp.changed.result;

	    }.bind(this),
	    error: function(err) {
		console.log("Add error");
		console.log(err);
	    }
	});
    },
    getProperty: function(id) {
	var property =  this._properties.get(id) || {};

	return property.toJSON();
    },
    getProperties: function(user, cb) {
	this._properties.fetch({
	    success: function(c) {
		cb({properties: c.toJSON(),
		   message: this._message});
		this._message = '';
	    }.bind(this),
	    error: function(r) {
		console.log("Failure");
		console.log(r);
	    }
	});
	
    },
    removeProperty: function(id) {
	var property =  this._properties.get(id);
	property.destroy({wait: true,
			  success: function(resp){
			      console.log("destroy success");
			      this._message = "Property Removed Successfully";
			      PropertyStore.emitChange({type: "Remove"});
			  }.bind(this)
			 });
    },
    signup: function(info) {
	$.ajax({
	    url: 'signup',
	    dataType: 'json',
	    type: 'POST',
	    data: info,
	    success: function(data) {
		console.log("Sign up success");
		PropertyStore.emitChange({type:"SignupSuccess"});		
		console.log(data);
	    },
	    error: function(xhr, status, err) {
		console.log("Signup failure");
		PropertyStore.emitChange({type:"SignupFailure"});		
		console.log(err);
	    }
	});
    },
    login: function(info) {
	$.ajax({
	    url: 'login',
	    dataType: 'json',
	    type: 'POST',
	    data: info,
	    success: function(data) {
		console.log("Login success");
		PropertyStore.emitChange({type:"LoginSuccess",
					 userName: data.userName});		
	    },
	    error: function(xhr, status, err) {
		console.log("Login failure");
		PropertyStore.emitChange({type:"LoginFailure"});		
		console.log(err);
	    }
	});
    },
    logout: function(info) {
	$.ajax({
	    url: 'logout',
	    dataType: 'json',
	    type: 'POST',
	    data: info,
	    success: function(data) {
		console.log("Logout success");
		PropertyStore.emitChange({type:"LogoutSuccess"});		
		console.log(data);
	    },
	    error: function(xhr, status, err) {
		console.log("Logout failure");
		PropertyStore.emitChange({type:"LogoutFailure"});		
		console.log(err);
	    }
	});
    }



};


var PropertyStore = assign(new EventEmitter(), {
    getAll: function(user, cb) {
	return PropertyService.getProperties(user, cb);
    },
    getProperty: function(id) {
	return PropertyService.getProperty(id);
    },
    getPropertyMessage: function() {
	return PropertyService.getPropertyMessage();
    },
    emitChange: function(event) {
	this.emit(CHANGE_EVENT, event);
    },
    addChangeListener: function(callback) {
	this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
	this.removeListener(CHANGE_EVENT, callback);
    }     
});

// Register to handle all updates
PropertyDispatcher.register(function(payload){
    var action = payload.action;

    switch(action.actionType) {
    case PropertyConstants.PROPERTY_ADD:
	PropertyService.addProperty(action.info);
	break;
    case PropertyConstants.PROPERTY_REMOVE:
	PropertyService.removeProperty(action.id);
	break;
    case PropertyConstants.PROPERTY_SIGNUP:
	PropertyService.signup(action.info);
	break;
    case PropertyConstants.PROPERTY_LOGIN:
	PropertyService.login(action.info);
	break;
    case PropertyConstants.PROPERTY_LOGOUT:
	PropertyService.logout(action.info);
	break;
    default:
	return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = PropertyStore;
