"use strict";
// Modules =================================================
var express          = require('express');
var app              = express();
var bodyParser       = require('body-parser');
var mongoose         = require('mongoose'); 
var session          = require('express-session');
var morgan           = require('morgan');
var passport         = require('passport');

// Required files ==========================================
var applicantCtrl    = require('./app/controllers/applicantCtrl');
var datePickCtrl    = require('./app/controllers/datePickCtrl');
var configDB         = require('./config/database.js');

var configPP  = require('./app/middleware/passport'); // pass passport for configuration
configPP.fireUpPassport();


// Configuration ===========================================
var port = process.env.PORT || 8080; // set our port

mongoose.connect(configDB.url); // connect to our database

var connection = mongoose.connection;
connection.once('open', function(){
	console.log('Successfully connected to: ' + configDB.url)
});

// Express application middleware
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // get information from html forms

app.use(session({ 
	secret: 'ilovelindsay', //session cookie is signed with this secret to prevent tampering
	resave: true, //forces session to be saved even when unmodified
	saveUninitialized: true //forces a session that is "uninitialized" to be saved to the store.
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(express.static(__dirname + '/public')); // set the static files location


// Routes ==================================================
//Applicant
// app.get('/applicants/:id', authCtrl.isAuthenticated, applicantCtrl.getApplicant);

//signup API endpoint
app.post('/api/applicants', applicantCtrl.postApplicant);
//login API endpoint
app.post('/api/auth', configPP.authenticateUser);
//logout API endpoint
app.post('/api/unauth', configPP.unauthUser);

//edit Application Date
app.put('/api/user/:id', configPP.requireAuth, applicantCtrl.editApplicant);

app.get('/api/user', configPP.requireAuth, function(req, res) {
  return res.json(req.user);
});

//Appointment Date
app.get('/api/getDate', datePickCtrl.getDate);

app.post('/api/setDate', datePickCtrl.setDate);



// Start app ===============================================
app.listen(port, function(){
	console.log('Magic happens on port ' + port);
});

