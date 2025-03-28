const mysql = require("mysql2/promise"); // Use promise-based MySQL

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "skai-voice",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Check MySQL Connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ MySQL Connected Successfully");
        connection.release(); // Release connection
    } catch (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
    }
})();

module.exports = pool;
