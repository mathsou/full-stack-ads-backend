const validator = require('../../utils/validator');
module.exports = {
    createPublisherValidator(body){
        return validator({
            data: body,
            fields: {
                name: {
                    required: true,
                    type: 'string',
                    length: 30,
                },
            }
        });
    },
    updatePublisherValidator(body){
        return validator({
            data: body,
            fields: {
                name: {
                    type: 'string',
                    length: 30,
                },
            }
        });
    }
}