const jwt = require('./jwt');
const { promisify } = require("util");
const { Console } = require('console');

module.exports = 
    async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ error: "No token provided" });
        }

        const [scheme, token] = authHeader.split(" ");

        try {
            const decoded = await jwt.verify(token);
            res.locals.payload = decoded;
            return next();
        } catch (err) {
            return res.status(401).send({ error: "Token invalid" });
    }
};