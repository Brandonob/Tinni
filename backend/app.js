const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const userRouter = require("");

// app.use("/users", userRouter);

app.listen(port, () => {
  console.log("App is listening on port", port);
});
