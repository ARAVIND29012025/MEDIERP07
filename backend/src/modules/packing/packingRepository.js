const db = require("../../config/db");

class PackingRepository {

    async getPackingByUnit(
        medicineId,
        unitName
    ) {

        const [rows] = await db.execute(

            `SELECT

                mp.level_no,
                mp.unit_qty,
                u.unit_name

            FROM medicine_packings mp

            INNER JOIN units u

                ON mp.unit_id=u.id

            WHERE

                mp.medicine_id=?

                AND u.unit_name=?`,

            [
                medicineId,
                unitName
            ]

        );

        return rows[0];

    }

}

module.exports = new PackingRepository();