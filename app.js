// DECLARATION
var express = require('express');
var app = express();
var port = 1337;
var bodyParser = require('body-parser');
var expressSession = require('express-session');


var login = require('./controllers/login');
var logout = require('./controllers/logout');
//var home = require('./controllers/home');
var admin = require('./controllers/admin');
var projectmanager = require('./controllers/projectmanager');


// CONFIGURATION
app.set('view engine', 'ejs');


// MIDDLEWARES
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressSession({secret: 'my top secret pass', saveUninitialized: true, resave: false}));

app.use('*', function(req, res, next){
	if(req.originalUrl == '/login' || req.originalUrl == '/logout')
	{
		next();
	}
	else
	{
		if(!req.session.user)
		{
			res.redirect('/login');
			return;
		}
		next();
	}
});

// ROUTES
app.use('/login', login);
app.use('/logout', logout);
//app.use('/home', home);
app.use('/admin', admin);
app.use('/projectmanager', projectmanager);

app.get('/', function(req, res){
	console.log(req.session);
	req.session.name = 'ABCD';
	res.send('Value set');
});


// SERVER START
app.listen(port, function(){
	console.log('Server started successfully ...');
});