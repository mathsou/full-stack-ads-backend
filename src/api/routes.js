const express = require("express");
const routes = express.Router();

const userController = require("./controller/userController");

routes.post("/users", userController.createUser);
routes.get("/users", userController.allUsers);
routes.get("/users/:id", userController.oneUser);
routes.put("/users/:id", userController.updateUser);
routes.delete("/users/:id", userController.deleteUser);

module.exports = routes;
