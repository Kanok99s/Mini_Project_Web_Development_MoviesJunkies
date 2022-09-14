var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var watchlistSchema = new Schema({
    title: {
     type: String,
    
 },
    creator: { 
     type: String,
    }
});

module.exports = mongoose.model('watch_lists', watchlistSchema);

