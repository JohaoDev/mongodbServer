("use strict");

const express = require("express"),
  bodyParser = require("body-parser"),
  connectDB = require("../config/db");

let app = express(),
  userRoutes = require("../routes/users.routes"),
  fileRoutes = require("../routes/files.routes"),
  db = connectDB();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", fileRoutes);

module.exports = app;
