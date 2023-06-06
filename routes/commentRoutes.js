const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    authController.protect,
    commentController.setPostUserIds,
    commentController.createComment
  ) // must be login
  .get(commentController.getAllPostComments);

router.use(authController.protect);

router
  .route("/:id")
  .patch(commentController.setPostUserIds, commentController.updateComment) // must be authorized
  .delete(commentController.setPostUserIds, commentController.deleteComment); // must be authorized

router.route("/:id/like").post(commentController.likeComment);

module.exports = router;
