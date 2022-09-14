var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: { type: String },
    password: { type: Number }
});

module.exports = mongoose.model('users', userSchema);
