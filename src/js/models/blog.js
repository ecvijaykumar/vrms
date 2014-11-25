var Backbone = require('Backbone');
var $ = require('jquery');
Backbone.$ = $;

// Models for top level view - App
var MBlog = Backbone.Model.extend({ 
  urlRoot: '/blogs',
  idAttribute: "_id"
});

var CBlog = Backbone.Collection.extend({
  model: MBlog,
  url: '/blogs'
});

var cBlogs = new CBlog();
