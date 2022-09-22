var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movies = require('../model/movies');


var watchlistSchema = new Schema({
    title: {
     type: String,
    
 },
movies : [ 
    {
        name: { type: String },
    },
  ],
 
    creator: { 
     type: Schema.Types.ObjectId, ref: "users"
    }
});

module.exports = mongoose.model('watch_lists', watchlistSchema);
const sortableColumns = ['title', 'movies'];
