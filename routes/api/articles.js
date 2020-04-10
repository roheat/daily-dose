const router = require("express").Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Article = mongoose.model("Article");
const User = mongoose.model("User");
const auth = require("../auth");

// Create
router.post("/", auth.required, function(req, res, next) {
  User.findById(req.payload.id)
    .then(function(user) {
      if (!user) return res.sendStatus(401);

      const article = new Article(req.body.article);

      article.author = user;

      return article.save().then(function() {
        return res.json({ article: article.toJSONFor(user) });
      });
    })
    .catch(next);
});

router.param("article", function(req, res, next, slug) {
  Article.findOne({ slug })
    .populate("author")
    .then(function(article) {
      if (!article) return res.sendStatus(404);

      req.article = article;

      return next();
    })
    .catch(next);
});

// Read
router.get("/:article", function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.article.populate("author").execPopulate()
  ])
    .then(function(results) {
      const user = results[0];

      return res.json({ article: req.article.toJSONFor(user) });
    })
    .catch(next);
});

// Update
router.put("/:article", auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user) {
    if (req.article.author._id.toString() === req.payload.id.toString()) {
      console.log("body", req.body);
      const { title, description, body, tagList } = req.body.article;
      if (typeof title !== "undefined") req.article.title = title;
      if (typeof description !== "undefined")
        req.article.description = description;
      if (typeof body !== "undefined") req.article.body = body;
      if (typeof tagList !== "undefined") req.article.tagList = tagList;

      req.article
        .save()
        .then(function(article) {
          return res.json({ article: article.toJSONFor(user) });
        })
        .catch(next);
    } else {
      return res.sendStatus(403); // forbidden
    }
  });
});

// Delete
router.delete("/:article", auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function() {
    if (req.article.author._id.toString() === req.payload.id.toString())
      return req.article.remove().then(function() {
        return res.sendStatus(204);
      });
    return res.sendStatus(403);
  });
});

module.exports = router;
