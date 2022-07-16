const bcrypt = require('bcryptjs');

async function encryptPassword(user) {
    if (!user.changed('password')) {
        return 0;
    }
    const SALT_FACTOR = 10;
    user.password = await bcrypt.hash(user.password, SALT_FACTOR);
}

async function comparePasswords(inputedPassword, hashedPassword) {
    return await bcrypt.compare(inputedPassword, hashedPassword);
}

module.exports = { encryptPassword, comparePasswords };