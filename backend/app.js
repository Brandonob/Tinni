const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3002;

const userRouter = require("./routes/users/users");
const activitiesRouter = require("./routes/activities");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", userRouter);
app.use("/activities", activitiesRouter);

//rafid explain code vvvvv
// app.use((err, req, res, next) => {
//   console.log(err);
//   if (err.status) {
//     res.status(err.status).json(err);
//   } else {
//     res.status(500).json(err);
//   }
// });

app.listen(port, () => {
  console.log("App is listening on port", port);
});
