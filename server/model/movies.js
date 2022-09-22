var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var moviesSchema = new Schema();
var moviesSchema = new Schema({
      name: { type: String, required: true,},
      img: { type: String },
      genre: { type: String },
      age_rating: { type: Number },
      review_rating: { type: Number },
      language: { type: String },
      description: {type: String },

});

module.exports = mongoose.model('movies', moviesSchema);