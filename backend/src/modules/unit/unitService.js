const db = require("../../config/db");

// =======================================
// Get Unit List
// =======================================
const getAllUnits = async (search = "", page = 1, limit = 10) => {

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const offset = (page - 1) * limit;
    const searchText = `%${search}%`;

    const [rows] = await db.execute(
        `SELECT
            id,
            unit_code,
            unit_name,
            short_name,
            status,
            created_at
        FROM units
        WHERE
            unit_name LIKE ?
            OR unit_code LIKE ?
        ORDER BY unit_name
        LIMIT ${limit} OFFSET ${offset}`,
        [searchText, searchText]
    );

    const [count] = await db.execute(
        `SELECT COUNT(*) total
         FROM units
         WHERE
            unit_name LIKE ?
            OR unit_code LIKE ?`,
        [searchText, searchText]
    );

    return {
        total: count[0].total,
        data: rows
    };

};

// =======================================
// Add Unit
// =======================================
const addUnit = async (unit) => {

    const [code] = await db.execute(
        "SELECT id FROM units WHERE unit_code=?",
        [unit.unit_code]
    );

    if (code.length > 0) {

        return {
            success: false,
            message: "Unit Code Already Exists"
        };

    }

    const [name] = await db.execute(
        "SELECT id FROM units WHERE unit_name=?",
        [unit.unit_name]
    );

    if (name.length > 0) {

        return {
            success: false,
            message: "Unit Name Already Exists"
        };

    }

    await db.execute(
        `INSERT INTO units
        (
            unit_code,
            unit_name,
            short_name,
            status
        )
        VALUES
        (
            ?,?,?,?
        )`,
        [
            unit.unit_code,
            unit.unit_name,
            unit.short_name,
            unit.status
        ]
    );

    return {

        success: true,

        message: "Unit Added Successfully"

    };

};

module.exports = {

    getAllUnits,

    addUnit

};