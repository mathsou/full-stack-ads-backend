const express = require("express");
const routes = express.Router();

const userController = require("./controller/userController");
const authorController = require("./controller/authorController");
const bookController = require("./controller/bookController");
const publisherController = require("./controller/publisherController");

/* ROTA DE USUARIO */
routes.post("/users", userController.createUser);
routes.get("/users", userController.allUsers);
routes.get("/users/:id", userController.oneUser);
routes.patch("/users/:id", userController.updateUser);
routes.delete("/users/:id", userController.deleteUser);

/* ROTA DE AUTOR */
routes.post("/authors", authorController.createAuthor);
routes.get("/authors", authorController.allAuthors);
routes.get("/authors/:id", authorController.oneAuthor);
routes.patch("/authors/:id", authorController.updateAuthor);
routes.delete("/authors/:id", authorController.deleteAuthor);

/* ROTA DE LIVRO */
routes.post("/books", bookController.createBook);
routes.get("/books", bookController.allBooks);
routes.get("/books/:id", bookController.oneBook);
routes.patch("/books/:id", bookController.updateBook);
routes.delete("/books/:id", bookController.deleteBook);

/* ROTA DE LIVRO */
routes.post("/publishers", publisherController.createPublisher);
routes.get("/publishers", publisherController.allPublisher);
routes.get("/publishers/:id", publisherController.onePublisher);
routes.patch("/publishers/:id", publisherController.updatePublisher);
routes.delete("/publishers/:id", publisherController.deletePublisher);

module.exports = routes;
