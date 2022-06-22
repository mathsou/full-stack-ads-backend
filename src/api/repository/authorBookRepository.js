const connection = require('../../database/connection');
const moment = require('moment');

module.exports = {
    async saveAuthorBook(payload) {
        const now = moment().format('Y-MM-DD H:mm:ss');
        return await connection('authorbooks').insert({
            ...payload,
            createdAt: now,
        }, ['id']);
    },
    async deleteAuthorByBookId(bookId){
        return await connection('authorbooks')
        .where('bookId', bookId)
        .del();
    },
}