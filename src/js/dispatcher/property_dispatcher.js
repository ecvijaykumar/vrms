// Property Dispatcher.js
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');
var PropertyDispatcher = assign(new Dispatcher(), {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
    handleAddAction: function(action) {
	this.dispatch({
	    source: 'PROPERTY_ACTION',
	    action: action
	});
    },
    // Need to revisit if we need this API
    handleRemoveAction: function(action) {
	this.dispatch({
	    source: 'PROPERTY_ACTION',
	    action: action
	});
    },
    

});

module.exports = PropertyDispatcher;
