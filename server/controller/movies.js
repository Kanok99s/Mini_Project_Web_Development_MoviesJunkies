var express = require('express');
var router = express.Router();
var Movies = require('../model/movies');

//creating new movies
router.post('/api/movies', function (req, res, next) {
      var movie = new Movies(req.body);
      movie.save(function (err, movie) {
            if (err) { return next(err); }
            res.status(201).json(movie);
      })
});


//Get all movies
router.get('/api/moives', function (req, res, next) {
      Movies.find(function (err, movie) {
            if (err) { return next(err); }
            res.json({ "movies": movie });
      });
});


//Get movie by ID
router.get('/api/movies/:_id', function (req, res, next) {
      var id = req.params._id;
      Movies.findById(id, function (err, movie) {
            if (err) { return next(err); }
            if (movie == null) {
                  return res.status(404).json({ "message": "movie not found" });
            }
            res.json(movie);
      });
});

//Delete movie by ID
router.delete('/api/movies/:_id', function (req, res, next) {
      var id = req.params._id;
      Movies.findOneAndDelete({ _id: id }, function (err, movie) {
            if (err) { return next(err); }
            if (movie == null) {
                  return res.status(404).json({ "message": "movie not found" });
            }
            res.json(movies);
      });
});


//Delete all
router.delete('/api/movies/', function (req, res, next) {
      Movies.remove({}, function (err, movie) {
            if (err) { return next(err); }
            if (user == null) {
                  return res.status(404).json({ "message": "movie not found" });
            }
            res.json(movie);
      });
});


//update movie contents
router.put('/api/movies/_:id', function (req, res) {
      Movies.update(
            {
                  name: req.params.name
            },
            { genre: req.body.genre },
            { age_rating: req.body.age_rating },
            { review_rating: req.body.review_rating },
            { language: req.body.language },
            { description: req.body.description },
            { overwrite: true },
            function (err) {
                  if (!err) {
                        res.send("Successfully updated movie's details.");
                  }
            }
      )
});


//patch updates
router.patch('/api/movies/:_id', function (req, res, next) {
      var id = req.params._id;
      Movies.findById(id, function (err, comments) {
            if (err) {
                  return next(err);
            }
            if (movies == null) {
                  return res.status(404).json({ "message": "movie not found" });
            }
            movies.name = (req.body.name || movies.name);
            movies.genre = (req.body.genre || movies.genre);
            movies.age_rating = (req.body.age_rating || movies.age_rating);
            movies.review_rating = (req.body.review_rating || movies.review_rating);
            movies.language = (req.body.language || movies.language);
            movies.description = (req.body.description || movies.description);


            comments.save();
            res.json(comments);

      });
});

module.exports = router;
