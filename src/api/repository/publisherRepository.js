const connection = require('../../database/connection');
const { format } = require('moment');

module.exports = {
    async savePublisher(payload) {
        const now = format('Y-MM-DD H:mm:ss');
        return await connection('publishers').insert({
            ...payload,
            createdAt: now,
            updatedAt: now,
        }, ['id']);
    },
    async listAllPublishers(){
        return await connection('publishers')
            .select(
                'id',
                'name',
                'createdAt',
                'updatedAt'
            );
    },
    async listOnePublisher(id){
        return await connection('publishers')
            .select(
                'id',
                'name',
                'createdAt',
                'updatedAt'
            )
            .where('id', id)
            .first();
    },
    async updatePublisher(id, publisher){
        return await connection('publishers')
            .update({
                ...publisher,
                updatedAt: moment().format('Y-MM-DD H:mm:ss'),
            }, ['id'])
            .where('id', id)
    },
    async deletePublisher(id){
        return await connection('publishers')
        .where('id', id)
        .del();
    },
}