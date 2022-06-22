const connection = require('../../database/connection');
const moment = require('moment');

module.exports = {
    async saveUser(payload) {
        const now = moment().format('Y-MM-DD H:mm:ss');
        return await connection('users').insert({
            ...payload,
            expirationToken: now,
            createdAt: now,
            updatedAt: now,
        }, ['id']);
    },
    async listAllUsers(){
        return await connection('users')
            .select(
                'id',
                'name',
                'username',
                'phone',
                'createdAt',
                'updatedAt'
            );
    },
    async listOneUser(id){
        return await connection('users')
            .select(
                'id',
                'name',
                'username',
                'phone',
                'createdAt',
                'updatedAt'
            )
            .where('id', id)
            .first();
    },
    async findUserByUsername(username){
        return await connection('users')
            .select(
                'id',
                'name',
                'username',
                'password',
                'phone',
                'createdAt',
                'updatedAt'
            )
            .where('username', username)
    },
    async findActiveRentsFromUser(id){
        return await connection('users')
            .select(
                'rents.bookId',
            )
            .join('rents', 'rents.userId', 'users.id')
            .whereNull('returnedAt')
            .andWhere('users.id', id);
    },
    async updateUser(id, user){
        return await connection('users')
            .update({
                ...user,
                updatedAt: moment().format('Y-MM-DD H:mm:ss'),
            }, ['id'])
            .where('id', id)
    },
    async deleteUser(id){
        return await connection('users')
        .where('id', id)
        .del();
    },
}