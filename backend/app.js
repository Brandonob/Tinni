const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
const itinerariesRouter = require("./routes/itineraries.js")

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const userRouter = require("");

// app.use("/users", userRouter);
app.use("/itineraries", itinerariesRouter)


app.listen(port, () => {
    console.log("App is listening on port", port);
});