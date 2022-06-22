const connection = require('../../database/connection');
const { format } = require('moment');

module.exports = {
    async saveUser(payload) {
        const now = format('Y-MM-DD H:mm:ss');
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
    async findUserByEmail(email){
        return await connection('users')
            .select(
                'id',
                'name',
                'username',
                'phone',
                'createdAt',
                'updatedAt'
            )
            .where('email', email)
            .first();
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