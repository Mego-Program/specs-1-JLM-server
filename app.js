const express = require("express");
const { check, validationResult } = require("express-validator");
const cors = require("cors");
const mongoose = require("mongoose");
const specsRoutes = require("./routes/specs");
const app = express();
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gpu6gdp.mongodb.net/Specs`,
  {
    tlsAllowInvalidCertificates: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected!");
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cors());
app.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
});

// Routes
app.use("/specs", specsRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found route");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
