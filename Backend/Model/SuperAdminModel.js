const db = require("../Config/db");

const findSuperAdminByUsername = async (Username) => {
    const [rows] = await db.execute("SELECT * FROM `superadmin` WHERE `Username` = ?", [Username]);
    return rows.length > 0 ? rows[0] : null;
};

module.exports = { findSuperAdminByUsername };
