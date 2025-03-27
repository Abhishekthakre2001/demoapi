const db = require("../Config/db");

async function adduser(req, res) {
    const addemp = await db.execute("INSERT INTO `User`(`Name`, `Token_ID`, `Password`, `Channel_ID`, `Username`, `App_ID`, `Phone_Number`) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
        [req.Name, req.Token_ID, req.Password, req.Channel_ID, req.Username, req.App_ID, req.Phone_Number]);
    return addemp;
}

async function getuser(req, res) {
    console.log(req)
    const [getuser] = await db.execute('SELECT * FROM `User` WHERE id = ?', [req]);
    return getuser;
}

async function updateuser(id, body){
    console.log("req in model",id, "body",body)
    const {Name, Token_ID, Password, Channel_ID, Username, App_ID, Phone_Number} = body;
    const updateuser = await db.execute("UPDATE User SET Name = ?, Token_ID = ?, Password = ?, Channel_ID = ?, Username = ?, App_ID = ?, Phone_Number = ?  WHERE id = ?",[Name, Token_ID, Password, Channel_ID, Username, App_ID, Phone_Number, id]);
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
};

module.exports = { adduser, getuser, updateuser, deleteuser, findUserByUsername };