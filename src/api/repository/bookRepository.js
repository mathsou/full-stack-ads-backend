const connection = require('../../database/connection');
const { format } = require('moment');

module.exports = {
    async saveBook(payload) {
        const now = format('Y-MM-DD H:mm:ss');
        return await connection('books').insert({
            ...payload,
            createdAt: now,
            updatedAt: now,
        }, ['id']);
    },
    async listAllBooks(){
        return await connection('books')
            .select(
                'id',
                'books.name',
                'isbn',
                'year',
                'publisherId',
                'publishers.name',
                'createdAt',
                'updatedAt'
            ).join('publishers', 'publishers.id', 'books.publisherId');
    },
    async listOneBook(id){
        return await connection('books')
            .select(
                'id',
                'books.name',
                'isbn',
                'year',
                'publisherId',
                'publishers.name',
                'createdAt',
                'updatedAt'
            ).join('books', 'publishers.id', 'books.publisherId')
            .where('id', id)
            .first();
    },
    async updateBook(id, publisher){
        return await connection('books')
            .update({
                ...publisher,
                updatedAt: moment().format('Y-MM-DD H:mm:ss'),
            }, ['id'])
            .where('id', id)
    },
    async deleteBook(id){
        return await connection('books')
        .where('id', id)
        .del();
    },
}