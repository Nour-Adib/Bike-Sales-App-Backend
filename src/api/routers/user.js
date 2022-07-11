const express = require("express");
const User = require("../models/user");
const { getAll, create } = require('../controllers/UserController');
const router = new express.Router();

//* User GET Routes
//* get all users
router.get("/users", async function(req, res) {
    try {
        const users = await getAll();
        res.send(users);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

//* User POST Routes
//* create a user
router.post("/users", async function(req, res) {
    try {
        const user = await create(req.body);

        if (user.parent != null && user.parent.code === 'ER_DUP_ENTRY') {
            res.status(400).send(`User ${req.body.email} Already Exists`);
        } else {
            res.status(201).send(user);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;