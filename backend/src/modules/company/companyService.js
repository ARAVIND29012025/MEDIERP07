const db = require("../../config/db");

// ==========================
// Get All Companies
// ==========================
const getAllCompanies = async () => {

    const [rows] = await db.execute(`
        SELECT
            id,
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
            status,
            created_at
        FROM companies
        ORDER BY company_name ASC
    `);

    return rows;

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

module.exports = {
    getAllCompanies,
    getCompanyById,
    addCompany
};