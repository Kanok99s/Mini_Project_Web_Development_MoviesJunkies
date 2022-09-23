var express = require('express');
var router = express.Router();
var Users = require('../model/users');

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
//Get all comments of the specific user 
// router.get('/api/users/:_id/comments', function (req, res, next) {
//     Comments.find(function (err, comments) {
//         if (err) { return next(err); }
//         res.json({ "comments": comments });
//     });
// });

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
//Delete sepcific comment of a specific person
// router.delete('/api/users/:user_id/comments/:comment_id', function (req, res, next) {
//     var id = req.params.comment_id;
//     Comments.findOneAndDelete(id, function (err, comments) {
//         if (err) { return next(err); }
//         if (comments == null) {
//             return res.status(404).json({ "message": "comment not found" });

//         } res.json({ "comments": comments });
//     });

// });

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

router.put("/api/users/:id", (req, res) => {
    var id = req.params.id;
    Users.findById(id, function (err, user) {
      if (err) {
        return res.status(500).send(err);
      }
      if (user == null) {
        return res.status(404).json({ message: "User not found" });
      }
      user.userName = req.body.userName;
      user.password = req.body.password;
      user.save();
      console.log("user updated");
      res.status(201).json(user);
    });
  });
  module.exports = router;