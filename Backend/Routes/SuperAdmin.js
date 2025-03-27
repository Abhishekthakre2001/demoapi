const express = require('express');
const router = express.Router();
const { superadminlogin } = require('../Controller/SuperAdminController')


router.post("/login", superadminlogin);

module.exports = router;