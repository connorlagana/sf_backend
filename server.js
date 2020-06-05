const express = require("express");
const PORT = process.env.PORT || 3001;

const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter.js");
const commentRouter = require("./routes/commentRouter");

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

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`We're live at ${PORT}!`);
});
