const Post = require("../models/postModel");
const User = require("../models/userModel");
const factory = require("./handlerFactory");

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllPosts = factory.getAll(Post, "userId", "user", User);
exports.getPost = factory.getOne(Post);
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post, true);
exports.deletePost = factory.deleteOne(Post, true);
exports.likePost = factory.likeOne(Post);
