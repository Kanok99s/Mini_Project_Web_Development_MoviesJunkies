var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
  // movie: { type: Schema.Types.ObjectId, ref: "movies" },
  movie_name: { type: String },
  title: { type: String },
  comment: { type: String },
  rating: { type: Number }
});

module.exports = mongoose.model("comments", commentsSchema);
