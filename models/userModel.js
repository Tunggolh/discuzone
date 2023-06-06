const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Provide a username"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Provide an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Provide a password"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords doesn't match",
      },
    },
    likePosts: [
      {
        post: {
          type: mongoose.Schema.ObjectId,
          ref: "Post",
        },
      },
      { _id: false },
    ],
    likeComments: [
      {
        comment: {
          type: mongoose.Schema.ObjectId,
          ref: "Comment",
        },
      },
      { _id: false },
    ],
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.virtual("likePostsCount", {
  ref: "Post",
  localField: "_id",
  foreignField: "likePosts",
  count: true,
});

userSchema.methods.correctPassword = async function (
  typedPassword,
  userPassword
) {
  return await bcrypt.compare(typedPassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
