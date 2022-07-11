const { Sequelize, DataTypes } = require('sequelize');
const bcryptSevice = require('../services/encryption.service');
const { sequelize } = require('../../db/connection');

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            isLowercase: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

User.beforeCreate(async(user, options) => {
    await bcryptSevice.encryptPassword(user);
});


module.exports = User;