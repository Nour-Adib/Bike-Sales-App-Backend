const User = require("../models/user");
const { decodeToken } = require('../services/token.service');


const auth = async function(req, res, next) {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = decodeToken(token);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send("Error: Please authenticate");
    }
}

module.exports = auth;