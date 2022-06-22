const connection = require('../../database/connection');
const md5 = require('md5');
const moment = require('moment');

const authorService = require('../service/authorService');

module.exports = {
    async createAuthor(req, res) {
        const { body } = req;
        const {code, data, msg} = await authorService.saveAuthor(body);
        res.status(code).json({data, msg});
    },
    async allAuthors(_, res) {
        const {code, data } = await authorService.listAllAuthors();
        res.status(code).json({ data });
    },
    async oneAuthor(req, res) {
        const { params: { id } } = req;
        const {code, data } = await authorService.listOneAuthor(id);
        res.status(code).json({ data });
    },
    async updateAuthor(req, res) {
        const { params: { id }, body } = req;
        const {code, data, msg } = await authorService.updateAuthor(id, body);
        res.status(code).json({ data, msg });
    },
    async deleteAuthor(req, res) {
        const { params: { id } } = req;
        const {code, data, msg } = await authorService.deleteAuthor(id);
        res.status(code).json({ data, msg });
    },
}