var PropertyDispatcher = require('../dispatcher/property_dispatcher');
var PropertyConstants = require('../constants/property_constants');

//as our application grows, having these helpers keeps the code clean and semantic
var PropertyActions = {
    add: function(info) {
	PropertyDispatcher.handleAddAction({
	    actionType: PropertyConstants.PROPERTY_ADD,
	    info: info
	});
	// We could dispatch an action to generate an email
	// to remind the owner to list it for renting, or provide documents to company
	// or provide missing information etc...
    },
    remove: function(id) {
	PropertyDispatcher.handleRemoveAction({
	    actionType: PropertyConstants.PROPERTY_REMOVE,
	    id: id
	});
    },
    signup: function(info) {
	PropertyDispatcher.handleAddAction({
	    actionType: PropertyConstants.PROPERTY_SIGNUP,
	    info: info
	});
    },
    login: function(info) {
	PropertyDispatcher.handleAddAction({
	    actionType: PropertyConstants.PROPERTY_LOGIN,
	    info: info
	});
    },
    logout: function(info) {
	PropertyDispatcher.handleAddAction({
	    actionType: PropertyConstants.PROPERTY_LOGOUT,
	    info: info
	});
    }        
};

module.exports = PropertyActions;
