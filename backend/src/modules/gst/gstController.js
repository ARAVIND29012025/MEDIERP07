const BaseController = require("../../utils/baseController");
const gstService = require("./gstService");
const response = require("../../helpers/responseHelper");

class GstController extends BaseController {

    constructor() {
        super(gstService, "gst_name");
    }

    addGST = async (req, res) => {

        try {

            const result = await gstService.addGST(req.body);

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

module.exports = new GstController();