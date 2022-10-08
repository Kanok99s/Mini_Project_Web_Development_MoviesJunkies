var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movies = require('../model/movies');


var watchlistSchema = new Schema({
    title: {
     type: String,
    
 },
movies : [ 
    {
    type: Schema.Types.ObjectId, ref: "movies"
    }
  ],
 
    user: { 
     type: Schema.Types.ObjectId, ref: "users"
    }
});

module.exports = mongoose.model('watch_lists', watchlistSchema);
const sortableColumns = ['title', 'movies'];
