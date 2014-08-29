var Post = require('../models/post'),
	User = require('../models/user'),
	_ = require('underscore');
var homeController = function(server,users,sessionStore){
	console.log('homeController esta cargado Master!');
	server.set('authorization', function (data, accept) {
		if (!data.headers.cookie) {
		    return accept('Session cookie required.', false);
		}
		data.cookie = require('cookie').parseCookie(data.headers.cookie);
		  /* NOTE: Next, verify the signature of the session cookie. */
		data.cookie = require('cookie').parseSignedCookies(data.cookie, SITE_SECRET);
		 
		  /* NOTE: save ourselves a copy of the sessionID. */
		data.sessionID = data.cookie['express.sid'];
		  /* NOTE: get the associated session for this ID. If it doesn't exist,
		   *       then bail. */
		sessionStore.get(data.sessionID, function(err, session){
			if (err) {
		    	return accept('Error in session store.', false);
		    } else if (!session) {
		    	return accept('Session not found.', false);
		    }
		    // success! we're authenticated with a known session.
		    data.session = session;
		    return accept(null, true);
 		});
	});
	var isntLoggedIn = function (req, res, next){
		if(!req.session.user){
			req.emit('auth',{
				auth: "dennied"
			});
			return;
		}

		next();
	};
	var getUser = function (req, res, next) {
		User.findOne({username: req.session.user.username,password: req.session.user.pasword},
		function(err, user){
			req.user = user;

			next();
		});
	};
	server.on('connection', function(req){
		console.log('I have a new Client Master!');
		req.on('ready', function(){
			console.log('ClientID: ' + req.id);
			console.log('This client is ready for you Master!');
			console.log('ClientID: ' + req.id);
			req.emit('welcome',{auth:'require'});
			console.log('Send auth request!');
			console.log('ClientID: ' + req.id);
		});
		req.on('auth', isntLoggedIn,function(data){
			console.log('Master, a client has send AUTH');
			console.log(data);
			console.log('ClientID: ' + req.id);
			User.findOne({username: data.AUTH_ID, password: data.AUTH_PASS},
				function(err, user){
					if(err){

					}else{
						req.session.user = user;
						req.session.token = req.id;
						req.emit('auth',{
							auth: "success",
							token: req.id
						});
					}
			});
			;
			console.log('Send Autorization to client Master!');
			console.log('ClientID: ' + req.id);
		});
		req.on('timeline', function(data){
			console.log("The client require timeline Master!");
			console.log('ClientID: ' + req.id);
			req.emit('timeline', [{
				"name": "Luis_N",
				"state": "Fucking debugger"
			},{
				"name": "Luis_N",
				"state": "Puls es colosal"
			},{
				"name": "Luis_N",
				"state": "Proto de Updates OK ;)"
			}]);
			console.log("Send timeline to Client!");
		});
		req.on('disconnect',function(){
			console.log('The client has leave Master!');
			console.log('ClientID: ' + req.id);
		});
	});
};
module.exports = homeController;