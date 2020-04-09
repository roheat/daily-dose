const mongoose = require("mongoose");
const router = require("express").Router();
const passport = require("passport");
const User = mongoose.model("User");
const auth = require("../auth");

// sign up
router.post("/users", function(req, res, next) {
  const user = new User();
  const { username, email, password } = req.body.user;
  user.username = username;
  user.email = email;
  user.setPassword(password);

  user
    .save()
    .then(function() {
      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
});

// login
router.post("/user/login", function(req, res, next) {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "cant be blank" } });
  }
  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "cant be blank" } });
  }

  passport.authenticate("local", { session: false }, function(err, user, info) {
    if (err) return next(err);

    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

// get user from id
router.get("/user", auth.required, function(req, res, next) {
  User.findById(req.payload.id)
    .then(function(user) {
      if (!user) return res.sendStatus(401);

      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
});

// update user info
router.put("/user", auth.required, function(req, res, next) {
  User.findById(req.payload.id)
    .then(function(user) {
      if (!user) return res.sendStatus(401);

      const { username, email, bio, image, password } = req.body.user;

      if (typeof req.body.user.username !== "undefined")
        user.username = username;
      if (typeof req.body.user.email !== "undefined") user.email = email;
      if (typeof req.body.user.bio !== "undefined") user.bio = bio;
      if (typeof req.body.user.image !== "undefined") user.image = image;
      if (typeof req.body.user.password !== "undefined")
        user.setPassword(password);

      return user.save().then(function() {
        return res.json({ user: user.toAuthJSON() });
      });
    })
    .catch(next);
});
module.exports = router;
