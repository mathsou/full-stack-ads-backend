const validator = require('../../utils/validator');
module.exports = {
    createBookValidator(body){
        return validator({
            data: body,
            fields: {
                name: {
                    required: true,
                    type: 'string',
                    length: 100,
                },
                isbn: {
                    required: true,
                    type: 'string',
                    length: 13,
                },
                publisherId: {
                    required: true,
                    type: 'number',
                },
                year: {
                    required: true,
                    type: 'number',
                    length: 4,
                },
                authors: {
                    required: true,
                    type: 'array',
                    arrayOf: 'number',
                }
            }
        });
    },
    updateBookValidator(body){
        return validator({
            data: body,
            fields: {
                name: {
                    type: 'string',
                    length: 100,
                },
                isbn: {
                    type: 'string',
                    length: 13,
                },
                publisherId: {
                    type: 'number',
                },
                year: {
                    type: 'number',
                    length: 4,
                },
                authors: {
                    type: 'array',
                    arrayOf: 'number',
                }
            }
        });
    }
}