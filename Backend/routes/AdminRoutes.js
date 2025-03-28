const express = require("express");
const { saveAdmin, getAdmin, updateAdminDetails, deleteAdminById, adminLogin } = require("../controllers/AdminController");
const validateUserData = require('../middleware/User');

const router = express.Router();

router.post("/addadmin", validateUserData, saveAdmin);
router.get("/getadmin/:id", getAdmin);
router.put("/updateadmin/:id", validateUserData, updateAdminDetails);
router.delete("/deleteadmin/:id", deleteAdminById);
router.post("/login", adminLogin);

module.exports = router;
