const express = require("express");
const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const userController = require("./controller/userController");
const authorController = require("./controller/authorController");
const bookController = require("./controller/bookController");
const publisherController = require("./controller/publisherController");
const rentController = require("./controller/rentController");

/* LOGIN */
routes.post("/login", userController.login);


/* ROTA DE USUARIO */
routes.post("/users", userController.createUser);

routes.use(authMiddleware);

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
routes.get("/publishers", publisherController.allPublishers);
routes.get("/publishers/:id", publisherController.onePublisher);
routes.patch("/publishers/:id", publisherController.updatePublisher);
routes.delete("/publishers/:id", publisherController.deletePublisher);

/* ROTA DE RETIRADA E DEVOLUÇÃO */
routes.post("/rents", rentController.rentBook);
routes.patch("/rents/:id/return", rentController.returnBook);

module.exports = routes;
