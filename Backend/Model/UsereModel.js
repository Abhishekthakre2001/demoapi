const db = require("../config/db");

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
