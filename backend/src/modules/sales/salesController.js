const salesService = require("./salesService");

class SalesController {

    // ===============================
    // Save Sale
    // ===============================
    async saveSale(req, res) {

        try {

            const result =
                await salesService.saveSale(req.body);

            return res.status(201).json(result);

        } catch (err) {

            console.error(err);

            return res.status(500).json({

                success: false,

                message: err.message

            });

        }

    }

    // ===============================
    // Get All Sales
    // ===============================
    async getAll(req, res) {

        try {

            const data =
                await salesService.getAllSales();

            return res.json({

                success: true,

                total: data.length,

                data

            });

        } catch (err) {

            console.error(err);

            return res.status(500).json({

                success: false,

                message: err.message

            });

        }

    }

    // ===============================
    // Get Sale By Id
    // ===============================
    async getById(req, res) {

        try {

            const data =
                await salesService.getSaleById(
                    req.params.id
                );

            return res.json({

                success: true,

                data

            });

        } catch (err) {

            console.error(err);

            return res.status(500).json({

                success: false,

                message: err.message

            });

        }

    }

}

module.exports = new SalesController();