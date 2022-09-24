var express = require('express');
var router = express.Router();
var WatchList = require('../model/watch_list')

const User = require('../model/users')
var Movies = require('../model/movies');


//create list
router.post('/api/watch_lists', function (req, res, next) {
    var list = new WatchList(req.body);
    list.save(function (err, list) {
        if (err) { return next(err); }
        res.status(201).json(list);
    });

});



router.get('/api/watch_lists', function (req, res, next) {
    WatchList.find(function (err, list) {
        if (err) { return next(err); }
        res.json({ "watch_lists": list });
    });
});



//get list by id
router.get('/api/watch_lists/:_id', function(req, res, next) {
    var id = req.params._id;
    WatchList.findById(id, function(err, list) {

        if (err) { return next(err); }
        if (list === null) {
            return res.status(404).json({'message': 'List not found!'});
        }
        res.json(list);
    });
});



//update a list 
router.patch("/api/watch_lists/:_id", async (req, res) => {
try {

    var _id = req.params._id;
    const updatList = await  WatchList.findByIdAndUpdate(_id, req.body, {
        new:true
    });

   res.send(updatList);

} catch(err) {
res.status(404).send(err);

}
});


//delete all lists
router.delete('/api/watch_lists/', function (req, res, next) {
   WatchList.remove({}, function (err, list) {
        if (err) { return next(err); }
        if (list == null) {
            return res.status(404).json({ "message": "no lists found" });
        }
        res.json(list);
    });
});


//delete list by id
router.delete('/api/watch_lists/:_id', function(req, res, next) {
    var id = req.params._id;
    WatchList.findOneAndDelete({_id: id}, function(err, list) {
        if (err) { return next(err); }
        if (list === null) {
            return res.status(404).json({'message': 'List not found'});
        }
        res.json(list);
    });
});



//update watchlist in db
router.put('/api/watch_lists/:id', function (req, res, next) {
WatchList.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
WatchList.findOne({ _id: req.params.id}).then(function(list) {

    res.json(list);
});
  
    });
});


router.get('/api/watch_lists?sort=-title,createdOn', function (req, res, next) {
    WatchList.find(function (err, list) {
        if (err) {
            return next(err);
        }
        list.sort((a, b) => (a.Points < b.Points) ? 1 : -1);
        res.json({ "watch_lists": list });


    });
});

 
/* router.patch('/api/watch_lists/:list_id/movies/:movie_id' ,
 function (req, res, next) {

}); */


// get all movies in the list
router.get('/api/watch_lists/:_id/movies' , function (req, res, next) {
    
    WatchList.findOne({ _id: req.params._id })
    .populate("movies") .exec(function (err, list) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(list.movies);
      return res.status(200).send(list.movies);
    });
});

//get specific movie from list
router.get('/api/watch_lists/:list_id/movies/:mov_id' , function (req, res, next) {   
    WatchList.findOne({ _id: req.params.list_id }).populate("movies", {
      match: { _id: { $ne: req.params.mov_id } },
    }) .exec(function (err, list) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(list.movies);
      return res.status(200).send(list.movies);
    });
});
    


module.exports = router;