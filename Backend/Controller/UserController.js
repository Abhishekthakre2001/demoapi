const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { adduser, getuser, updateuser, deleteuser, findUserByUsername } = require("../Model/UsereModel")



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
            status:req.body.status
        };
        console.log(reqdata)
        const saveuser = await adduser(reqdata);
        return res.status(200).json({
            success: true,
            data: saveuser,
            message: "User Added Successfuly"
        })
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function getusers(req, res) {
    try {
        const id = req.params.id;
        console.log("req controller", req.params.id)
        const users = await getuser(id);

        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({
            success: true,
            data: users,
            message: "User Selected Successfully"
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function updateusers(req, res) {
    try {
        console.log("id", req.params.id)
        console.log("req body", req.body)
        const update = await updateuser(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            data: update,
            message: "Update Successfully"
        })
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

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
            data: deleteusers,
            message: "User Delete Successfully"
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

const loginUser = async (req, res) => {
    const { Username, Password } = req.body;

    if (!Username || !Password) {
        return res.status(400).json({ success: false, message: "Username and Password are required" });
    }

    try {

        const user = await findUserByUsername(Username);
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid Username or Password" });
        }


        const isMatch = await bcrypt.compare(String(Password), String(user.Password));

        if (!user || !(await bcrypt.compare(Password, user.Password))) {
            return res.status(401).json({ success: false, message: "Invalid Username or Password" });
        }

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

module.exports = { saveuser, getusers, updateusers, deleteusers, loginUser };