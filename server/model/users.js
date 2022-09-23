var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var userSchema = new Schema({
    userName: { type: String },
    password: { type: Number },
    comment: [{ type: Schema.Types.ObjectId, ref: "comments" }]
});

module.exports = mongoose.model('users', userSchema);
