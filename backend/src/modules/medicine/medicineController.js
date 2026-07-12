const response = require("../../helpers/responseHelper");
const medicineService = require("./medicineService");

class MedicineController {

    async addMedicine(req, res) {

        try {

            const result = await medicineService.addMedicine(req.body);

            return response.success(
                res,
                result.message,
                {
                    medicineId: result.medicineId
                },
                201
            );

        } catch (error) {

            console.log(error);

            return response.error(
                res,
                error.message || "Internal Server Error",
                400
            );

        }

    }

}

module.exports = new MedicineController();