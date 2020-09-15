const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3001;

//import routes
const itinerariesRouter = require("./routes/itineraries.js");
const userRouter = require("../backend/routes/users/users");
const activitesRouter = require("./routes/activities");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// <<<<<<< itineraries_queries
//router setup
app.use("/users", userRouter);
app.use("/itineraries", itinerariesRouter);
app.use("/activites", activitesRouter);

// app.use((err, req, res, next) => {
//     console.log(err);
//     if (err.status) {
//       res.status(err.status).json(err);
//     } else {
//       res.status(500).json(err);
//     }
//   });

app.listen(port, () => {
  console.log("App is listening on port", port);
});
