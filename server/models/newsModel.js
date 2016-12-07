var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
	url: String,
	rating: ratingSchema
});

var ratingSchema = new Schema({
	score: Number,
	algorigthm: String
});

module.exports = mongoose.model('News', urlSchema);