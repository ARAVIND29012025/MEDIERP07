const companyService = require("./companyService");

// ==========================
// Get Company List
// ==========================
const getAllCompanies = async (req, res) => {

    try {

        const companies = await companyService.getAllCompanies();

        return res.status(200).json({
            success: true,
            message: "Company List",
            total: companies.length,
            data: companies
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// ==========================
// Add Company
// ==========================
const addCompany = async (req, res) => {

    try {

        const result = await companyService.addCompany(req.body);

        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.status(201).json(result);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const getCompanyById = async (req, res) => {

    try {

        const company = await companyService.getCompanyById(req.params.id);

        if (!company) {

            return res.status(404).json({
                success: false,
                message: "Company Not Found"
            });

        }

        return res.json({
            success: true,
            data: company
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};


module.exports = {
    getAllCompanies,
    addCompany,
    getCompanyById
};
