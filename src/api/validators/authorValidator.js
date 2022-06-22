const validator = require('../../utils/validator');
module.exports = {
    createAuthorValidator(body){
        return validator({
            data: body,
            fields: {
                name: {
                    required: true,
                    type: 'string',
                    length: 80,
                },
                country: {
                    required: true,
                    type: 'string',
                    length: 30,
                },
            }
        });
    },
    updateAuthorValidator(body){
        return validator({
            data: body,
            fields: {
                name: {
                    type: 'string',
                    length: 80,
                },
                country: {
                    type: 'string',
                    length: 330,
                },
            }
        });
    }
}