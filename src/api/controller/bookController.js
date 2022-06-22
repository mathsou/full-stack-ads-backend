const connection = require('../../database/connection');
const md5 = require('md5');
const moment = require('moment');

module.exports = {
    async createBook(req, res) {
        const { body } = req;
        const now = moment().format('Y-MM-DD H:mm:ss');

        const createdBook = await connection('books').insert({
            name: body.name,
            isbn: body.isbn,
            publisherId: body.publisherId,
            year: body.year,
            createdAt: moment().format('Y-MM-DD H:mm:ss'),
            updatedAt: moment().format('Y-MM-DD H:mm:ss'),
        }, ['id'])
        res.status(200).json({ data: { id: createdBook }, msg: "Livro criado com sucesso!" });
    },

    async allBooks(req, res) {
        const books = await connection('books')
            .select(
                'id',
                'name',
                'isbn',
                'publisherId',
                'year',
                'createdAt',
                'updatedAt'
            );
        res.status(200).json({ data: books });
    },
    async oneBook(req, res) {
        const { params: { id } } = req;
        const books = await connection('books')
            .select(
                'id',
                'name',
                'isbn',
                'publisherId',
                'year',
                'createdAt',
                'updatedAt'
            )
            .where('id', id)
            .first();
        res.status(200).json({ data: books });
    },
    async updateBook(req, res) {
        const { params: { id }, body } = req;

        let updateBook = {
            name: body.name,
            isbn: body.isbn,
            publisherId: body.publisherId,
            updatedAt: moment().format('Y-MM-DD H:mm:ss'),
        };
        if (body.year) {
            updateBook.year = body.year;
        }
        const updatedBook = await connection('books')
            .update(updateBook, ['id'])
            .where('id', id)

        res.status(200).json({ data: { id: updatedBook }, msg: "Livro alterado com sucesso!" });
    },

    async deleteBook(req, res) {
        const { params: { id } } = req;
        await connection('books')
            .where('id', id)
            .del();
            
        res.status(200).json({ msg: "Livro excluído com sucesso!" });
    },
}