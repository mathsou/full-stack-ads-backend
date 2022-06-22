const validator = require('../../utils/validator');
module.exports = {
    createUserValidator(body){
        return validator({
            data: body,
            fields: {
            name: {
                required: true,
                type: 'string',
                length: 80,
            },
            username: {
                required: true,
                type: 'string',
                length: 40,
            },
            password: {
                required: true,
                type: 'string',
            },
            phone: {
                required: true,
                type: 'number',
                length: 11,
            }
        }
        });
    },
    updateUserValidator(body){
        return validator({
            data: body,
            fields: {
            name: {
                type: 'string',
                length: 80,
            },
            username: {
                type: 'string',
                length: 40,
            },
            password: {
                type: 'string',
            },
            phone: {
                type: 'number',
                length: 11,
            }
        }
        });
    },
    loginValidator(body){
        return validator({
            data: body,
            fields: {
            username: {
                required: true,
                type: 'string',
                length: 40,
            },
            password: {
                required: true,
                type: 'string',
            },
        }
        });
    },
}