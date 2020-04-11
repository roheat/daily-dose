const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bio: String,
    image: String,
    hash: String,
    salt: String
  },
  // createdAt, updatedAt
  { timestamps: true }
);

// unique username and email
UserSchema.plugin(uniqueValidator, { message: "is already taken" });

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 30); // expires in 30 days

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000)
    },
    secret
  );
};

// send authorized user json to FE
UserSchema.methods.toAuthJSON = function() {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};

UserSchema.methods.toProfileJSONFor = function(user) {
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || "https://i.ibb.co/XCXYv4Y/avatar.png",
    following: user ? user.isFollowing(this._id) : false
  };
};

UserSchema.methods.favorite = function(id) {
  // check if not already favorite
  if (this.favorites.indexOf(id) === -1)
    this.favorites = this.favorites.concat(id);

  return this.save();
};

UserSchema.methods.unfavorite = function(id) {
  this.favorites.remove(id);
  return this.save();
};

UserSchema.methods.isFavorite = function(id) {
  return this.favorites.some(function(favoriteId) {
    return favoriteId.toString() === id.toString();
  });
};

UserSchema.methods.follow = function(id) {
  if (this.following.indexOf(id) === -1)
    this.following = this.following.concat(id);

  return this.save();
};

UserSchema.methods.unfollow = function(id) {
  this.following.remove(id);

  return this.save();
};

UserSchema.methods.isFollowing = function(id) {
  return this.following.some(followId => followId.toString() === id.toString());
};

mongoose.model("User", UserSchema);
