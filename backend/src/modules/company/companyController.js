const companyService = require("./companyService");

const getAllCompanies = async (req, res) => {

    try {

        const search = req.query.search || "";

        const page = req.query.page || 1;

        const limit = req.query.limit || 10;

        const result = await companyService.getAllCompanies(

            search,

            page,

            limit

        );

        res.json({

            success: true,

            total: result.total,

            page: Number(page),

            limit: Number(limit),

            data: result.data

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

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

// ==========================
// Update Company
// ==========================
const updateCompany = async (req, res) => {

    try {

        const result = await companyService.updateCompany(
            req.params.id,
            req.body
        );

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.json(result);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};
const deleteCompany = async (req, res) => {

    try {

        const result = await companyService.deleteCompany(req.params.id);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.json(result);

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
    getCompanyById,
    addCompany,
    updateCompany,
    deleteCompany
};