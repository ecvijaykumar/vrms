var React = require('react');
var _ = require('underscore');



var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;

var PropertyStore = require('../stores/property_store');
var PropertyMessage = require('./property_message');

var PropertyByLocation = React.createClass({
  render: function() {
    var properties = _.map(this.props.data, function(property, i) {
      return (
	<div key={i} className="menu">
	  <Link to="show" activeClassName="active" className="item" 
		params={{id: property._id}}> 
	  <i className="browser icon"></i> 
	  {property.address1}
	  </Link>
	</div>
      );
    });
    
    return(
      <div className="item">
	{this.props.location}
	{properties}
      </div>
    );
  }
});


var PropertyByCity = React.createClass({
  componentDidMount: function() {
    $('.ui.accordion').accordion();
  },
  render: function() {
    var propertiesByLocation = _.groupBy(this.props.data, function(property) {
      return property.location;
    });
    var index = 0;
    var properties = _.map(propertiesByLocation, function(_data, _location) {
      index++;
      return (
	<PropertyByLocation key={index} location={_location} data={_data} />
      );
    });

    return(
      <div className="item">
	<div className="ui basic accordion">
	  <div className="active title">
	    <i className="dropdown icon"></i>{this.props.city}
	  </div>
	  <div className="active content">
	    {properties}
	  </div>
	</div>
      </div>
    );
  }
});


var PropertyList = React.createClass({
  _getPropertiesByCity: function() {
    return _.groupBy(this.props.data, function(property){
      return property.city;
    });
  },
  componentDidMount: function() {
    $('.ui.sidebar').sidebar();
  },
  render: function() {
    if (this.props.data.length == 0) {
      return (<div></div>);
    }
    var propertiesByCity = this._getPropertiesByCity();

    var index = 0;
    var properties = _.map(propertiesByCity, function(_data, _city) {
      index++;
      return (
	<PropertyByCity key={index}  city={_city} data={_data} />
      );
    });
    return(
      <div className="item">
	{properties}
      </div>
    );
  }
});



var Property = React.createClass({
    mixins: [Navigation],
  // convention _API's are private functions
  _onChange: function(event) {
      if (event.type == "Add") {
	  this.transitionTo('properties');
      } else if (event.type == "Remove") {
	  // Show the event data in banner 
	  // Add success or Remove success
	  this.transitionTo('properties');
      }
      this._getPropertyState();
  },
  _getPropertyState: function() {
      PropertyStore.getAll('vijay', function(data) {
	  if (!data) return;
	  this.setState({
	      _message: data.message,
	      _properties: data.properties
	  });
      }.bind(this));
  },
  getInitialState: function() {
    return {
	_properties: [],
	_message: ''
    }      
  },
  componentDidMount: function() {
    // Listen for property add/remove changes
      PropertyStore.addChangeListener(this._onChange);
      this._getPropertyState();
  },
  componentWillUnmount: function() {
    PropertyStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return(
      <div className="ui responsive stackable grid">
	<div className="row">
	  <div className="four wide column">
	    <div className="ui vertical menu">
	    <Link to="add" activeClassName="active" className="item"> 
	    <i className="add sign icon"></i>Add Property</Link>
	      <PropertyList data={this.state._properties}/>
	    </div>
	  </div>
	  <div className="twelve wide column">
	    <PropertyMessage message={this.state._message}/>
	    <RouteHandler />
	  </div>
	</div>
      </div>
    );
  }
});

module.exports = Property;
