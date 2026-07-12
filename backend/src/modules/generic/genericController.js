const genericService = require("./genericService");

// ===============================
// Generic List
// ===============================
const getAllGenerics = async (req, res) => {

    try {

        const search = req.query.search || "";
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        const result = await genericService.getAllGenerics(
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

// ===============================
// Add Generic
// ===============================
const addGeneric = async (req, res) => {

    try {

        const result = await genericService.addGeneric(req.body);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(201).json(result);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    getAllGenerics,
    addGeneric
};