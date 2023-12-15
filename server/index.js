const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

// for developement
var cors = require('cors')
app.use(cors())

//for production
// const helmet = require("helmet");
// app.use(helmet());

env.config();

const authRoutes = require("./src/routes/user");

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("error ::", error.message);
  });

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server is ready for port ${process.env.PORT}`);
});
