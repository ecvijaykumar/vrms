var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Link = Router.Link;


var Tenant = React.createClass({
  render: function() {
    return(
      <div>
      <div className="ui red secondary pointing menu">
	<Link to="profile" activeClassName="active" className="item">Profile</Link>
	<Link to="payments" activeClassName="active" className="item">Payments</Link>
      </div>
      <RouteHandler />
      </div>   


    );
  }
});

module.exports = Tenant;
