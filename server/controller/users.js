var express = require('express');
const users = require('../model/users');
var router = express.Router();
var Users = require('../model/users');
var Comment = require("../model/comments");

//creating new users
router.post('/api/users', function (req, res, next) {
    var user = new Users(req.body);
    user.save(function (err, user) {
        if (err) { return next(err); }
        res.status(201).json(user);
    })
});
//Get all users 
router.get('/api/users', function (req, res, next) {
    Users.find(function (err, user) {
        if (err) { return next(err); }
        res.json({ "users": user });
    });
});
//Get user by ID
router.get('/api/users/:_id', function (req, res, next) {
    var id = req.params._id;
    Users.findById(id, function (err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "user not found" });
        }
        res.json(user);
    });
});
//Delete by ID
router.delete('/api/users/:_id', function (req, res, next) {
    var id = req.params._id;
    Users.findOneAndDelete({ _id: id }, function (err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "user not found" });
        }
        res.json(user);
    });
});
//Delete all
router.delete('/api/users/', function (req, res, next) {
    Users.remove({}, function (err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "user not found" });
        }
        res.json(user);
    });
});




//post comment by specific user
router.post("/api/users/:id/comments", function (req, res, next) {
    Users.findById(req.params.id, function (err, user) {
    if (err) {
        return res.status(500);
    }
    if (user == null) {
        return res.status(404).json({ message: "user not found" });
    }
    var comment = new Comment(req.body);
    comment.save(function (err) {
        if (err) {
        return res.status(500);
        }
        console.log("Comment '"  + comment.content + "' was posted.");
    });
    user.comment.push(comment);
    user.save();
    console.log("comment:  ", comment.content + " posted by ", user.userName,);
    return res.status(201).json(user);
    });
});


//get comment list that was posted by specific user 
router.get("/api/users/:id/comments", function (req, res, next) {
    Users.findOne({ _id: req.params.id })
    .populate("comments")
    .exec(function (err, user) {
        if (err) {
        return res.status(500).send(err);
        }
        console.log(user.comment);
        return res.status(200).send(user.comment);
    });
});


module.exports = router;
