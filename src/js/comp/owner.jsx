var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Owner = React.createClass({
  render: function() {
    return(
      <div>
	<div className="ui red secondary pointing menu">
	  <Link to="dashboard" activeClassName="active" className="item">Dashboard</Link>
	  <Link to="properties" activeClassName="active" className="item">Properties</Link>

	</div>

	<RouteHandler />
      </div>   
    );
  }
});

module.exports = Owner;
