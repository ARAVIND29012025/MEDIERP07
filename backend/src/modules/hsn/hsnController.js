const BaseController = require("../../utils/baseController");
const hsnService = require("./hsnService");
const response = require("../../helpers/responseHelper");

class HsnController extends BaseController {

    constructor() {
        super(hsnService, "hsn_code");
    }

    addHSN = async (req, res) => {

        try {

            const result = await hsnService.addHSN(req.body);

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

module.exports = new HsnController();