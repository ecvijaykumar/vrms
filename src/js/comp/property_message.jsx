var React = require('react');

var PropertyMessage = React.createClass({
    _flash: function() {
	$('.property.banner')
	    .transition('scale');
    },
    render: function() {
	console.log("Property Message Render" + this.props.message);
	var message = this.props.message;

	if (!message.length) {
	    return (<div></div>);
	}
	this._flash();
	return(
	    <div className="property banner">
	    <div className="ui success message">
		<i className="close icon"></i>
		<div className="header">
		{message}
	    </div>
		</div>
		</div>
	);
    }
});

module.exports = PropertyMessage;
