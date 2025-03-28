<<<<<<< Updated upstream
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
=======
const db = require("../config/db");

// Add Admin
const addAdmin = async (adminData) => {
    const query = `INSERT INTO admin (Name, Password, Username, Phone_Number) 
                   VALUES (?, ?, ?, ?)`;
    const values = [
        adminData.Name,
        adminData.Password,
        adminData.Username,
        adminData.Phone_Number
    ];

    const [result] = await db.execute(query, values);
    return result;
};

// Get Admin by ID
const getAdminById = async (id) => {
    const [rows] = await db.execute("SELECT * FROM admin WHERE id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
};

// Update Admin
const updateAdmin = async (id, updatedData) => {
    const query = `UPDATE admin SET Name=?, Password=?, Username=?, Phone_Number=? WHERE id=?`;
    const values = [
        updatedData.Name,
        updatedData.Password,
        updatedData.Username,
        updatedData.Phone_Number,
        id
    ];

    const [result] = await db.execute(query, values);
    return result;
};

// Delete Admin
const deleteAdmin = async (id) => {
    const [result] = await db.execute("DELETE FROM admin WHERE id = ?", [id]);
    return result;
};

// Find Admin by Username
const findAdminByUsername = async (Username) => {
    const [rows] = await db.execute("SELECT * FROM admin WHERE Username = ?", [Username]);
    return rows.length > 0 ? rows[0] : null;
};
>>>>>>> Stashed changes

module.exports = { addAdmin, getAdminById, updateAdmin, deleteAdmin, findAdminByUsername };
