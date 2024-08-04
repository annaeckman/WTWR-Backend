const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch(console.error);

// Authorization middleware
app.use((req, res, next) => {
  req.user = {
    _id: "66a9305ce7d59abc4f717ed2",
  };
  next();
});

// JSON parsing middleware
app.use(express.json());
// Main router
app.use("/", mainRouter);

app.listen(PORT, () => {
  // console.log(`Server is running on port ${PORT}`);
});
