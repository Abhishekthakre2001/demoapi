const express = require('express');
const router = express.Router();
const { saveuser, getusers, updateusers, deleteusers, loginUser  } = require("../Controller/UserController");
const  validateUserData  = require('../Middleware/User')

router.post('/adduser', validateUserData, saveuser); 
router.get('/getuser/:id', getusers );
router.put('/updateuser/:id', validateUserData, updateusers );
router.delete('/deleteusers/:id', deleteusers);
router.post("/login", loginUser);

module.exports = router;