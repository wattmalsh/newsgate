var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

var ratingSchema = new mongoose.Schema({
	score: Number,
  type: String,
	algorithm: String
});

var urlSchema = new mongoose.Schema({
	url: String,
	rating: ratingSchema,
}, {timestamps: true});
/*
{
  url: String,
  rating: ratingSchema,
  createdAt: ISODate object,
  updatedAt: ISODate object
}
*/

module.exports = mongoose.model('News', urlSchema);
