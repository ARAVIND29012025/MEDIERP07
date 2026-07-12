const BaseController = require("../../utils/baseController");
const supplierService = require("./supplierService");
const response = require("../../helpers/responseHelper");

class SupplierController extends BaseController {

    constructor() {
        super(supplierService, "supplier_name");
    }

    addSupplier = async (req, res) => {

        try {

            const result = await supplierService.addSupplier(req.body);

            if (!result.success) {
                return response.error(res, result.message, 400);
            }

            return response.success(
                res,
                result.message,
                {},
                201
            );

        } catch (err) {

            console.log(err);

            return response.error(
                res,
                "Internal Server Error"
            );

        }

    }

}

module.exports = new SupplierController();