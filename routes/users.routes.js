("use strict");

const express = require("express");

let api = express.Router(),
  userController = require("../controllers/users.controller");

//users ENDPOINT
api.get("/", (req, res) => {
  res.send("Hola API");
});

api.get("/users", userController.getUsers);
api.get("/user/:id", userController.getUserByID);
api.get("/usersbyName/:name", userController.getUserByName);
api.post("/user", userController.postUser);
api.post("/users", userController.postUsers);
api.patch("/user", userController.patchUser);
api.patch("/users", userController.patchUsers);
api.delete("/user/:id", userController.deleteUser);

api.get("/postman_query", userController.postmanQuery);
api.get("/postman_params/:name/:lastname/:age", userController.postmanParams);
api.post("/postman_body", userController.postmanBody);

module.exports = api;
