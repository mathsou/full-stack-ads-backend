const connection = require('../../database/connection');
const moment = require('moment');

module.exports = {
    async saveBook(payload) {
        const now = moment().format('Y-MM-DD H:mm:ss');
        return await connection('books').insert({
            ...payload,
            available: 1,
            createdAt: now,
            updatedAt: now,
        }, ['id']);
    },
    async listAllBooks({ name = '', isbn = '', author }) {
        return await connection('books')
            .select(
                'books.id',
                'books.name',
                'books.isbn',
                'books.year',
                'books.available',
                'publisherId',
                'publishers.name as publisher',
                connection.raw(
                    'group_concat(authors.name) as authors'
                ),
                connection.raw(
                    'group_concat(authors.id) as authorsIds'
                ),
                'books.createdAt',
                'books.updatedAt'
            ).join('publishers', 'publishers.id', 'books.publisherId')
            .join('authorbooks', 'authorbooks.bookId', 'books.id')
            .join('authors', 'authorbooks.authorId', 'authors.id')
            .whereILike('books.name', `%${name}%`)
            .andWhereILike('isbn', `%${isbn}%`)
            .orderBy('books.id', 'desc')
            .groupBy('books.id')
    },
    async listOneBook(id) {
        return await connection('books')
            .select(
                'books.id',
                'books.name',
                'books.isbn',
                'books.year',
                'books.available',
                'publisherId',
                'publishers.name as publisher',
                connection.raw(
                    'group_concat(authors.name) as authors'
                ),
                connection.raw(
                    'group_concat(authors.id) as authorsIds'
                ),
                'books.createdAt',
                'books.updatedAt'
            ).join('publishers', 'publishers.id', 'books.publisherId')
            .join('authorbooks', 'authorbooks.bookId', 'books.id')
            .join('authors', 'authorbooks.authorId', 'authors.id')
            .where('books.id', id)
            .groupBy('books.id')
            .first();
    },
    async findBooksByIdIfAvailable(id) {
        return await connection('books')
            .select(
                'id',
            )
            .where('id', id)
            .andWhere('available', 1)
            .first();
    },
    async updateBook(id, book) {
        return await connection('books')
            .update({
                ...book,
                updatedAt: moment().format('Y-MM-DD H:mm:ss'),
            })
            .where('id', id)
    },
    async deleteBook(id) {
        return await connection('books')
            .where('id', id)
            .del();
    },
}