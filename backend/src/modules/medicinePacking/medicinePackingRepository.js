const db = require("../../config/db");

class MedicinePackingRepository {

    async addPacking(connection, packing) {

        const [result] = await connection.execute(
            `INSERT INTO medicine_packings
            (
                medicine_id,
                level_no,
                unit_id,
                unit_qty,
                is_sale_unit,
                status
            )
            VALUES
            (?,?,?,?,?,?)`,
            [
                packing.medicine_id,
                packing.level_no,
                packing.unit_id,
                packing.unit_qty,
                packing.is_sale_unit,
                packing.status
            ]
        );

        return result.insertId;
    }

    async getPackingByMedicine(medicineId) {

        const [rows] = await db.execute(
            `SELECT
                mp.id,
                mp.level_no,
                mp.unit_qty,
                mp.is_sale_unit,
                u.unit_name,
                u.short_name
            FROM medicine_packings mp
            JOIN units u
                ON mp.unit_id=u.id
            WHERE mp.medicine_id=?
            ORDER BY mp.level_no`,
            [medicineId]
        );

        return rows;
    }

}

module.exports = new MedicinePackingRepository();