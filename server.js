/**
 * Created by vijaye on 9/22/2014.
 */

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes');
var owner = require('./lib/owner.js');
var user = require('./lib/user.js');

var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

//var db = require('../producers/db.js');


//TODOO
/* Blogs untested

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/vtest');

//Routes that end in /blogs           
router.route('/blogs')
//Get all the blogs
  .get(function(req, res){
    console.log("In get /blogs");
    var db = req.db;
    var collection = db.get('blogs');
    collection.find({}, {}, function(e, docs){
      if (e) {
        console.log("Error " + e);
        return;
      }
      res.send(docs);
    });
  })
// Create a blog
  .post(function(req, res){
    console.log("In Post /blogs");
    var db = req.db;
    var collection = db.get('blogs');
    var blog = req.body;
    console.log("Create " + blog);
    collection.insert(blog, function(err, doc){
      if(err) {
        res.send("Error inserting into database");
        return;
      }
      res.send(blog);
    });
  });

    
// Routes that end in /blogs/:id
router.route('/blogs/:id')
  .get(function(req, res, next) {
    console.log("In get");
  })
  .delete(function(req, res, next) {
    var db = req.db;
    var collection = db.get('blogs');
    var blog = req.params;
    collection.remove({_id: blog.id} , function(err, doc){
      if(err) {
	res.send("Error inserting into database");
	return;
      }
      res.send("OK");
    });  
  });


*/
// create the Express application
var app = express();

//all environments
app.set('views', __dirname + '/views');

// Use react-views as rendering engine
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());



app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());


app.use(expressSession({secret: 'netapp1!',
                        resave: false, // don't save session if unmodified
                        saveUninitialized: false //don't create session until something is stored
                       }));
app.use(cookieParser());

//Session-persisted message middleware

app.use(function(req, res, next){
  delete req.session.error;
  delete req.session.success;
  next();
});


function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

// Create the Express router
var router = express.Router();

// all requests to this router will first hit this middleware
router.use(function(req, res, next){
    // log each request to the console
    console.log("%s %s %s \n", req.method, req.path, req.url);
    // continue doing what we were doing and go to the route
    next();
});


// home page route

router.get('/', routes.index);


router.route('/signup')
  .post(function(req, res) {
      console.log(req.body);
    // job for mongo.
    user.signup(req.body)
      .then(function(status) {
	  console.log("Signup response");
	  res.send({result: status});
      })
      .catch(function(err){
	  res.status(500).send({err:err})
      })    
  });


router.route('/login')
  .post(function(req, res) {
      user.authenticate(req.body.email, req.body.password)
	  .then(function(username) {
	      //TODO: record login time for analytics
	      res.send({userName: username});
	  })
	  .catch(function(err) {
	      res.status(500).send({err:err})
	  })
  });

router.route('/logout')
  .post(function(req, res) {
      // TOOD: Delete session, mark logout time for analytics
      res.send({result: "Logout success"});

  });



router.route('/property')
    .post(function(req, res) {
	owner.addProperty(req.body)
	.then(function(str){
	    res.send({ result: str})
	})
	.catch(function(err){
	    res.status(500).send({err: err})
	});	
    })
    .get(function(req, res) {
	console.log(req.query);
	console.log("Calling get properties");
	owner.getProperties(req.query)
	    .then(function(data){
		res.send(data)
	    })
	    .catch(function(err) {
		res.status(500).send({err: err})
	    })
    });
    
router.route('/property/:id')
    .delete(function(req, res) {
	console.log("Delete Request");
	owner.deleteProperty(req.params.id)
	.then(function(data){
	    res.send( {result: data})
	})
	.catch(function(err){
	    res.status(500).send({err: err})
	});
    });    




// apply the routes to our application
app.use('/', router);




// Start the server
var port = process.argv[2] || 3000;
    var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});

    
