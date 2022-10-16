var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var moviesSchema = new Schema();
var moviesSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String },
  cloudinary_id: { type: String },
  genre: { type: String },
  age_rating: { type: Number },
  review_rating: { type: Number },
  language: { type: String },
  description: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
});

module.exports = mongoose.model("movies", moviesSchema);
