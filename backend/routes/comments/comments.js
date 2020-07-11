const comments = require("express").Router();

const {
  getAllComments,
  addComment,
  editComment,
  deleteComment,
  deleteAllComments
} = require("../queries/commentsQueries");

comments.get("/itin/:itin_id", getAllComments);
comments.post("/itin/:itin_id/:user_id", addComment);
comments.patch("/:itin_id/:user_id", editComment);
comments.delete("/:id/:itin_id", deleteComment);
comments.delete("/itin/:itin_id/user/:user_id", deleteAllComments);

module.exports = comments;