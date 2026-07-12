const BaseController = require("../../utils/baseController");
const taxService = require("./taxService");
const response = require("../../helpers/responseHelper");

class TaxController extends BaseController {

    constructor() {
        super(taxService, "tax_name");
    }

    addTax = async (req, res) => {

        try {

            const result = await taxService.addTax(req.body);

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

module.exports = new TaxController();