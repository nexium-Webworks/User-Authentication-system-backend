const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db");
const { default: mongoose } = require("mongoose");

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists. Please choose a different username." });
        }

        const newUser = await User.create({ username, password });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
            },
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "An error occurred while creating the user." });
    }
});

router.post('/signin', (req, res) => {
    const username = req.body.email;
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