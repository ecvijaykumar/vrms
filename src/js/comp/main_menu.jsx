var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var MainMenu = React.createClass({
  render: function() {
    var right_menu;
    if (this.props.userLoggedIn) {
      right_menu = (
      	  <div className="right menu">
	    <div className="item">
	      <Link to="user" className="ui blue button" params={{id: this.props.userName}}>
	      {this.props.userName}</Link>
	    </div>
	    <div className="item">
	      <Link to="logout" className="ui green button" 
		    onClick={this.props.onLogout}>Logout</Link>
	    </div>	 
	  </div>
	);
    } else {
      right_menu = (
	<div className="right menu">
	  <div className="item">
	    <Link to="signup" className="ui blue button" >
	      Sign Up</Link>
	    </div>
	    <div className="item">
	      <Link to="login" className="ui green button">LogIn</Link>
	    </div>
	</div>
      );
    }
    
    return(
      <div className="ui grey inverted menu">
	<Link to="tenant" activeClassName="active" className="item">Tenant</Link>
	<Link to="owner" activeClassName="active" className="item">Owner</Link>
	<Link to="comment" activeClassName="active" className="item">Comment</Link>
	<Link to="about" activeClassName="active" className="item">About</Link>
        {right_menu}	
      </div>

    );
  }
});

module.exports = MainMenu;
