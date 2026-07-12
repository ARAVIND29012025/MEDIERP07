const db = require("../../config/db");
const medicineRepository = require("./medicineRepository");

class MedicineService {

   async addMedicine(data) {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const medicine = data.medicine;
        const packings = data.packings || [];

        const codeExists =
            await medicineRepository.medicineCodeExists(
                medicine.medicine_code
            );

        if (codeExists) {
            throw new Error("Medicine Code Already Exists");
        }

        const nameExists =
            await medicineRepository.medicineNameExists(
                medicine.medicine_name
            );

        if (nameExists) {
            throw new Error("Medicine Name Already Exists");
        }

        const medicineId =
            await medicineRepository.insertMedicine(
                connection,
                medicine
            );

        for (const packing of packings) {

            await medicineRepository.insertMedicinePacking(
                connection,
                medicineId,
                packing
            );

        }

        await connection.commit();

        return {

            success: true,

            medicineId,

            message: "Medicine Saved Successfully"

        };

    }
    catch (err) {

        await connection.rollback();

        throw err;

    }
    finally {

        connection.release();

    }

}
}

module.exports = new MedicineService();