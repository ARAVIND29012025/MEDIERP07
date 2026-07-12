const response = require("../../helpers/responseHelper");

const packingService = require("./medicinePackingService");

class MedicinePackingController {

    async addPacking(req, res) {

        try {

            const result = await packingService.addPacking(req.body);

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

    async getPacking(req, res) {

        try {

            const data = await packingService.getPacking(
                req.params.medicineId
            );

            return response.success(
                res,
                "Packing List",
                data
            );

        } catch (err) {

            return response.error(
                res,
                "Internal Server Error"
            );

        }

    }

}

module.exports = new MedicinePackingController();