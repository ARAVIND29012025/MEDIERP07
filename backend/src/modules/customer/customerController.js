const BaseController = require("../../utils/baseController");
const customerService = require("./customerService");
const response = require("../../helpers/responseHelper");

class CustomerController extends BaseController {

    constructor() {
        super(customerService, "customer_name");
    }

    addCustomer = async (req, res) => {

        try {

            const result = await customerService.addCustomer(req.body);

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

module.exports = new CustomerController();