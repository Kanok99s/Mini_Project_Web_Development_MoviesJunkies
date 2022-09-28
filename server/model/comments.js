var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    users: { type: Schema.Types.ObjectId, ref: "users" },
    content: { type: String },
    dislike_number: { type: Number, default: 0},
    like_number: { type: Number, default: 0 },


});

module.exports = mongoose.model('comments', commentsSchema);