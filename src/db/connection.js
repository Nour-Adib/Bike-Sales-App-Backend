// get the client
const { Sequelize } = require('sequelize');
require('dotenv').config({ path: 'src/config/.env.test' })

// create the connection to database
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql'
});

async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { connectToDatabase, sequelize };