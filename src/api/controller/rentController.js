const md5 = require('md5');
const moment = require('moment');

const rentService = require('../service/rentService');

module.exports = {
    async rentBook(req, res) {
        const { body } = req;
        const { code, data, msg } = await rentService.rentBook(body);
        res.status(code).json({ data, msg });
    },
    async returnBook(req, res) {
        const { params: { id } } = req;
        const { code, data, msg } = await rentService.returnBook(id);
        res.status(code).json({ data, msg });
    },
}