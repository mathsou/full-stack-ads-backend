const connection = require('../../database/connection');
const md5 = require('md5');
const moment = require('moment');

module.exports = {
    async createPublisher(req, res) {
        const { body } = req;
        const now = moment().format('Y-MM-DD H:mm:ss');

        const createdPublisher = await connection('publishers').insert({
            name: body.name,
            createdAt: moment().format('Y-MM-DD H:mm:ss'),
            updatedAt: moment().format('Y-MM-DD H:mm:ss'),
        }, ['id'])
        res.status(200).json({ data: { id: createdPublisher }, msg: "Publisher criado com sucesso!" });
    },

    async allPublisher(req, res) {
        const users = await connection('publishers')
            .select(
                'id',
                'name',
                'createdAt',
                'updatedAt'
            );
        res.status(200).json({ data: users });
    },
    async onePublisher(req, res) {
        const { params: { id } } = req;
        const publishers = await connection('publishers')
            .select(
                'id',
                'name',
                'createdAt',
                'updatedAt'
            )
            .where('id', id)
            .first();
        res.status(200).json({ data: publishers });
    },
    async updatePublisher(req, res) {
        const { params: { id }, body } = req;

        let updatePublisher = {
            name: body.name,
            updatedAt: moment().format('Y-MM-DD H:mm:ss'),
        };
        if (body.name) {
            updatePublisher.name = body.name;
        }
        
        const updatedPublisher = await connection('publishers')
            .update(updatePublisher, ['id'])
            .where('id', id)

        res.status(200).json({ data: { id: updatedPublisher }, msg: "Publisher alterado com sucesso!" });
    },

    async deletePublisher(req, res) {
        const { params: { id } } = req;
        await connection('publishers')
            .where('id', id)
            .del();
            
        res.status(200).json({ msg: "Publisher excluído com sucesso!" });
    },
}