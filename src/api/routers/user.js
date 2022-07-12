const express = require("express");
const User = require("../models/user");
const multer = require("multer");
const sharp = require("sharp");
const { getAll, create, addAvatar, getWithCredentials } = require('../controllers/UserController');
const { createToken, decodeToken } = require('../services/token.service');
const auth = require('../middleware/authentication');
const router = new express.Router();

//* User GET Routes
//* get all users
router.get("/users", auth, async function(req, res) {
    try {
        const users = await getAll();
        res.send(users);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

//* get specific users
router.get("/users/me", auth, async function(req, res) {
    try {
        const returnedUser = {
            name: req.user.name,
            email: req.user.email,
            picture: req.user.picture
        }
        res.send(returnedUser);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

//* User POST Routes
//* create a user
router.post("/users", auth, async function(req, res) {
    try {
        const user = await create(req.body);
        const token = createToken(user);

        if (user.parent != null && user.parent.code === 'ER_DUP_ENTRY') {
            res.status(400).send(`User ${req.body.email} Already Exists`);
        } else {
            res.status(201).send({ user, token });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//* Login a user
router.post("/users/login", async function(req, res) {

    try {
        var user = null;

        if (!req.body.email) {
            throw Error('Invalid Email');
        }

        if (!req.body.password) {
            throw Error('Invalid Password');
        }

        await getWithCredentials(req.body).then((value) => {
            user = value;
        });

        if (user != null) {
            const token = createToken(user);
            res.send(token);
        } else {
            res.status(400).send('wrong email or password');
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

//File validation
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            return callback(new Error("File must be an image"));
        }

        callback(undefined, true);
    }
});

router.post("/users/me/avatar", auth, upload.single("avatar"), async function(req, res) {
    //req.user.avatar = req.file.buffer;
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

    const userID = decodeToken(req.header("Authorization").replace("Bearer ", ""));

    await addAvatar(userID.id, buffer);

    res.status(200).send();
}, function(error, req, res, next) {
    res.status(400).send({ error: error.message });
});


module.exports = router;