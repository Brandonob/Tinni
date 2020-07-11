const likes = require("express").Router()

const {
    getLikesForItin,
    addLike,
    deleteLike
  } = require("../queries/likesQuery");
  
  likes.get("/itin/:itin_id", getLikesForItin);
  likes.post("/itin/:itin_id/:user_id", addLike);
  likes.delete("/:itin_id/:user_id", deleteLike);
  
  module.exports = likes;