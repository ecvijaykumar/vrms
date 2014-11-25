var React = require('react');
var _ = require('underscore');

var Router = require('react-router');
var PropertyStore = require('../stores/property_store');
var PropertyActions = require('../actions/property_actions');

var PropertyShow = React.createClass({
    mixins: [ Router.State ],
  getProperty: function(id) {
      return PropertyStore.getProperty(id);
  },
  handleDelete: function(e) {
      e.preventDefault();
      PropertyActions.remove(this.getParams().id);
  },
  render: function() {
      console.log("Show..");

    var property = this.getProperty(this.getParams().id);

    if (property == undefined) {
      return <div></div>;
    }
    return(
      <div className="ui page grid">
	<div className="column">

	  <div className="ui three connected items">
	    <div className="item">
	      <div className="content">
		
		<div className="name">Address</div>
      		<p  className="description">
		  {property.address}
		</p>
      		<p  className="description">
		  {property.location}
		</p>
      		<p  className="description">
		  {property.city}  {property.state} {property.pincode}				</p>
	      </div>
	    </div>
	    
	    <div className="item">
	      <div className="content">
		<div className="name">Dimensions</div>
		<p  className="description">
		  {property.area}
		</p>
		<p  className="description">
		  {property.bedrooms}	
		  {property.type}
		</p>
	      </div>
	    </div>

	    <div className="item">
	      <div className="content">
		<div className="name">Lease Option</div>
		<p  className="description">
		  Rent {property.rent}
		</p>
		<p  className="description">
		  Deposit {property.deposit}
		</p>

	      </div>
	    </div>
	  </div>
	  <div className=" propertyAction">
	    <div className="ui black button" >List For Renting</div>
	    <div className="ui green button" >Lease History</div>
	    <div className="ui red button" >Rental History</div>
	    <div className="ui blue button" onClick={this.handleDelete}>Delete</div>
	  </div>
	</div>
      </div>
    );
  }
});

module.exports = PropertyShow;
