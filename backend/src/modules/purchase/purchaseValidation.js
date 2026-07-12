const validatePurchase = (req, res, next) => {

    const { header, items } = req.body;

    if (!header) {

        return res.status(400).json({

            success: false,

            message: "Purchase Header Required"

        });

    }

    if (!header.purchase_no) {

        return res.status(400).json({

            success: false,

            message: "Purchase Number Required"

        });

    }

    if (!header.supplier_id) {

        return res.status(400).json({

            success: false,

            message: "Supplier Required"

        });

    }

    if (!Array.isArray(items) || items.length === 0) {

        return res.status(400).json({

            success: false,

            message: "Purchase Items Required"

        });

    }

    next();

};

module.exports = validatePurchase;