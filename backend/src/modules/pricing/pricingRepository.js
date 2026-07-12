const db = require("../../config/db");

class PricingRepository {

    async getBatchPrice(
        medicineId,
        warehouseId
    ) {

        const [rows] = await db.execute(

            `SELECT

                id,

                retail_rate,

                wholesale_rate,

                ptr,

                pts,

                mrp,

                gst_percent

            FROM medicine_batches

            WHERE

                medicine_id=?

                AND warehouse_id=?

                AND current_stock>0

                AND batch_status='Active'

            ORDER BY expiry_date ASC

            LIMIT 1`,

            [
                medicineId,
                warehouseId
            ]

        );

        return rows[0];

    }

}

module.exports = new PricingRepository();