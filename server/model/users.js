var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var userSchema = new Schema({
    userName: { type: String },
    email: { type: String},
    password: { type: String },
    comment: [{ type: Schema.Types.ObjectId, ref: "comments" }],
    watch_lists: [{ type: Schema.Types.ObjectId, 
        ref: "watch_lists" }]
});

module.exports = mongoose.model('users', userSchema);
