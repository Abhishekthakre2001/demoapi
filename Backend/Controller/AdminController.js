const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { addAdmin, getAdminById, updateAdmin, deleteAdmin, findAdminByUsername } = require("../Model/AdminModel");

// Create Admin
async function saveAdmin(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
        const reqData = { ...req.body, Password: hashedPassword };

        const newAdmin = await addAdmin(reqData);
        return res.status(200).json({
            success: true,
            data: newAdmin,
            message: "Admin Added Successfully"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
}

// Get Admin by ID
async function getAdmin(req, res) {
    try {
        const admin = await getAdminById(req.params.id);
        if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

        return res.status(200).json({ success: true, data: admin, message: "Admin Retrieved Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
}

// Update Admin
async function updateAdminDetails(req, res) {
    try {
        const updatedAdmin = await updateAdmin(req.params.id, req.body);
        return res.status(200).json({ success: true, data: updatedAdmin, message: "Admin Updated Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
}

// Delete Admin
async function deleteAdminById(req, res) {
    try {
        const result = await deleteAdmin(req.params.id);
        if (!result.affectedRows) return res.status(404).json({ success: false, message: "Admin not found" });

        return res.status(200).json({ success: true, message: "Admin Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
}

// Admin Login
const adminLogin = async (req, res) => {
    const { Username, Password } = req.body;
    if (!Username || !Password) return res.status(400).json({ success: false, message: "Username and Password are required" });

    try {
        const admin = await findAdminByUsername(Username);
        if (!admin) return res.status(401).json({ success: false, message: "Invalid Username or Password" });

        const isMatch = await bcrypt.compare(Password, admin.Password);
        if (!isMatch) return res.status(401).json({ success: false, message: "Invalid Username or Password" });

        const token = jwt.sign({ id: admin.id, Username: admin.Username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            admin: { id: admin.id, Name: admin.Name, Username: admin.Username, Phone_Number: admin.Phone_Number }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
};

module.exports = { saveAdmin, getAdmin, updateAdminDetails, deleteAdminById, adminLogin };
