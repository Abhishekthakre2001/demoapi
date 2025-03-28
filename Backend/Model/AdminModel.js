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

module.exports = { addAdmin, getAdminById, updateAdmin, deleteAdmin, findAdminByUsername };
