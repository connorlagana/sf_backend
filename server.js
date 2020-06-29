const express = require("express");
const PORT = process.env.PORT || 3001;

const { spawn } = require("child_process");

const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter.js");
const commentRouter = require("./routes/commentRouter");
const songRouter = require("./routes/songRouter");

const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

// routes
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
// app.use("/songs", songRouter);

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.post("/newsong", (req, res) => {
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn("python3", [
    "mash.py",
    req.body.instrumental,
    req.body.firstV,
    req.body.secondV,
    req.body.vox,
    req.body.drop,
    req.body.chorus,
    req.body.name,
  ]);
  // collect data from script
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend);
  });
});

app.listen(PORT, () => {
  console.log(`We're live at ${PORT}!`);
});
