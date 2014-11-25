var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Input = require('./input');
var PropertyActions = require('../actions/property_actions');

var Login = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
      var obj = {};
      obj["email"] = this.refs.email.getValue();
      obj["password"] = this.refs.password.getValue();
      PropertyActions.login(obj);
  },
  render: function() {
    return(
      <div className="ui page grid">
	<div className="column">
	  <div className="ui fluid form segment">

	    <form onSubmit={this.handleSubmit}>
	    <h3 className="ui header">Log in to your account</h3>
	    <Input label="Email" ref="email" type="email"/>
	    <Input label="Password" type="password" ref="password"/>

	      <div className="field">
		<input type="submit"  className="ui blue fluid submit button" value="Login"/>
	      </div>
	      <div className="ui horizontal divider">Or</div>
	      <div className="field">
		<Link to="signup" className="ui grey fluid button"  >Sign Up</Link>
	      </div>
	      
	    </form>
	  </div>
	</div>
      </div>
    );
  }
});
module.exports = Login;
