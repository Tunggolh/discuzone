const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Provide a title"],
    },
    body: {
      type: String,
      required: [true, "Provide a body"],
    },
    category: {
      type: String,
      required: [true, "Provide a category"],
      enum: {
        values: [
          "Games",
          "Music and TV shows",
          "Sports",
          "Technology and Gadgets",
          "Art and Design",
          "Books and Literature",
          "Travel and Adventure",
        ],
        message:
          "Category is either: Games, Music and TV shows, Sports, Technology and Gadgets, Art and Design, Books and Literature, Travel and Adventure",
      },
    },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Post must belong to a user"],
    },
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

postSchema.index({ post: 1, user: 1 });

postSchema.pre(/^find/, function (next) {
  this.select("-__v -id");
  this.populate({
    path: "user",
    select: "username",
  });

  next();
});

postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
  options: {
    select: "-post",
    populate: {
      path: "user",
      select: "username",
    },
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
