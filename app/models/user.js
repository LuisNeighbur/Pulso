var models = require('./models'),
	Schema = models.Schema;

var userSchema = Schema({
	username : 'string',
	password  : 'string'
});

var User = models.model('user', userSchema);

module.exports = User;