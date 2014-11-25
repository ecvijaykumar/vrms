var React = require('react/addons');
var validationRules = require('../lib/validation');

var Input = React.createClass({
  getInitialState: function() {
    return (
      {
	errorPrompt: '',
	rules: this.props.rules
      }
    );
  },
  handleBlur: function() {
    var text = this.refs.text.getDOMNode().value;
    if (this.props.rules) {
      var prompt = validationRules.validate(text,  this.props.rules);
      console.log("Prompt is " + prompt);
      this.setState({errorPrompt: prompt});
    }
  },
  getValue: function() {
    return this.refs.text.getDOMNode().value;
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'display none': !this.state.errorPrompt.length,
      'ui red pointing above ui label': this.state.errorPrompt.length
    });

    var _type = this.props.type || "text";
    if (this.props.icon) {
      return (
	<div className="field">
	  <label>{this.props.label}</label>
	  <div className="ui left icon input">
	    <input type={_type}	
		   ref="text" 
		   placeholder={this.props.placeholder}
		   onBlur={this.handleBlur}
		   />
	    <i className="inverted dollar icon"></i>
	  </div>
	  <div className={classes}>{this.state.errorPrompt}</div>
	</div>
      );
    } else {
      return (
	<div className="field">
	  <label>{this.props.label}</label>
	    <input type={_type}	
		   ref="text" 
		   placeholder={this.props.placeholder}
		   onBlur={this.handleBlur}
		   />
	    <div className={classes}>{this.state.errorPrompt}</div>
	  </div>
      );
    }
    
  }
});

module.exports = Input;
