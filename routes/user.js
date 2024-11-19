const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db");
const { default: mongoose } = require("mongoose");

router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username, 
        password
    })

    res.json({
        message: "User created successfully"
    })
});

router.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
        username: username,
        password: password
    })
    .then(function(value) {
        if (value) {
            res.status(403).json({
                msg: "User  exist"
            })
        } else {
            res.status(403).json({
                msg: "User doesnt exist"
            })
        }
    })
});


module.exports = router