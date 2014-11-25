var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;
var Navigation = Router.Navigation;
var RouteHandler = Router.RouteHandler;

var Tenant = require('./comp/tenant');
var Owner = require('./comp/owner');
var Signup = require('./comp/signup');
var Login = require('./comp/login');
var Comment = require('./comp/comment');
var Dashboard = require('./comp/dashboard');

var Property = require('./comp/property');
var PropertyAdd = require('./comp/property_add');
var PropertyShow = require('./comp/property_show');
var HomePage = require('./comp/homepage');
var MainMenu = require('./comp/main_menu');
var PostSignup = require('./comp/post_signup');

var PropertyStore = require('./stores/property_store');
var PropertyActions = require('./actions/property_actions');

var App = React.createClass({
    mixins: [Navigation],
  _onChange: function(event) {
    if (event.type == "LogoutSuccess") {
      this.setState({userLoggedIn: false, userName: ''});
    } else if (event.type == "LoginSuccess"){
      this.setState({userLoggedIn: true, 
		     userName: event.userName});
    } else if (event.type == "SignupSuccess") {
      this.setState({postSignup: true});
      this.goBack();
    }
  },

  getInitialState: function() {
    return {
      userLoggedIn: false,
      userName: '',
      postSignup: false
    }      
  },

  componentDidMount: function() {
    // Listen for property add/remove changes
      PropertyStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PropertyStore.removeChangeListener(this._onChange);
  },

  login: function(obj) {
      PropertyActions.login(obj);
  },
  logout: function(e) {
    e.preventDefault();
    PropertyActions.logout({user: this.state.userName});
  },

  render: function() {
    return(
      <div>
	<MainMenu userLoggedIn={this.state.userLoggedIn}
		  userName={this.state.userName}
		  onLogout={this.logout}/>
	<PostSignup show={this.state.postSignup}/>
	<RouteHandler />
      </div>   
    );
  }
});


var Profile = React.createClass({
  render: function() {
    console.log("Creating profile");
    return(
      <div>
	<h2>Profile view </h2>
      </div>   
    );
  }
});

var Payments = React.createClass({
  render: function() {
    console.log("Calling Payments");
    return(
      <div>
	<h2>Payments View </h2>
      </div>   
    );
  }
});



var Logout = React.createClass({
  render: function() {
    console.log("Logout");
    return(
      <div>
	<h2>You are now logged out </h2>
      </div>   
    );
  }
});

var User = React.createClass({
  render: function() {
    console.log("User");
    return(
      <div>
	<h2>Show user dashboard </h2>
      </div>   
    );
  }
});

var routes = (
  <Route name="/" handler={App}>
    <Route name="tenant" handler={Tenant}>
      <Route name="profile"  handler={Profile}/>
      <Route name="payments" handler={Payments}/>
      </Route>
	<Route name="user" handler={User} />

      <Route name="owner"  handler={Owner}>
	<Route name="dashboard"  handler={Dashboard} />
	<Route name="properties" path="property" handler={Property} >
	  <Route name="add" handler={PropertyAdd} />
	  <Route name="show" path="show/:id" handler={PropertyShow} />
	  </Route>
	  </Route>
	  <Route name="comment"  handler={Comment}/>
	  <Route name="signup"  handler={Signup}/>
	  <Route name="login"  handler={Login}/>
	  <Route name="logout"  handler={Logout}/>

	  <Route name="about"  handler={HomePage}/>
	  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});
