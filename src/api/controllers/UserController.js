const User = require('../models/User');

//* GET Users
async function getAll() {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        return error;
    }
}

//* Create User
async function create(user) {
    try {
        console.log('Creating');
        const newUser = await User.create({ name: user.name, email: user.email, password: user.password });
        return newUser;
    } catch (error) {
        return error;
    }
}

module.exports = { getAll, create };