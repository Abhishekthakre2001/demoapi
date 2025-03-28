const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { adduser, getuser, updateuser, deleteuser, findUserByUsername } = require("../Model/UsereModel");

// Create User (Register)
async function saveuser(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
        const reqdata = {
            Name: req.body.Name,
            Token_ID: req.body.Token_ID,
            Password: hashedPassword,
            Channel_ID: req.body.Channel_ID,
            Username: req.body.Username,
            App_ID: req.body.App_ID,
            Phone_Number: req.body.Phone_Number,
            status: req.body.status
        };

        console.log("User Data:", reqdata);
        const saveuser = await adduser(reqdata);
        
        return res.status(201).json({
            success: true,
            data: saveuser,
            message: "User Added Successfully"
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Get User by ID
async function getusers(req, res) {
    try {
        const id = req.params.id;
        console.log("Fetching User ID:", id);
        const user = await getuser(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            data: user,
            message: "User Retrieved Successfully"
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Update User
async function updateusers(req, res) {
    try {
        console.log("Updating ID:", req.params.id);
        console.log("Request Body:", req.body);

        let updatedData = { ...req.body };

        // Fetch existing user details to avoid overwriting hashed passwords
        const existingUser = await getuser(req.params.id);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Hash password if provided
        if (req.body.Password) {
            updatedData.Password = await bcrypt.hash(req.body.Password, 10);
        } else {
            updatedData.Password = existingUser.Password; // Keep existing hashed password
        }

        const update = await updateuser(req.params.id, updatedData);

        return res.status(200).json({
            success: true,
            data: update,
            message: "User Updated Successfully"
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Delete User
async function deleteusers(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ success: false, message: "ID is required" });
    }

    try {
        const result = await deleteuser(id);
        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

// User Login
async function loginUser(req, res) {
    const { Username, Password } = req.body;

    if (!Username || !Password) {
        return res.status(400).json({ success: false, message: "Username and Password are required" });
    }

    try {
        const user = await findUserByUsername(Username);
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid Username or Password" });
        }

        // Compare input password with stored hashed password
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid Username or Password" });
        }

        const token = jwt.sign({ id: user.id, Username: user.Username }, process.env.JWT_SECRET, { expiresIn: "1h" });

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
        return res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
}

module.exports = { saveuser, getusers, updateusers, deleteusers, loginUser };
