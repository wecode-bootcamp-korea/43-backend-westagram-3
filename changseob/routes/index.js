const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const likeRouter = require("./likeRouter");
const commentRouter = require("./commentRouter");

router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);
router.use("/likes", likeRouter.router);
router.use("/comments", commentRouter.router);

module.exports = router;
