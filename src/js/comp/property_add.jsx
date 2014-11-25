var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var Input = require('./input');
var TextAreaWithLabel = require('./text_area');
var DropDown = require('./drop_down');
var validationRules = require('../lib/validation');

var PropertyActions = require('../actions/property_actions');
var _ = require('underscore');

var PropertyAdd = React.createClass({
  getInitialState: function() {
    return {
      type: ["Apartment", "Independent House", "Villa"],
      city: ["Hyderabad", "Secunderabad", "Bengaluru", "Chennai"],
      states: ["Telangana", "Andhra Pradesh", "Karnataka", "Tamil Nadu"],
      parking: ["Covered Car", "Open Car", "Covered Bike", "Open Bike", "Not Available"],
      water: ["24x7", "Limited"],
      security: ["Watchman", "Gated", "None"],
      furnishing: ["Unfurnished", "Furnished"],
      lift: ["Lift", "Stairs Only"],
      rooms: 10,
      floors: 25	    
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
    console.log("Property Add");
      
      var fields = ["address1", "address2", "location", "city", "state", 
		    "pincode", "floor", "bedrooms", "bathrooms", "area", 
		    "parking", "water", "security", "furnished", "lift", "type"];
    var info = {};
     _.each(fields, function(field) {
	 info[field] = this.refs[field].getValue();
     }.bind(this));
    info["owner"] = "vijay", // TODO: for quick testing
    PropertyActions.add(info);
  },
  
  render: function() {


    return(
      <div className="ui page grid">
	<div className="column">
	  <form className="ui form segment" onSubmit={this.handleSubmit}>
	    <div className="ui form segment">
	    <h4 className="ui left floated header">Address</h4>
	    <DropDown label="Type"  ref="type" name="type" items={this.state.type}/>
	    <Input label="Apartment or Society Name" ref="address1" placeholder="Apartment Name"  />
	    <Input label="Address1" ref="address2" placeholder="House Number, Street"  />

	    <div className="four fields">
	      <Input label="Locality" ref="location" placeholder="Locality Eg:Ameerpet"  />
	      <DropDown label="City" ref="city" name="City"items={this.state.city}  />
	      <DropDown label="State" ref="state" name="State"items={this.state.states}  />
	      <Input label="Pin Code" ref="pincode" placeholder="Pincode" />
	    </div>
	    </div>


	    <div className="ui  form segment">
	      <h4 className="ui left floated header">Details</h4>
	      <div className="four fields">
    	        <DropDown label="Floor"  ref="floor" name="floor" max={this.state.floors}/>
		<DropDown label="Bedrooms"  ref="bedrooms" name="bedrooms" max={this.state.rooms}/>
	        <DropDown label="Bathrooms"  ref="bathrooms" name="bathrooms" max={this.state.rooms}/>
		<Input label="Square Footage" ref="area" placeholder="Built up area in sqft" />
	      </div>
	    </div>
	    <div className="ui form segment">
	      <h4 className="ui left floated header">Amenities</h4>
    	      <div className="five  fields">	    
		<DropDown label="Parking Space"  ref="parking" name="Parking" items={this.state.parking}/>
		<DropDown label="Water Supply"  ref="water" name="Water" items={this.state.water}/>
		<DropDown label="Security"  ref="security" name="Security" items={this.state.security}/>
		<DropDown label="Furnished"  ref="furnished" name="Furnished" items={this.state.furnishing}/>
		<DropDown label="Lift"  ref="lift" name="Lift Facility" items={this.state.lift}/>
	      </div>
	    </div>	    
	    
	    <input type="submit" className="ui teal submit button" value="Submit"/>

	  </form>
	</div>
      </div>
      
    );
  }
});

//<Checkbox label="Lift Facility"  ref="lift" name="lift"/>
      module.exports = PropertyAdd;
