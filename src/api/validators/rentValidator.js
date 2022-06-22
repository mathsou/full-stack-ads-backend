const validator = require('../../utils/validator');
module.exports = {
    createRentValidator(body){
        return validator({
            data: body,
            fields: {
                bookId: {
                    required: true,
                    type: 'number'
                },
                userId: {
                    required: true,
                    type: 'number'
                },
            }
        });
    },
    updateRentValidator(body){
        return validator({
            data: body,
            fields: {
                bookId: {
                    type: 'number'
                },
                userId: {
                    type: 'number'
                },
            }
        });
    }
}