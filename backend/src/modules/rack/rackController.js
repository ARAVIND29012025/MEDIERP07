const BaseController = require("../../utils/baseController");
const rackService = require("./rackService");
const response = require("../../helpers/responseHelper");

class RackController extends BaseController {

    constructor() {
        super(rackService, "rack_name");
    }

    addRack = async (req, res) => {

        try {

            const result = await rackService.addRack(req.body);

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

module.exports = new RackController();