var express = require('express');
var router = express.Router();
var watchList = require('../model/watch_list')

const User = require('../model/users')
var movies = require('../model/movies');


//create list
router.post('/api/watch_lists', function (req, res, next) {
    var list = new watchList(req.body);
    list.save(function (err, list) {
        if (err) { return next(err); }
        res.status(201).json(list);
    });

});



router.get('/api/watch_lists', function (req, res, next) {
    watchList.find(function (err, list) {
        if (err) { return next(err); }
        res.json({ "watch_lists": list });
    });
});



//get list by id
router.get('/api/watch_lists/:_id', function(req, res, next) {
    var id = req.params._id;
    watchList.findById(id, function(err, list) {

        if (err) { return next(err); }
        if (list === null) {
            return res.status(404).json({'message': 'List not found!'});
        }
        res.json(list);
    });
});



//update a list attribute
router.patch("/api/watch_lists/:_id", async (req, res) => {
try {

    var _id = req.params._id;
    const updatList = await  watchList.findByIdAndUpdate(_id, req.body, {
        new:true
    });

   res.send(updatList);

} catch(err) {
res.status(404).send(err);

}
});


//delete all lists
router.delete('/api/watch_lists/', function (req, res, next) {
   watchList.remove({}, function (err, list) {
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
    watchList.findOneAndDelete({_id: id}, function(err, list) {
        if (err) { return next(err); }
        if (list === null) {
            return res.status(404).json({'message': 'List not found'});
        }
        res.json(list);
    });
});



//update request
router.put('/api/watch_lists/:_id', function (req, res, next) {
watchList.findByIdAndUpdate({id: req.params._id}, req.body).then(function() {
    watchList.findOne({ id:req.params.id}).then(function(list){
        res.send(list);
    });
});
});

//get a certain user's watchlists
router.get('/users/:_id/watch_lists', function(req, res, next) {
    var id = req.params._id;
    User.findById(id, function(err, list) {
        if (err) { return next(err); }
        if (list === null) {
            return res.status(404).json({'message': 'List not found!'});
        }
        res.json(list);
    });
});

//get a certain user's specific watchlist
router.get('/api/users/:_id/watch_lists/:_id', function(req, res, next) {
    var id = req.params._id;
    User.findById(id, function(err, list) {
        if (err) { return next(err); }
        if (list === null) {
            return res.status(404).json({'message': 'List not found!'});
        }
        res.json(list);
    });
});

//delete list by id
router.delete('/api/users/:_id/watch_lists/:_id', function(req, res, next) {
    var id = req.params._id;
    watchList.findOneAndDelete({_id: id}, function(err, list) {
        if (err) { return next(err); }
        if (list === null) {
            return res.status(404).json({'message': 'List not found'});
        }
        res.json(list);
    });
});


router.get('/api/watch_lists?sort=title:asc', function(req, res) {
    context.sort = req.query.sort;

    if(sort){    
        res.json(list.sort(function(e) {
            return sort == e.date;   //fix 
        }))
    } else {
        res.json(list);
    }
})
 
router.post('/api/watch_lists/:_id/movies/:_id' , function (req, res, next) {
    var list = new watchList(req.body);
    list.save(function (err, list) {
        if (err) { return next(err); }
        res.status(201).json(list);
    });

});


module.exports = router;