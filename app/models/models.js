var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/' + 'puls');
module.exports = mongoose;