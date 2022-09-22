var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    users: { type: Schema.Types.ObjectId, ref: "users" },
    content: { type: String },
    dislike_number: { type: Number },
    like_number: { type: Number },


});

module.exports = mongoose.model('comments', commentsSchema);