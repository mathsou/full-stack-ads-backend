const express = require("express");
const routes = express.Router();

const userController = require("./controller/userController");
const authorController = require("./controller/authorController");


routes.post("/users", userController.createUser);
routes.get("/users", userController.allUsers);
routes.get("/users/:id", userController.oneUser);
routes.put("/users/:id", userController.updateUser);
routes.delete("/users/:id", userController.deleteUser);

routes.post("/authors", authorController.createAuthor);
routes.get("/authors", authorController.allAuthors);
routes.get("/authors/:id", authorController.oneAuthor);
routes.put("/authors/:id", authorController.updateAuthor);
routes.delete("/authors/:id", authorController.deleteAuthor);

module.exports = routes;
