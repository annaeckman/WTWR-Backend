const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch(console.error);

// JSON parsing middleware
app.use(express.json());

// cors
app.use(cors());

// Main router
app.use("/", mainRouter);

app.listen(PORT, () => {
  // console.log(`Server is running on port ${PORT}`);
});
