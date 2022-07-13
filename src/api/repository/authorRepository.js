const connection = require('../../database/connection');
const moment = require('moment');

module.exports = {
    async saveAuthor(payload) {
        const now = moment().format('Y-MM-DD H:mm:ss');
        return await connection('authors').insert({
            ...payload,
            createdAt: now,
            updatedAt: now,
        }, ['id']);
    },
    async listAllAuthors(){
        return await connection('authors')
            .select(
                'id',
                'name',
                'country',
                'createdAt',
                'updatedAt'
            )
            .orderBy('id', 'desc');
    },
    async findAuthorByIds(ids){
        return await connection('authors')
            .select(
                'id',
                'name',
                'country',
                'createdAt',
                'updatedAt'
            ) .whereIn('id', ids);
    },
    async listOneAuthor(id){
        return await connection('authors')
            .select(
                'id',
                'name',
                'country',
                'createdAt',
                'updatedAt'
            )
            .where('id', id)
            .first();
    },
    async updateAuthor(id, author){
        return await connection('authors')
            .update({
                ...author,
                updatedAt: moment().format('Y-MM-DD H:mm:ss'),
            }, ['id'])
            .where('id', id)
    },
    async deleteAuthor(id){
        return await connection('authors')
        .where('id', id)
        .del();
    },
}