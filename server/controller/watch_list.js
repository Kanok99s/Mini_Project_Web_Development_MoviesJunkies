var express = require('express');
var router = express.Router();
var watchList = require('../model/watch_list')



//create list
router.post('/api/watch_lists', function (req, res, next) {
    var list = new watchList(req.body);
    list.save(function (err, list) {
        if (err) { return next(err); }
        res.status(201).json(list);
    });

});


//delete list by id
router.delete('/api/watch_lists/:id', function(req, res, next) {
    var id = req.params.id;
    watchList.findOneAndDelete({_id: id}, function(err, list) {
        if (err) { return next(err); }
        if (list === null) {
            return res.status(404).json({'message': 'List not found'});
        }
        res.json(list);
    });
});


router.get('/api/watch_lists', function (req, res, next) {
    watchList.find(function (err, list) {
        if (err) { return next(err); }
        res.json({ "watch_lists": list });
    });
});



//get list by id
router.get('/api/watch_lists/:id', function(req, res, next) {
    var id = req.params.id;
    watchList.findById(id, function(err, list) {

        if (err) { return next(err); }
        if (list === null) {
            return res.status(404).json({'message': 'List not found!'});
        }
        res.json(list);
    });
});



//update a list attribute
router.patch("/api/watch_lists/:id", async (req, res) => {
try {

    var _id = req.params.id;
    const updatList = await  watchList.findByIdAndUpdate(_id, req.body, {
        new:true
    });

   res.send(updatList);

} catch(err) {
res.status(404).send(err);

}
})



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




//update request
router.put('/watch_lists/:id', function (req, res) {
watchList.update(
{
    title:  req.params.title},
    {  title: req.body. title},
    { listArray: req.body. listArray},
    { overwrite: true},
    function(err){
        if(!err){
            res.send("Successfully updated list.");
        }
    }
)
});



module.exports = router;