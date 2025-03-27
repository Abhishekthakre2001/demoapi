const express = require("express");
const { saveAdmin, getAdmin, updateAdminDetails, deleteAdminById, adminLogin } = require("../Controller/AdminController");
const validateUserData = require('../Middleware/User');

const router = express.Router();

router.post("/addadmin", validateUserData, saveAdmin);
router.get("/getadmin/:id", getAdmin);
router.put("/updateadmin/:id", validateUserData, updateAdminDetails);
router.delete("/deleteadmin/:id", deleteAdminById);
router.post("/login", adminLogin);

module.exports = router;
