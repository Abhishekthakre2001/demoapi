const db = require("../Config/db");

// Add Admin
async function addAdmin(reqData) {
    const sql = "INSERT INTO `Admin` (`Name`, `Username`, `Password`, `App_ID`, `Token_ID`, `Channel_ID`, `Phone_Number`, `status`, `Limit`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        reqData.Name,
        reqData.Username,
        reqData.Password,
        reqData.App_ID,
        reqData.Token_ID,
        reqData.Channel_ID,
        reqData.Phone_Number,
        reqData.status,
        reqData.Limit
    ];
    const [result] = await db.execute(sql, values);
    return result;
}

// Get Admin by ID
async function getAdminById(id) {
    const [rows] = await db.execute("SELECT * FROM `Admin` WHERE `id` = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
}

// Update Admin
async function updateAdmin(id, body) {
    const { Name, Username, Password, App_ID, Token_ID, Channel_ID, Phone_Number, status, Limit } = body;
    const sql = "UPDATE `Admin` SET Name = ?, Username = ?, Password = ?, App_ID = ?, Token_ID = ?, Channel_ID = ?, Phone_Number = ?, status = ?, `Limit` = ? WHERE id = ?";
    const values = [Name, Username, Password, App_ID, Token_ID, Channel_ID, Phone_Number, status, Limit, id];
    const [result] = await db.execute(sql, values);
    return result;
}

// Delete Admin
async function deleteAdmin(id) {
    const [result] = await db.execute("DELETE FROM `Admin` WHERE id = ?", [id]);
    return result;
}

// Find Admin by Username (For Login)
async function findAdminByUsername(Username) {
    const [rows] = await db.execute("SELECT * FROM `Admin` WHERE `Username` = ?", [Username]);
    return rows.length > 0 ? rows[0] : null;
}

module.exports = { addAdmin, getAdminById, updateAdmin, deleteAdmin, findAdminByUsername };
