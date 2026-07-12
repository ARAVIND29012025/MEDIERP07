const BaseController = require("../../utils/baseController");
const warehouseService = require("./warehouseService");
const response = require("../../helpers/responseHelper");

class WarehouseController extends BaseController {

    constructor() {
        super(warehouseService, "warehouse_name");
    }

    addWarehouse = async (req, res) => {

        try {

            const result = await warehouseService.addWarehouse(req.body);

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

module.exports = new WarehouseController();