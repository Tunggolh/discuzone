const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const factory = require("./handlerFactory");

exports.setPostUserIds = (req, res, next) => {
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllPostComments = factory.getAll(Comment, "postId", "post", Post);
exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment, true);
exports.deleteComment = factory.deleteOne(Comment, true);
exports.likeComment = factory.likeOne(Comment);
