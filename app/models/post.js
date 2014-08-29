var models = require('./models'),
	Schema = models.Schema;

var postSchema = Schema({
	content : 'string',
	user : {
		type : Schema.Types.ObjectId,
		ref : 'user'
	}
});

var Post = models.model('post', postSchema);

module.exports = Post;