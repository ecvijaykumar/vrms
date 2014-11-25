var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var HomePage = React.createClass({
  render: function() {
    return(
      <div className="reveal left pushed" ontouchstart>
	<div className="ui large vertical inverted grey labeled icon sidebar menu active" id="menu">
	  <a className="hide item">
      	    <i className="close icon"></i> Close Menu
    	  </a>
	  <div className="item">
	    <b>For LandLords</b>
	    <div className="vertical text menu">
	      <a className="item" href="/introduction/definitions.html"> <i className="home icon"></i>Collect Rent Online</a>
	      <a className="item" href="/introduction/overview.html"><i className="home icon"></i>Screen Tenants</a>
	      <a className="item" href="/introduction/types.html"><i className="home icon"></i>Check Tenant Credit</a>
	    </div>
	  </div>
	  <div className="item">
	    <b>For Renters</b>
	    <div className="vertical text menu">
	      <a className="item" href="/project/contributing.html"><i className="home icon"></i>Renter Profile</a>
	      <a className="item" href="/project/development.html"><i className="home icon"></i>Pay Rent Online</a>
	      <a className="item" href="/project/development.html"><i className="home icon"></i>Invite a Landlord</a>

	    </div>
	  </div>
	  <div className="item">
	    <a href="/element.html"><b>Get RMS</b></a>
	    <div className="vertical text menu">
	      <a className="item" href="/elements/button.html"><i className="home icon"></i>How RMS Works</a>
	      <a className="item" href="/elements/divider.html"><i className="home icon"></i>Customer Love</a>
	      <a className="item" href="/elements/header.html"><i className="home icon"></i>Features &amp; Pricing</a>
	    </div>
	  </div>

	  <div className="ui inverted grey vertical menu">
	    <div className="field">
	      <Link to="signup" className="ui teal button">Sign Up</Link>
	    </div>
	    <div className="ui horizontal divider">Or</div>
	    <div className="field">
	      <Link to="login" className="ui button">Login</Link>
	    </div>
	  </div>
	</div>

	<div className="ui inverted page grid homeheader segment">
	  <div className="ui black huge launch right attached button" style={{'width': '70'}}>
      	    <i className="icon list layout"></i>
      	    <span className="text"  style={{'display': 'none'}} >Menu</span>
    	  </div>
	  
	  <div className="vertical center aligned segment">
	    Forget about rent.
	  </div>
	  <div className="vertical center aligned segment">
	    Simple, end-to-end rental management software for landlords and tenants
	  </div>
	  
	</div>
	
	<div className="ui page grid overview segment">
	  <div className="ui two wide column">
	  </div>
	  <div className="twelve wide column">
	    <div className="ui three column center aligned stackable divided grid">
	      <div className="column">
		<div className="ui icon header">
		  <i className="circular book link icon"></i>
		  Collect Rental Online 
		</div>
		<p>Roommates?Check. On time?Check. Just no paper check</p>
		<p><a className="ui teal right labeled icon button" href="#">Learn more</a></p>
	      </div>
	      <div className="column">
		<div className="ui icon header">
		  <i className="circular code link icon"></i>
		  Screen Tenants Quickly
		</div>
		<p>Essential information, clear comparisons, no noise</p>
		<p><a className="ui teal right labeled icon button" href="#">Learn more</a></p>
	      </div>
	      <div className="column">
		<div className="ui icon header">
		  <i className="circular user link icon"></i>
		  Check Tenant Credit
		</div>
		<p>Secure, and always up to date. Straight from the bureau</p>
		<p><a className="ui teal right labeled icon button" href="#">Learn more </a></p>
	      </div>
	    </div>
	  </div>
	</div>
      </div>
									     );
									     }
  });

  module.exports = HomePage;
