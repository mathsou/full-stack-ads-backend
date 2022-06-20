const connection = require('../../database/connection');
const md5 = require('md5');
const moment = require('moment');

module.exports = {
    async createAuthor(req, res) {
        const { body } = req;
        const now = moment().format('Y-MM-DD H:mm:ss');

        const createdAuthor = await connection('authors').insert({
            name: body.name,
            country: body.country,
            createdAt: moment().format('Y-MM-DD H:mm:ss'),
            updatedAt: moment().format('Y-MM-DD H:mm:ss'),
        }, ['id'])
        res.status(200).json({ data: { id: createdAuthor }, msg: "Author criado com sucesso!" });
    },

    async allAuthors(req, res) {
        const authors = await connection('authors')
            .select(
                'id',
                'name',
                'country',
                'createdAt',
                'updatedAt'
            );
        res.status(200).json({ data: authors });
    },
    async oneAuthor(req, res) {
        const { params: { id } } = req;
        const authors = await connection('authors')
            .select(
                'id',
                'name',
                'country',
                'createdAt',
                'updatedAt'
            )
            .where('id', id)
            .first();
        res.status(200).json({ data: authors });
    },
    async updateAuthor(req, res) {
        const { params: { id }, body } = req;

        let updateAuthor = {
            name: body.name,
            updatedAt: moment().format('Y-MM-DD H:mm:ss'),
        };
        if (body.country) {
            updateAuthor.country = body.country;
        }
        const updatedAuthor = await connection('authors')
            .update(updateAuthor, ['id'])
            .where('id', id)

        res.status(200).json({ data: { id: updatedAuthor }, msg: "Author alterado com sucesso!" });
    },

    async deleteAuthor(req, res) {
        const { params: { id } } = req;
        await connection('authors')
            .where('id', id)
            .del();
            
        res.status(200).json({ msg: "Author excluído com sucesso!" });
    },
}