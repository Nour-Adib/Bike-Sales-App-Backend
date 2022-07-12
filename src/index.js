const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'src/config/.env.development.local' });
const { connectToDatabase } = require('./db/connection');
const userRouter = require('./api/routers/user');

const app = express();

connectToDatabase();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(userRouter); //Using the router

const port = process.env.PORT;
app.listen(port, function() {
    console.log("Server up and running on port", port);
});