const md5 = require('md5');
const moment = require('moment');

const publisherService = require('../service/publisherService');

module.exports = {
    async createPublisher(req, res) {
        const { body } = req;
        const {code, data, msg} = await publisherService.savePublisher(body);
        res.status(code).json({data, msg});
    },
    async allPublishers(_, res) {
        const {code, data } = await publisherService.listAllPublishers();
        res.status(code).json({ data });
    },
    async onePublisher(req, res) {
        const { params: { id } } = req;
        const {code, data } = await publisherService.listOnePublisher(id);
        res.status(code).json({ data });
    },
    async updatePublisher(req, res) {
        const { params: { id }, body } = req;
        const {code, data, msg } = await publisherService.updatePublisher(id, body);
        res.status(code).json({ data, msg });
    },
    async deletePublisher(req, res) {
        const { params: { id } } = req;
        const {code, data, msg } = await publisherService.deletePublisher(id);
        res.status(code).json({ data, msg });
    },
}