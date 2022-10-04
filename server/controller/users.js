var express = require('express');
const users = require('../model/users');
var router = express.Router();
var Users = require('../model/users');
var Comment = require("../model/comments");
var WatchLists = require('../model/watch_list');

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
// Login
router.post('/api/users/login', (req, res, next) => {
    Users.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).json({
        title: 'server error',
        error: err
      })
      if (!user) {
        return res.status(401).json({
          title: 'user not found',
          error: 'invalid credentials'
        })
      }
      //incorrect password
      if (req.body.password != user.password) {
        return res.status(401).json({
          tite: 'login failed',
          error: 'invalid credentials'
        })
      }
      //IF ALL IS GOOD send to frontend
      try {
      return res.status(200).json({
        title: 'login sucess',
      })
    } 
    catch (err) {
      return res.status(400).json({
        title: 'error',
        error: 'Unable To Login'
      })
    }
    })
  })

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

//create list by a user
router.post('/api/users/:_id/watch_lists', function(req, res, next) {
    Users.findById(req.params._id, function (err, user) {
        if (err) {
            return res.status(500);
        }
        if (user == null) {
            return res.status(404).json({ message: "user is not found!" });
        }
        var list = new WatchLists(req.body);
        list.save(function (err) {
            if (err) {
            return res.status(500);
            }
        });
        user.watch_lists.push(list);
        user.save();
        return res.status(201).json(user);
        });
    });
    

//get a certain user's watchlists
router.get('/api/users/:_id/watch_lists', function(req, res, next) {
    WatchLists.find(function (err, list) {
        if (err) { return next(err); }
        res.json({ "watch_lists": list });
    });
});

   

//get a user's certain watch_list
router.get('/api/users/:user_id/watch_lists/:list_id', function(req, res, next) {
    var id = req.params.list_id;
   WatchLists.findById(id, function (err, list) {
        if (err) { return next(err); }
        if (list == null) {
            return res.status(404).json({ "message": "List not found" });

        } res.json({ "watch_lists": list });
    });

});


    //delete list by id
router.delete('/api/users/:user_id/watch_lists/:list_id', function(req, res, next) {
    var id = req.params.list_id;
    WatchLists.findOneAndDelete(id, function (err, list) {
        if (err) { return next(err); }
        if (list == null) {
            return res.status(404).json({ "message": "list not found" });

        } res.json({ "watch_lists": list });
    });

});

  module.exports = router;