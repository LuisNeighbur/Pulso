var homeController = function(server,users){
	console.log('homeController esta cargado Master!');
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
		req.on('auth', function(data){
			console.log('Master, a client has send AUTH');
			console.log(data);
			console.log('ClientID: ' + req.id);
			req.emit('auth',{
				auth: "success",
				token: req.id
			});
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