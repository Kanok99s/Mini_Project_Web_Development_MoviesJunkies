var express = require('express');
var router = express.Router();
var watchList = require('../model/watch_list')



//create list
router.post('/api/watch_list', function (req, res, next) {
    var list = new watchList(req.body);
    list.save(function (err, list) {
        if (err) { return next(err); }
        res.status(201).json(list);
    });

});


//delete list by id
router.delete('/api/watch_list/:id', function(req, res, next) {
    var id = req.params.id;
    watchList.findOneAndDelete({_id: id}, function(err, list) {
        if (err) { return next(err); }
        if (list === null) {
            return res.status(404).json({'message': 'List not found'});
        }
        res.json(list);
    });
});


router.get('/api/watch_list', function (req, res, next) {
    watchList.find(function (err, user) {
        if (err) { return next(err); }
        res.json({ "users": user });
    });
});



//get list by id
router.get('/api/watch_list/:id', function(req, res, next) {
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
router.patch("/api/watch_list/:id", async (req, res) => {
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


//delete request
router.delete('/api/watch_list/:id', (req, res) => {

    const { id } = req.params;
    const deleteList = watchList.find(list => list.id == id)
  if(deleteList){
    watchList = watchList.filter(list => list.id !== id);
  } else {
    res.status(404).json({ massage: "List you are looking for doesn't exist" })
  }
      
});



//update request
router.put('/watch_list/:id', function (req, res) {
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