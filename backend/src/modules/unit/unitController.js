const unitService = require("./unitService");

// Get Unit List
const getAllUnits = async (req, res) => {

    try {

        const search = req.query.search || "";
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        const result = await unitService.getAllUnits(
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

// Add Unit
const addUnit = async (req, res) => {

    try {

        const result = await unitService.addUnit(req.body);

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

    getAllUnits,

    addUnit

};