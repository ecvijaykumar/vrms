/** @jsx React.DOM */
var React = require('react');
var DefaultLayout = React.createClass({
  render: function() {
    return(
      <html>
	<head>
	<meta charSet="utf-8"/>
	<meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	  <title>{this.props.title}</title>
	  <link rel="stylesheet" href="/dist/css/styles.min.css"/>
	  <link rel="stylesheet" href="/dist/css/trumbowyg.min.css"/>

	</head>
	<body>
	<div id="mainMenu"></div>
	<div id="mainContainer"></div> 
	<div id="extraTopic"></div> 
	<div id="mainTopic">
	{this.props.children}
	<script src="/dist/js/jquery.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.19.3/javascript/semantic.min.js"></script>
	<script src="/dist/js/app.min.js"/>
	<script src="/dist/js/trumbowyg.min.js"/>    

	</div>
	</body>
      </html>
    )
  }
});


module.exports = DefaultLayout;
