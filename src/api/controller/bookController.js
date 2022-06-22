const md5 = require('md5');
const moment = require('moment');

const bookService = require('../service/bookService');

module.exports = {
    async createBook(req, res) {
        const { body } = req;
        const {code, data, msg} = await bookService.saveBook(body);
        res.status(code).json({data, msg});
    },
    async allBooks(_, res) {
        const {code, data } = await bookService.listAllBooks();
        res.status(code).json({ data });
    },
    async oneBook(req, res) {
        const { params: { id } } = req;
        const {code, data } = await bookService.listOneBook(id);
        res.status(code).json({ data });
    },
    async updateBook(req, res) {
        const { params: { id }, body } = req;
        const {code, data, msg } = await bookService.updateBook(id, body);
        res.status(code).json({ data, msg });
    },
    async deleteBook(req, res) {
        const { params: { id } } = req;
        const {code, data, msg } = await bookService.deleteBook(id);
        res.status(code).json({ data, msg });
    },
}