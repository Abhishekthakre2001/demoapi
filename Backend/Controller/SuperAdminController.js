const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { findSuperAdminByUsername } = require("../Model/SuperAdminModel");

const superadminlogin = async (req, res) => {
    const { Username, Password } = req.body;

    if (!Username || !Password) {
        return res.status(400).json({ success: false, message: "Username and Password are required" });
    }
    try {
        const user = await findSuperAdminByUsername(Username);

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid Username or Password" });
        }

        if (Password !== user.Password) {
            return res.status(401).json({ success: false, message: "Invalid Username or Password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id, Username: user.Username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                Name: user.Name,
                Username: user.Username,
                Phone_Number: user.Phone_Number
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

module.exports = { superadminlogin };
