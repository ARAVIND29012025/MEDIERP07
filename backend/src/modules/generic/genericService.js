const db = require("../../config/db");

// ===============================
// Get Generic List
// ===============================
const getAllGenerics = async (search = "", page = 1, limit = 10) => {

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const offset = (page - 1) * limit;
    const searchText = `%${search}%`;

    const [rows] = await db.execute(
        `SELECT
            id,
            generic_code,
            generic_name,
            description,
            status,
            created_at
        FROM generics
        WHERE generic_name LIKE ?
           OR generic_code LIKE ?
        ORDER BY generic_name
        LIMIT ${limit} OFFSET ${offset}`,
        [searchText, searchText]
    );

    const [count] = await db.execute(
        `SELECT COUNT(*) total
         FROM generics
         WHERE generic_name LIKE ?
            OR generic_code LIKE ?`,
        [searchText, searchText]
    );

    return {
        total: count[0].total,
        data: rows
    };
};

// ===============================
// Add Generic
// ===============================
const addGeneric = async (generic) => {

    const [code] = await db.execute(
        "SELECT id FROM generics WHERE generic_code=?",
        [generic.generic_code]
    );

    if (code.length > 0) {
        return {
            success: false,
            message: "Generic Code Already Exists"
        };
    }

    const [name] = await db.execute(
        "SELECT id FROM generics WHERE generic_name=?",
        [generic.generic_name]
    );

    if (name.length > 0) {
        return {
            success: false,
            message: "Generic Name Already Exists"
        };
    }

    await db.execute(
        `INSERT INTO generics
        (
            generic_code,
            generic_name,
            description,
            status
        )
        VALUES
        (?,?,?,?)`,
        [
            generic.generic_code,
            generic.generic_name,
            generic.description,
            generic.status
        ]
    );

    return {
        success: true,
        message: "Generic Added Successfully"
    };
};

module.exports = {
    getAllGenerics,
    addGeneric
};