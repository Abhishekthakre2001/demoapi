<<<<<<< Updated upstream
const db = require("../Config/db");

const findSuperAdminByUsername = async (Username) => {
    const [rows] = await db.execute("SELECT * FROM `superadmin` WHERE `Username` = ?", [Username]);
    return rows.length > 0 ? rows[0] : null;
=======
const db = require("../config/db");

const findSuperAdminByUsername = async (Username) => {
    try {
        const [rows] = await db.execute("SELECT * FROM `superadmin` WHERE `Username` = ?", [Username]);
        console.log("Database Query Result:", rows); // Debugging output

        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("Database Query Error:", error);
        throw error;
    }
>>>>>>> Stashed changes
};

module.exports = { findSuperAdminByUsername };
