const express = require('express');
require('dotenv').config({ path: 'src/config/.env.test' })

const app = express();

const port = process.env.PORT;
app.listen(port, function() {
    console.log("Server up and running on port", port);
});