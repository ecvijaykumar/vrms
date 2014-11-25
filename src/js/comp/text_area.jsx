var React = require('react/addons');
var validationRules = require('../lib/validation');

var TextArea = React.createClass({
  getInitialState: function() {
    return (
      {
	errorPrompt: '',
	rules: this.props.rules
      }
    );
  },
   getValue: function() {
       return this.refs.key.getDOMNode().value;
   },
  handleBlur: function() {
    var text = this.refs.key.getDOMNode().value;
    if (this.props.rules) {
      var prompt = validationRules.validate(text,  this.props.rules);
      this.setState({errorPrompt: prompt});
    }
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'display none': !this.state.errorPrompt.length,
      'ui red pointing above ui label': this.state.errorPrompt.length
    });

    return(
      <div className="field">
	<label>{this.props.label}</label>
	<textarea ref="key" placeholder={this.props.placeholder} onBlur={this.handleBlur} />
	<div className={classes}>{this.state.errorPrompt}</div>
      </div>
    );
  }
});

module.exports = TextArea;
