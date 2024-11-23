'use strict';
import Users from "../models/User.js";
import jwt from "jsonwebtoken";
class LoginController   {

    signin = async (req, res) => {
        try {
            const { username, password } = req.body;
    
            const user = await Users.findOne({ username, password });
    
            if (user) {
                const token = jwt.sign(
                    { username: user.username, id: user._id }, 
                    process.env.JWT_SECRET, 
                    { expiresIn: '1h' } 
                );
    
                return res.status(200).json({
                    message: "User signed in successfully",
                    token,
                });
            } else {
                return res.status(403).json({ message: "Invalid username or password." });
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            res.status(500).json({ message: "An error occurred during sign-in." });
        }
    };

    signup = async (req, res) => {

        try {
            const { username, password } = req.body;

        const existingUser = await Users.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists. Please choose a different username." });
        }

        const newUser = await Users.create({ username, password });

            return  res.status(201).json({
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
    };

    
}

export default new LoginController();