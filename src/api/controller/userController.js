const connection = require('../../database/connection');
const md5 = require('md5');

module.exports = {
    async createUser(req, res) {
        const { body } = req;
        const createdUser = await connection('users').insert({
            name: body.name,
            username: body.username,
            password: md5(body.password),
            phone: body.phone,
            expirationToken: Date.now(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }, ['id'])
        res.status(200).json({ data: { id: createdUser }, msg: "usuário criado com sucesso!" });
    },

    async allUsers(req, res) {
        const users = await connection('users')
            .select(
                'id',
                'name',
                'username',
                'phone',
                'createdAt',
                'updatedAt'
            );
        res.status(200).json({ data: users });
    },
    async oneUser(req, res) {
        const { params: { id } } = req;
        const users = await connection('users')
            .select(
                'id',
                'name',
                'username',
                'phone',
                'createdAt',
                'updatedAt'
            )
            .where('id', id)
            .first();
        res.status(200).json({ data: users });
    },
    async updateUser(req, res) {
        const { params: { id }, body } = req;

        let updateUser = {
            name: body.name,
            username: body.username,
            phone: body.phone,
            updatedAt: Date.now(),
        };
        if (body.password) {
            updateUser.password = body.password;
        }
        const updatedUser = await connection('users')
            .update(updateUser, ['id'])
            .where('id', id)

        res.status(200).json({ data: { id: updatedUser }, msg: "usuário alterado com sucesso!" });
    },

    async deleteUser(req, res) {
        const { params: { id } } = req;
        await connection('users')
            .where('id', id)
            .del();
            
        res.status(200).json({ msg: "usuário excluído com sucesso!" });
    },
}