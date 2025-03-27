const express = require('express');

const validateUserData = (req, res, next) => {

    const { Name, Token_ID, Password, Channel_ID, Username, App_ID, Phone_Number, status } = req.body;

    if (!Name) return res.status(400).json({ success: false, message: "Name is required" });
    if (!Token_ID) return res.status(400).json({ success: false, message: "Token_ID is required" });
    if (!Password) return res.status(400).json({ success: false, message: "Password is required" });
    if (!Channel_ID) return res.status(400).json({ success: false, message: "Channel_ID is required" });
    if (!Username) return res.status(400).json({ success: false, message: "Username is required" });
    if (!App_ID) return res.status(400).json({ success: false, message: "App_ID is required" });
    if (!Phone_Number) return res.status(400).json({ success: false, message: "Phone_Number is required" });
    if (!status) return res.status(400).json({ success: false, message: "Status is required" });

    next(); 
};

module.exports = validateUserData;
