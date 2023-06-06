const express = require("express");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");
const commentRouter = require("./commentRoutes");

const router = express.Router({ mergeParams: true });

router.use("/:postId/comments", commentRouter);

router
  .route("/")
  .post(
    authController.protect,
    postController.setUserId,
    postController.createPost
  )
  .get(postController.getAllPosts);

router
  .route("/:id")
  .get(postController.getPost)
  .patch(
    authController.protect,
    postController.setUserId,
    postController.updatePost
  ) // must be authorized
  .delete(
    authController.protect,
    postController.setUserId,
    postController.deletePost
  ); // must be authorized

router.route("/:id/like").post(authController.protect, postController.likePost);

module.exports = router;
