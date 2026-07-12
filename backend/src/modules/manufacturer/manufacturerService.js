const db = require("../../config/db");

// ===============================
// Get Manufacturer List
// ===============================
const getAllManufacturers = async (search = "", page = 1, limit = 10) => {

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const offset = (page - 1) * limit;
    const searchText = `%${search}%`;

    const [rows] = await db.execute(
        `SELECT
            id,
            manufacturer_code,
            manufacturer_name,
            mobile,
            email,
            address,
            status,
            created_at
        FROM manufacturers
        WHERE manufacturer_name LIKE ?
           OR manufacturer_code LIKE ?
        ORDER BY manufacturer_name
        LIMIT ${limit} OFFSET ${offset}`,
        [searchText, searchText]
    );

    const [count] = await db.execute(
        `SELECT COUNT(*) total
         FROM manufacturers
         WHERE manufacturer_name LIKE ?
            OR manufacturer_code LIKE ?`,
        [searchText, searchText]
    );

    return {
        total: count[0].total,
        data: rows
    };
};

// ===============================
// Add Manufacturer
// ===============================
const addManufacturer = async (manufacturer) => {

    const [code] = await db.execute(
        "SELECT id FROM manufacturers WHERE manufacturer_code=?",
        [manufacturer.manufacturer_code]
    );

    if (code.length > 0) {
        return {
            success: false,
            message: "Manufacturer Code Already Exists"
        };
    }

    const [name] = await db.execute(
        "SELECT id FROM manufacturers WHERE manufacturer_name=?",
        [manufacturer.manufacturer_name]
    );

    if (name.length > 0) {
        return {
            success: false,
            message: "Manufacturer Name Already Exists"
        };
    }

    await db.execute(
        `INSERT INTO manufacturers
        (
            manufacturer_code,
            manufacturer_name,
            mobile,
            email,
            address,
            status
        )
        VALUES
        (
            ?,?,?,?,?,?
        )`,
        [
            manufacturer.manufacturer_code,
            manufacturer.manufacturer_name,
            manufacturer.mobile,
            manufacturer.email,
            manufacturer.address,
            manufacturer.status
        ]
    );

    return {
        success: true,
        message: "Manufacturer Added Successfully"
    };
};

module.exports = {
    getAllManufacturers,
    addManufacturer
};