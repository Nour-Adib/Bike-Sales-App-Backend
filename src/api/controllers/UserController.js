const User = require('../models/User');
const { comparePasswords } = require('../services/encryption.service');
const { uploadImageFile, updateImageFile } = require('../services/fileStorage.service');

//* GET Users
async function getAll() {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        return error;
    }
}

//* Get User with email and password
async function getWithCredentials(user) {
    const foundUser = await User.findOne({ where: { email: user.email } });

    if (foundUser == null) {
        return null;
    } else {
        const isMatched = await comparePasswords(user.password, foundUser.password);

        if (!isMatched) {
            return null;
        }

        return foundUser;
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

//* Add Avatar
async function addAvatar(userID, picture) {
    const user = await User.findByPk(userID);

    if (user.pictureURL == null) {
        await uploadImageFile(picture).then((url) => {
            user.set({
                pictureURL: url
            });
        });
    } else {
        await updateImageFile(picture, user.pictureURL).then((url) => {
            user.set({
                pictureURL: url
            });
        });
    }
    await user.save();
}

module.exports = { getAll, create, addAvatar, getWithCredentials };