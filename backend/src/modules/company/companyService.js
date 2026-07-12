const db = require("../../config/db");

const getAllCompanies = async (search = "", page = 1, limit = 10) => {

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const offset = (page - 1) * limit;
    const searchText = `%${search}%`;

    const sql = `
        SELECT
            id,
            company_code,
            company_name,
            contact_person,
            mobile,
            email,
            gst_no,
            city,
            state,
            status
        FROM companies
        WHERE company_name LIKE ?
           OR company_code LIKE ?
        ORDER BY company_name
        LIMIT ${limit} OFFSET ${offset}
    `;

    const [rows] = await db.execute(sql, [
        searchText,
        searchText
    ]);

    const [count] = await db.execute(
        `SELECT COUNT(*) AS total
         FROM companies
         WHERE company_name LIKE ?
            OR company_code LIKE ?`,
        [
            searchText,
            searchText
        ]
    );

    return {
        total: count[0].total,
        data: rows
    };
};
// ==========================
// Get Company By ID
// ==========================
const getCompanyById = async (id) => {

    const [rows] = await db.execute(
        `SELECT *
         FROM companies
         WHERE id=?`,
        [id]
    );

    return rows[0];

};

// ==========================
// Add Company
// ==========================
const addCompany = async (company) => {

    const [code] = await db.execute(
        "SELECT id FROM companies WHERE company_code=?",
        [company.company_code]
    );

    if (code.length > 0) {
        return {
            success: false,
            message: "Company Code Already Exists"
        };
    }

    const [name] = await db.execute(
        "SELECT id FROM companies WHERE company_name=?",
        [company.company_name]
    );

    if (name.length > 0) {
        return {
            success: false,
            message: "Company Name Already Exists"
        };
    }

    await db.execute(
        `INSERT INTO companies
        (
            company_code,
            company_name,
            contact_person,
            mobile,
            email,
            gst_no,
            dl_no,
            address,
            city,
            state,
            pincode,
            status
        )
        VALUES
        (?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
            company.company_code,
            company.company_name,
            company.contact_person,
            company.mobile,
            company.email,
            company.gst_no,
            company.dl_no,
            company.address,
            company.city,
            company.state,
            company.pincode,
            company.status
        ]
    );

    return {
        success: true,
        message: "Company Added Successfully"
    };

};

// ==========================
// Update Company
// ==========================
const updateCompany = async (id, company) => {

    const [rows] = await db.execute(
        `SELECT id
         FROM companies
         WHERE id = ?`,
        [id]
    );

    if (rows.length === 0) {
        return {
            success: false,
            message: "Company Not Found"
        };
    }

    await db.execute(
        `UPDATE companies
        SET
            company_code = ?,
            company_name = ?,
            contact_person = ?,
            mobile = ?,
            email = ?,
            gst_no = ?,
            dl_no = ?,
            address = ?,
            city = ?,
            state = ?,
            pincode = ?,
            status = ?
        WHERE id = ?`,
        [
            company.company_code,
            company.company_name,
            company.contact_person,
            company.mobile,
            company.email,
            company.gst_no,
            company.dl_no,
            company.address,
            company.city,
            company.state,
            company.pincode,
            company.status,
            id
        ]
    );

    return {
        success: true,
        message: "Company Updated Successfully"
    };
};

// ==========================
// Delete Company (Soft Delete)
// ==========================
const deleteCompany = async (id) => {

    const [rows] = await db.execute(
        "SELECT id FROM companies WHERE id=?",
        [id]
    );

    if (rows.length === 0) {

        return {
            success: false,
            message: "Company Not Found"
        };

    }

    await db.execute(
        "UPDATE companies SET status='Inactive' WHERE id=?",
        [id]
    );

    return {
        success: true,
        message: "Company Deactivated Successfully"
    };

};
module.exports = {
    getAllCompanies,
    getCompanyById,
    addCompany,
    updateCompany,
    deleteCompany
};