const db = require("../../config/db");

class MedicineBatchRepository {

    async findBatch(connection, medicineId, batchNo) {

        const [rows] = await connection.execute(
            `SELECT *
             FROM medicine_batches
             WHERE medicine_id = ?
             AND batch_no = ?`,
            [medicineId, batchNo]
        );

        return rows.length ? rows[0] : null;

    }

    async createBatch(connection, batch) {

        const [result] = await connection.execute(
            `INSERT INTO medicine_batches
            (
                medicine_id,
                warehouse_id,
                supplier_id,
                batch_no,
                manufacture_date,
                expiry_date,
                purchase_rate,
                ptr,
                pts,
                retail_rate,
                wholesale_rate,
                mrp,
                discount_percent,
                gst_percent,
                opening_stock,
                current_stock,
                reserved_stock,
                damaged_stock,
                expired_stock,
                batch_status
            )
            VALUES
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                batch.medicine_id,
                batch.warehouse_id,
                batch.supplier_id || null,
                batch.batch_no,
                batch.manufacture_date,
                batch.expiry_date,
                batch.purchase_rate,
                batch.ptr,
                batch.pts,
                batch.retail_rate,
                batch.wholesale_rate,
                batch.mrp,
                batch.discount_percent,
                batch.gst_percent,
                batch.opening_stock,
                batch.current_stock,
                batch.reserved_stock,
                batch.damaged_stock,
                batch.expired_stock,
                batch.batch_status
            ]
        );

        return result.insertId;

    }

    async increaseStock(connection, batchId, qty) {

        await connection.execute(
            `UPDATE medicine_batches
             SET current_stock = current_stock + ?
             WHERE id = ?`,
            [qty, batchId]
        );

    }


// ==========================================
// Find Available Batches (FEFO)
// ==========================================

async findAvailableBatches(
    connection,
    medicineId,
    warehouseId
) {

    const [rows] = await connection.execute(

        `SELECT
            id,
            medicine_id,
            batch_no,
            expiry_date,
            current_stock
        FROM medicine_batches

        WHERE

            medicine_id=?

            AND warehouse_id=?

            AND batch_status='Active'

            AND current_stock>0

            AND expiry_date>=CURDATE()

        ORDER BY

            expiry_date ASC,

            id ASC`,

        [
            medicineId,
            warehouseId
        ]

    );

    return rows;

}


// ==========================================
// Reduce Current Stock
// ==========================================

async decreaseStock(connection, batchId, qty) {

    await connection.execute(
        `UPDATE medicine_batches
         SET current_stock = current_stock - ?
         WHERE id = ?`,
        [
            qty,
            batchId
        ]
    );

}

// ==========================================
// Get Batch By Id
// ==========================================

async getBatchById(connection, batchId) {

    const [rows] = await connection.execute(
        `SELECT *
         FROM medicine_batches
         WHERE id = ?`,
        [batchId]
    );

    return rows[0];

}

async increaseStock(connection, batchId, qty) {

    await connection.execute(
        `UPDATE medicine_batches
         SET current_stock = current_stock + ?
         WHERE id = ?`,
        [qty, batchId]
    );

}

async decreaseStock(connection, batchId, qty) {

    await connection.execute(
        `UPDATE medicine_batches
         SET current_stock = current_stock - ?
         WHERE id = ?`,
        [qty, batchId]
    );

}


}

module.exports = new MedicineBatchRepository();