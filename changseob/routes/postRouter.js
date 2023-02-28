const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/", postController.writePost);
router.get("/", postController.getPosts);
router.put("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);

module.exports = {
  router,
};
