const db = require("../config/db");

<<<<<<< Updated upstream
async function adduser(req, res) {
    const addemp = await db.execute("INSERT INTO `User`(`Name`, `Token_ID`, `Password`, `Channel_ID`, `Username`, `App_ID`, `Phone_Number`, `status`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)",
        [req.Name, req.Token_ID, req.Password, req.Channel_ID, req.Username, req.App_ID, req.Phone_Number, req.status]);
    return addemp;
}

async function getuser(req, res) {
    console.log(req)
    const [getuser] = await db.execute('SELECT * FROM `User` WHERE id = ?', [req]);
    return getuser;
}

async function updateuser(id, body){
    console.log("req in model",id, "body",body)
    const {Name, Token_ID, Password, Channel_ID, Username, App_ID, Phone_Number, status} = body;
    const updateuser = await db.execute("UPDATE User SET Name = ?, Token_ID = ?, Password = ?, Channel_ID = ?, Username = ?, App_ID = ?, Phone_Number = ? , status = ?  WHERE id = ?",[Name, Token_ID, Password, Channel_ID, Username, App_ID, Phone_Number, status, id]);
   return updateuser;
}

async function deleteuser(req, res) {
    console.log(req)
    const [deleteuser] = await db.execute('DELETE FROM `User` WHERE id = ?', [req]);
    return deleteuser;
}

const findUserByUsername = async (Username) => {
    const [user] = await db.execute("SELECT * FROM `User` WHERE `Username` = ?", [Username]);
    return user.length > 0 ? user[0] : null;
=======
// Add User
const adduser = async (userData) => {
    const query = `INSERT INTO user (Name, Token_ID, Password, Channel_ID, Username, App_ID, Phone_Number, status) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        userData.Name,
        userData.Token_ID,
        userData.Password,
        userData.Channel_ID,
        userData.Username,
        userData.App_ID,
        userData.Phone_Number,
        userData.status
    ];

    const [result] = await db.execute(query, values);
    return result;
>>>>>>> Stashed changes
};

// Get User by ID
const getuser = async (id) => {
    const [rows] = await db.execute("SELECT * FROM user WHERE id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
};

// Update User
const updateuser = async (id, updatedData) => {
    const query = `UPDATE user SET Name=?, Token_ID=?, Password=?, Channel_ID=?, Username=?, App_ID=?, Phone_Number=?, status=? WHERE id=?`;
    const values = [
        updatedData.Name,
        updatedData.Token_ID,
        updatedData.Password,
        updatedData.Channel_ID,
        updatedData.Username,
        updatedData.App_ID,
        updatedData.Phone_Number,
        updatedData.status,
        id
    ];

    const [result] = await db.execute(query, values);
    return result;
};

// Delete User
const deleteuser = async (id) => {
    const [result] = await db.execute("DELETE FROM user WHERE id = ?", [id]);
    return result;
};

// Find User by Username
const findUserByUsername = async (Username) => {
    const [rows] = await db.execute("SELECT * FROM user WHERE Username = ?", [Username]);
    return rows.length > 0 ? rows[0] : null;
};

module.exports = { adduser, getuser, updateuser, deleteuser, findUserByUsername };
