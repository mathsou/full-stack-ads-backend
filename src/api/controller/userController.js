const userService = require('../service/userService');

module.exports = {
    async createUser(req, res) {
        const { body } = req;
        const {code, data, msg} = await userService.saveUser(body);
        res.status(code).json({data, msg});
    },
    async allUsers(_, res) {
        const {code, data } = await userService.listAllUsers();
        res.status(code).json({ data });
    },
    async oneUser(req, res) {
        const { params: { id } } = req;
        const {code, data } = await userService.listOneUser(id);
        res.status(code).json({ data });
    },
    async updateUser(req, res) {
        const { params: { id }, body } = req;
        const {code, data, msg } = await userService.updateUser(id, body);
        res.status(code).json({ data, msg });
    },
    async deleteUser(req, res) {
        const { params: { id } } = req;
        const {code, data, msg } = await userService.deleteUser(id);
        res.status(code).json({ data, msg });
    },
    async login(req, res) {
        const { body } = req;
        const {code, data, msg} = await userService.login(body);
        res.status(code).json({data, msg});
    },
}