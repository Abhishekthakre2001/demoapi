const express = require('express');
const router = express.Router();
<<<<<<< Updated upstream
const { saveuser, getusers, updateusers, deleteusers, loginUser  } = require("../Controller/UserController");
const  validateUserData  = require('../Middleware/User')
=======
const { saveuser, getusers, updateusers, deleteusers, loginUser  } = require("../controllers/UserController");
const  validateUserData  = require('../middleware/User')
>>>>>>> Stashed changes

router.post('/adduser', validateUserData, saveuser); 
router.get('/getuser/:id', getusers );
router.put('/updateuser/:id', validateUserData, updateusers );
router.delete('/deleteusers/:id', deleteusers);
router.post("/login", loginUser);

module.exports = router;