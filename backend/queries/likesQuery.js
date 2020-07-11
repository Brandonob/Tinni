const db = require("../db/index");

const getLikesForItin = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "get All likes from post_id",
      body: {
        searchPostID: req.params.itin_id,
        result: await db.any(
          "SELECT * FROM itineraries JOIN LIKES ON itineraries.id = likes.itin_id WHERE itineraries.id = $1",
          req.params.itin_id
        )
      }
    });
  } catch (error) {
    res.json({
      error: error
    });
  }
};

const addLike = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "add a like to itin_id by user_id",
      body: {
        user_id: req.params.user_id,
        itin_id: req.params.itin_id,
        result: await db.one(
          "INSERT INTO likes (user_id, itin_id) VALUES($1, $2) RETURNING *",
          [req.params.user_id, req.params.itin_id]
        )
      }
    });
  } catch (error) {
    res.json({
      error: error
    });
  }
};

const deleteLike = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "delete a like to post_id by liker_id",
      body: {
        user_id: req.params.user_id,
        itin_id: req.params.itin_id,
        result: await db.one(
          "DELETE FROM likes WHERE (user_id = $1 AND itin_id = $2) RETURNING *",
          [req.params.user_id, req.params.itin_id]
        )
      }
    });
  } catch (error) {
    res.json({
      error: error
    });
  }
};

module.exports = { 
    getLikesForItin,
    addLike,
    deleteLike
};