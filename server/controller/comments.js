var express = require('express');
var router = express.Router();
var Comments = require('../model/comments');

//creating new comments
router.post('/api/comments', function (req, res, next) {
    var comments = new Comments(req.body);
    comments.save(function (err, comments) {
        if (err) { return next(err); }
        res.status(201).json(comments);
    })
});
//Get all comments 
router.get('/api/comments', function (req, res, next) {
    Comments.find(function (err, comments) {
        if (err) { return next(err); }
        res.json({ "comments": comments });
    });
});
//Get comments by ID
router.get('/api/comments/:_id',function(req,res,next){
    var id = req.params._id;
    Comments.findById(id,function(err,comments){
        if(err){
            return next(err);
        }
        res.json({"comments":comments})
    });
});
//Delete all
router.delete('/api/comments',function(req,res,next){
    Comments.deleteMany({},function(err,comments){
        if(err){
            return next(err);
        }
        if(comments==null){
            return res.status(404).json({"message":"Comment not found"});
        }
        res.json(comments);
    });

});
//using patch function

router.patch('/api/comments/:_id',function(req,res,next){
    var id = req.params._id;
    Comments.findById(id,function(err,comments){
        if(err){
            return next(err);
        }
        if(comments == null){
            return res.status(404).json({"message":"comment not found"});
        }
        comments.userName = (req.body.userName || comments.userName);
        comments.content = (req.body.content  || comments.content);
        comments.dislike_number = (req.body.dislike_number ||  comments.dislike_number);
        comments.like_number = (req.body.like_number || comments.like_number);

        comments.save();
        res.json(comments);

    });
});