var React = require('react');
var Input = require('./input');
var _ = require('underscore');

var PropertyActions = require('../actions/property_actions');

var Signup = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    console.log("Signup Submit");
      var fields = ["name", "mobile", "email", "password"];
      var obj = {};
      _.each(fields, function(field){
	  obj[field] = this.refs[field].getValue();
      }.bind(this));
      PropertyActions.signup(obj);
  },
  render: function() {
    return(
      <div className="ui page grid">
	<div className="column">
	  <form className="ui small form segment" onSubmit={this.handleSubmit}>
	      <h3 className="ui header">Signup</h3>
	    <Input label="Name" ref="name" placeholder="Enter your name"/>
	    <Input label="Mobile" placeholder="Mobile Number" ref="mobile" />
	    <Input label="Email" placeholder="email" ref="email" type="email"/>
	    <Input label="Password" placeholder="Password" ref="password" type="password"/>
	    <div className="ui checkbox">
	    <input type="checkbox"/>
	    <label>I agree to the terms of service</label>
	    </div>
	    <div className="ui field">

	    <input type="submit" value="Signup"  className="ui blue small submit button"/>
</div>
	    </form>
	</div>
      </div>
    );
  }
});
module.exports = Signup;
