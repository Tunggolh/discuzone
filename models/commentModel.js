const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Provide a comment"],
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: [true, "Comment must belong to a post"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Comment must belong to a user"],
    },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

commentSchema.pre(/^find/, function (next) {
  this.select("-__v");
  this.populate({
    path: "user",
    select: "username",
  });

  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
