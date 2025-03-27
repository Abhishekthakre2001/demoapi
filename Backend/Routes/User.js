const express = require('express');
const router = express.Router();
const { saveuser, getusers, updateusers, deleteusers, loginUser  } = require("../Controller/UserController")

router.post('/adduser', saveuser); 
router.get('/getuser/:id', getusers );
router.put('/updateuser/:id', updateusers );
router.delete('/deleteusers/:id', deleteusers);
router.post("/login", loginUser);

module.exports = router;