const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const postRouter = require("./postRoutes");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.use("/:userId/posts", postRouter);

router.use(authController.protect);

router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;