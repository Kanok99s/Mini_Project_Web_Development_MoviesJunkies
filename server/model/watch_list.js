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
     type: String,
    }
});

module.exports = mongoose.model('watch_lists', watchlistSchema);
const sortableColumns = ['title', 'movies'];
