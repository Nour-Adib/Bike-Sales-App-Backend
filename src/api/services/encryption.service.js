const bcrypt = require('bcryptjs');
const saltRounds = 10;

async function encryptPassword(user) {
    if (!user.changed('password')) {
        return 0;
    }
    const SALT_FACTOR = 10;
    user.password = await bcrypt.hash(user.password, SALT_FACTOR);
}

function comparePasswords(inputedPassword, hashedPassword) {
    bcrypt.compare(inputedPassword, hashedPassword, function(error, result) {
        if (error) {
            console.log(error);
        } else {
            return result;
        }
    });
}

module.exports = { encryptPassword, comparePasswords };