var express = require("express");
var router = express.Router();
var Movies = require("../model/movies");
const { route } = require("./users");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

router.post("/api/movies", upload.single("img"), async (req, res, next) => {
  try {
  const result = await cloudinary.uploader.upload(req.file.path);

  let movie = new Movies({
    name: req.body.name,
    img: result.secure_url,
    cloudinary_id: result.public_id,
    genre: req.body.genre,
    age_rating: req.body.age_rating,
    review_rating: req.body.review_rating,
    language: req.body.language,
    description: req.body.description,
  });
  await movie.save();
    res.json(movie);
  } catch (err) {
    console.log(err);
  }
});



//post comment list that was posted for specific movie
router.post("/api/movies/:id/comments", function (req, res, next) {
  Movies.findById(req.params.id, function (err, movie) {
    if (err) {
      return res.status(500);
    }
    if (movie == null) {
      return res.status(404).json({ message: "movie not found" });
    }
    //var comment = new Comment(req.body);
    const comment = new Comment({
      movie_name: movie.name,
      title: req.body.title,
      comment: req.body.comment,
    });
    comment.save(function (err) {
      if (err) {
        return res.status(500);
      }
      console.log(
        "Comment '" + comment.comment + "' was posted for movie = " + movie.name
      );
    });
    movie.comments.push(comment);
    movie.save();
    console.log("comment:  ", comment.comment + " posted for ", movie.name);
    return res.status(201).json(comment);
  });
});

//get all comment from specific movie
router.get("/api/movies/:id/comments", function (req, res, next) {
  Movies.findOne({ _id: req.params.id })
    .populate("comments")
    .exec(function (err, movie) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(movie.comments);
      return res.status(200).send(movie.comments);
    });
});

 //Get all movies
router.get("/api/movies", function (req, res, next) {
  Movies.find(function (err, movie) {
    if (err) {
      return next(err);
    }

    res.json({ movies: movie });
  });
}); 

//Get movie by ID
router.get("/api/movies/:id", function (req, res, next) {
  var id = req.params.id;
  Movies.findById(id, function (err, movie) {
    if (err) {
      return next(err);
    }
    if (movie == null) {
      return res.status(404).json({ message: "movie not found" });
    }
    res.json(movie);
  });
});

//Get all movies of a certain genre
router.get("/api/movies/genres/:genre", function (req, res, next) {
  var Genre = req.params.genre;
  Movies.find({ genre: Genre.toString() }, function (err, movie) {
    if (err) {
      return next(err);
    }
    if (movie === null) {
      return res.status(404).json({ Message: "movie not found" });
    }
    res.json(movie);
  });
});

//Delete movie by ID
router.delete("/api/movies/:_id", function (req, res, next) {
  var id = req.params._id;
  Movies.findOneAndDelete({ _id: id }, function (err, movie) {
    if (err) {
      return next(err);
    }
    if (movie == null) {
      return res.status(404).json({ message: "movie not found" });
    }
    res.json(movie);
  });
});

//Delete all
router.delete("/api/movies/", function (req, res, next) {
  Movies.remove({}, function (err, movie) {
    if (err) {
      return next(err);
    }
    if (movie == null) {
      return res.status(404).json({ message: "movie not found" });
    }
    res.json(movie);
  });
});

//update movie contents
router.put("/api/movies/:id", function (req, res) {
  Movies.update(
    {
      name: req.params.name,
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
  );
});


router.patch("/api/movies/:id", (req, res) => {
Movies.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((movie) => {
    if (!movie) {
      return res.status(404).send();
    }
    res.status(201).send(movie);
    
  })
  .catch((error) => {
    res.status(500).send(error);
  });
});



module.exports = router;
