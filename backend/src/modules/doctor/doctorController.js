const BaseController = require("../../utils/baseController");
const doctorService = require("./doctorService");
const response = require("../../helpers/responseHelper");

class DoctorController extends BaseController {

    constructor() {
        super(doctorService, "doctor_name");
    }

    addDoctor = async (req, res) => {

        try {

            const result = await doctorService.addDoctor(req.body);

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

            return response.error(res, "Internal Server Error");

        }

    }

}

module.exports = new DoctorController();