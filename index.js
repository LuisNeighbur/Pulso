var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var RedisStore = require('connect-redis')(express);
var swig = require('swig'),
	_ = require('underscore');
var users = [];

swig.setDefaults({
	cache : false
});
// View engine
app.engine('html', swig.renderFile );
app.set('view engine', 'html');
app.set('views', './app/views');
var sessionStore = new RedisStore({});
// Add post, cookie and session support
app.configure(function(){
	app.use( express.static('./public') );

	
	app.use( express.logger() );
	app.use( express.cookieParser() );
	app.use( express.bodyParser() );
	app.use( express.session({
		secret : "lolcatz",
		store  : sessionStore
		// store  : new RedisStore({
		//	host : conf.redis.host,
		//	port : conf.redis.port,
		//	user : conf.redis.user,
		//	pass : conf.redis.pass
		// });	
	}) );
	/*app.use(passport.initialize());
	app.use(passport.session());*/
});

var homeController = require('./app/controllers/home');
homeController(io, users,sessionStore);


server.listen(80);
console.log("I'm has listening my master!");