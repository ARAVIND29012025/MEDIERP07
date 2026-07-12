const db = require("../../config/db");

// ==========================
// Category List
// ==========================
const getAllCategories = async (search = "", page = 1, limit = 10) => {

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const offset = (page - 1) * limit;
    const searchText = `%${search}%`;

    const [rows] = await db.execute(
        `SELECT
            id,
            category_code,
            category_name,
            description,
            status,
            created_at
        FROM categories
        WHERE
            category_name LIKE ?
            OR category_code LIKE ?
        ORDER BY category_name
        LIMIT ${limit} OFFSET ${offset}`,
        [searchText, searchText]
    );

    const [count] = await db.execute(
        `SELECT COUNT(*) total
         FROM categories
         WHERE
            category_name LIKE ?
            OR category_code LIKE ?`,
        [searchText, searchText]
    );

    return {
        total: count[0].total,
        data: rows
    };
};

// ==========================
// Add Category
// ==========================
const addCategory = async (category) => {

    const [code] = await db.execute(
        "SELECT id FROM categories WHERE category_code=?",
        [category.category_code]
    );

    if (code.length > 0) {
        return {
            success: false,
            message: "Category Code Already Exists"
        };
    }

    const [name] = await db.execute(
        "SELECT id FROM categories WHERE category_name=?",
        [category.category_name]
    );

    if (name.length > 0) {
        return {
            success: false,
            message: "Category Name Already Exists"
        };
    }

    await db.execute(
        `INSERT INTO categories
        (
            category_code,
            category_name,
            description,
            status
        )
        VALUES
        (
            ?,?,?,?
        )`,
        [
            category.category_code,
            category.category_name,
            category.description,
            category.status
        ]
    );

    return {
        success: true,
        message: "Category Added Successfully"
    };
};

module.exports = {
    getAllCategories,
    addCategory
};