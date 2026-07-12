const manufacturerService = require("./manufacturerService");

// Get Manufacturer List
const getAllManufacturers = async (req, res) => {

    try {

        const search = req.query.search || "";
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        const result = await manufacturerService.getAllManufacturers(
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

// Add Manufacturer
const addManufacturer = async (req, res) => {

    try {

        const result = await manufacturerService.addManufacturer(req.body);

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
    getAllManufacturers,
    addManufacturer
};