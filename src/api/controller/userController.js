const connection = require('../../database/connection');

module.exports = {
    async create(req, res) {
        res.status(200).json(req.query);
    },

    async allUsers(req, res) {
        const users = await connection('users')
        res.status(200).json(users);
    }
}