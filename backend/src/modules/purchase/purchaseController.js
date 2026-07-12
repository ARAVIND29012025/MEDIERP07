const purchaseService = require("./purchaseService");

class PurchaseController {

    async savePurchase(req, res) {

        try {

            const result = await purchaseService.savePurchase(req.body);

            return res.status(201).json(result);

        } catch (error) {

            console.log(error);

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    async getAll(req, res) {

        try {

            const data = await purchaseService.getAllPurchases();

            return res.json({

                success: true,

                total: data.length,

                data

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

}

module.exports = new PurchaseController();