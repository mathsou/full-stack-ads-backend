
module.exports = {
    async create(req, res) {
        res.status(200).json(req.query);
    }
}