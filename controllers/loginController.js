const { DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const db = require('../config/db');
const sequelize = db.sequelize;
const LoginModel = require("../models/adminModel")(sequelize, DataTypes);
require('dotenv').config();


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required."
            });
        }

        // Check if user exists
        const user = await LoginModel.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        }

        // Validate password
        if (password !== user.password) {
            return res.status(401).send({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Generate JWT token
        const token = jwt.sign({ user:user }, process.env.JWT_SECRET, {
            expiresIn: "12457896325896524h",
        });

        return res.status(200).send({
            success: true,
            message: "Login successful.",
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal server error.",
        });
    }
};

module.exports = { Login };
