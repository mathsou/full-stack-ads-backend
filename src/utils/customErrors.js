module.exports = class CustomError extends Error {
    constructor(message, options = {}) {
        super(message);
        const { validation = false, code = 400 } = options;
        this.validation = validation;
        this.code = code
        this.output = { msg: this.message };
    }
}