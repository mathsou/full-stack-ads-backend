const connection = require('../../database/connection');
const moment = require('moment');

module.exports = {
    async saveBook(payload) {
        const now = moment().format('Y-MM-DD H:mm:ss');
        return await connection('books').insert({
            ...payload,
            createdAt: now,
            updatedAt: now,
        }, ['id']);
    },
    async listAllBooks({name='', isbn='', author}){
        return await connection('books')
            .select(
                'books.id',
                'books.name',
                'books.isbn',
                'books.year',
                'publisherId',
                'publishers.name as publisher',
                'books.createdAt',
                'books.updatedAt'
            ).join('publishers', 'publishers.id', 'books.publisherId')
            .leftJoin('authorbooks', 'authorbooks.id', 'books.id')
            .andWhereILike('books.name', `%${name}%`)
            .andWhereILike('isbn', `%${isbn}%`)
    },
    async listOneBook(id){
        return await connection('books')
            .select(
                'books.id',
                'books.name',
                'books.isbn',
                'books.year',
                'publisherId',
                'publishers.name as publisher',
                'books.createdAt',
                'books.updatedAt'
            ).join('publishers', 'publishers.id', 'books.publisherId')
            .where('books.id', id)
            .first();
    },
    async findBooksByIdIfNotRented(id){
        return await connection('books')
            .distinct(
                'books.id',
            ).leftJoin('rents', 'rents.bookId', 'books.id')
            .where('books.id', id)
            .andWhere((builder) => builder
                .whereNotNull('returnedAt')
                .orWhereNull('rents.id')
            )
            .first();
    },
    async updateBook(id, book){
        return await connection('books')
            .update({
                ...book,
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