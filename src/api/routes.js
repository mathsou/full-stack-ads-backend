const express = require("express");
const routes = express.Router();

const userController = require("./controller/userController");

routes.post("/users", userController.create);
routes.get("/users", userController.allUsers);

module.exports = routes;
