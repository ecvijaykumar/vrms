var React = require('react/addons');

var DropDown = React.createClass({
  componentDidMount: function() {
    $('.ui.selection.dropdown').dropdown();
  },
    getValue: function() {
	var key = this.refs.text.getDOMNode().value;
	if (this.props.items) {
	    return this.props.items[key];
	}
	return key;	
    },

  render: function() {
      var items = [];
      if (this.props.items) {
	  var items = this.props.items.map(function(item, i) {
	      return(
		      <div key={i} className="item" data-value={i}>{item}</div>
	      );
	  });
      } else if (this.props.max) {

	  for (var i = 1; i < this.props.max; i++) {
	      var s = i.toString() + " - " + this.props.name;
	      items.push(<div key={i} className="item" data-value={i}>{s}</div>);
	  }
      } else {
	  return (<div></div>);
      }

    return(
      <div className="field">
	<label>{this.props.label}</label>
	<div className="ui dropdown selection " tabIndex="0">
	  <input type="hidden"   ref="text"/>
	  <div className="default text">{this.props.name}</div>
	  <i className="dropdown icon"></i>
	  <div className="menu ">
	    {items}
	  </div>
	</div>
      </div>
    );
  }
});

module.exports = DropDown;
