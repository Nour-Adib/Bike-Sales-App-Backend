const jwt = require("jsonwebtoken");

function createToken(user) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return token;
}

function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return 'Error: Please Authenticate'
    }
}

module.exports = { createToken, decodeToken };