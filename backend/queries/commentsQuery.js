const db = require("../db/index");

const getAllComments = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "Grabbed all comments",
      body: {
        comments: await db.any(
          "SELECT comments.id, user_id, itin_id, body, time_stamp, username FROM comments INNER JOIN users ON users.id = comments.user_id WHERE itin_id = $1 ORDER BY time_stamp DESC",
          req.params.post_id
        )
      }
    });
  } catch (error) {
        next(error);
  }
};

const addSingleComment = async (req, res, next) => {
  try {
    let { user_id, itin_id } = req.params;
    let { body } = req.body;
    let single_comment = await db.one(
      "INSERT INTO comments (user_id, itin_id, body) VALUES ($1, $2, $3) RETURNING *",
      [user_id, itin_id, body]
    );
    res.status(200).json({
      status: "Success",
      message: "Added a single comment",
      body: {
        single_comment
        }
    });
    } catch (error) {
    next(error);
}
};

const editSingleComment = async (req, res, next) => {
try {
    let { iten_id, user_id } = req.params;
    let { body } = req.body;
    let edited_comment = await db.one(
    `UPDATE comments SET body = '${body}' WHERE (iten_id = $1 AND user_id = $2) RETURNING *`,
    [iten_id, user_id]
    );
    res.status(200).json({
    status: "Success",
    message: "You have edited a single comment",
    body: {
        edited_comment
    }
    });
} catch (error) {
    next(error);
    }
};

const deleteSingleComment = async (req, res, next) => {
try {
    let { id, itin_id } = req.params;
    let deleted_comment = await db.one(
    "DELETE FROM comments WHERE (id = $1 AND itin_id = $2) RETURNING *",
    [id, itin_id]
    );
    res.status(200).json({
    status: "Success",
    message: "You have deleted a single comment",
    body: {
        deleted_comment
    }
    });
} catch (error) {
    next(error);
    }
};

const deleteAllComments = async (req, res, next) => {
try {
  let { itin_id, user_id } = req.params;
  let deleted_comment = await db.one(
    "DELETE FROM comments WHERE (itin_id = $1 AND user_id = $2) RETURNING *",
    [itin_id, user_id]
  );
  res.status(200).json({
    status: "Success",
    message: "You have deleted all comments by user: " + author_id,
    body: {
      deleted_comment
    }
  });
} catch (error) {
  next(error);
    }
};

module.exports = {
    getAllComments,
    addSingleComment,
    editSingleComment,
    deleteSingleComment,
    deleteAllComments
};
