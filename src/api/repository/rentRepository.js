const connection = require('../../database/connection');
const moment = require('moment');

module.exports = {
    async saveRent(payload) {
        const now = moment().format('Y-MM-DD H:mm:ss');
        return await connection('rents').insert({
            ...payload,
            createdAt: now,
            updatedAt: now,
        });
    },
    async updateRent(id, rent){
        return await connection('rents')
            .update({
                ...rent,
                updatedAt: moment().format('Y-MM-DD H:mm:ss'),
            }, ['id'])
            .where('id', id)
    },
}