var React = require('react');
var Comment = React.createClass({
    componentDidMount: function() {
	$('#editor').trumbowyg();
    },
    handleSubmit: function(e) {
	e.preventDefault();
	var text = $('#editor').trumbowyg('html');
	// convert to markdown
	$('#editor').trumbowyg('destroy');
    },
    handleClear: function(e) {
	e.preventDefault();
	$('#editor').trumbowyg('empty');
    },
    render: function() {
	return(
		<div>
		<div id="editor">
		</div>   
		<button onClick={this.handleSubmit}>Save</button>
		<button onClick={this.handleClear}>Clear</button>
		</div>
	);
    }
});

module.exports = Comment;
