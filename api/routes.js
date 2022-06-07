const express = require("express");
const routes = express.Router();

const userController = require("./controller/userController");

routes.post("/users", userController.create);

module.exports = routes;
