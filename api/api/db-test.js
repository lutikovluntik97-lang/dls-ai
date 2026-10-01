const db = require("./db");

module.exports = async (req, res) => {
    try {
        const result = await db.execute("SELECT 1 AS ok");

        res.status(200).json({
            success: true,
            database: "Turso",
            result: result.rows
        });
    } catch (error) {
        console.error("Turso error:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};