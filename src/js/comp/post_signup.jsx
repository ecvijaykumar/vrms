var React = require('react');
var PostSignup = React.createClass({
  render: function() {
      if (!this.props.show) {
	  return (<div></div>);
      }
    return(
      <div>
	<h2>Signup Successful. Check your email to activate the service </h2>
      </div>   
    );
  }
});

module.exports = PostSignup;
