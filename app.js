const express = require("express");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.all("*", (req, res, next) => {
  next(`Can't find ${req.originalUrl} on this server`);
});

app.use(globalErrorHandler);

module.exports = app;
