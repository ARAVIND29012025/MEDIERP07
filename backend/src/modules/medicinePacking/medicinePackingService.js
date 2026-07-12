const db = require("../../config/db");
const packingRepository = require("./medicinePackingRepository");

class MedicinePackingService {

    async addPacking(data) {

        const connection = await db.getConnection();

        try {

            await connection.beginTransaction();

            const id = await packingRepository.addPacking(
                connection,
                data
            );

            await connection.commit();

            return {
                success: true,
                message: "Packing Added Successfully",
                id
            };

        } catch (err) {

            await connection.rollback();
            throw err;

        } finally {

            connection.release();

        }

    }

    async getPacking(medicineId) {

        return await packingRepository.getPackingByMedicine(
            medicineId
        );

    }

}

module.exports = new MedicinePackingService();