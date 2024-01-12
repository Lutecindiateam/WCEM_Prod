const express = require("express");
const env = require("dotenv");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const mongoose = require("mongoose");
app.use(express.json());

// for developement

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
app.use(
  "/public",
  express.static(path.join(__dirname, "./src/WCEM-2024-2025"))
);

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(process.env.PORT || 5000,'0.0.0.0', () => {
  console.log(`server is ready for port ${process.env.PORT}`);
});
