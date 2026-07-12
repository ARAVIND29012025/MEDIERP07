const validateMedicine = (req, res, next) => {

    const medicine = req.body.medicine;

    if (!medicine) {
        return res.status(400).json({
            success: false,
            message: "Medicine data is required"
        });
    }

    const {
        medicine_code,
        medicine_name,
        company_id,
        category_id
    } = medicine;

    if (!medicine_code) {
        return res.status(400).json({
            success: false,
            message: "Medicine Code is required"
        });
    }

    if (!medicine_name) {
        return res.status(400).json({
            success: false,
            message: "Medicine Name is required"
        });
    }

    if (!company_id) {
        return res.status(400).json({
            success: false,
            message: "Company is required"
        });
    }

    if (!category_id) {
        return res.status(400).json({
            success: false,
            message: "Category is required"
        });
    }

    next();

};

module.exports = validateMedicine;