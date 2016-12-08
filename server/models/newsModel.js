var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

var ratingSchema = new mongoose.Schema({
	score: Number,
	algorithm: String
});

var urlSchema = new mongoose.Schema({
	url: String,
	rating: ratingSchema
});

module.exports = mongoose.model('News', urlSchema);
