const db = require("../../config/db");

class PurchaseRepository {

    // ============================
    // Insert Purchase Header
    // ============================

    async insertPurchase(connection, purchase) {

        const [result] = await connection.execute(
            `INSERT INTO purchases
            (
                purchase_no,
                supplier_id,
                invoice_no,
                invoice_date,
                purchase_date,
                warehouse_id,
                total_amount,
                discount_amount,
                taxable_amount,
                cgst_amount,
                sgst_amount,
                igst_amount,
                gst_amount,
                round_off,
                grand_total,
                payment_type,
                remarks,
                status,
                created_by
            )
            VALUES
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                purchase.purchase_no,
                purchase.supplier_id,
                purchase.invoice_no,
                purchase.invoice_date,
                purchase.purchase_date,
                purchase.warehouse_id,
                purchase.total_amount,
                purchase.discount_amount,
                purchase.taxable_amount,
                purchase.cgst_amount,
                purchase.sgst_amount,
                purchase.igst_amount,
                purchase.gst_amount,
                purchase.round_off,
                purchase.grand_total,
                purchase.payment_type,
                purchase.remarks,
                purchase.status,
                purchase.created_by
            ]
        );

        return result.insertId;

    }

    // ============================
    // Insert Purchase Item
    // ============================

    async insertPurchaseItem(connection, purchaseId, item) {

        const [result] = await connection.execute(
            `INSERT INTO purchase_items
            (
                purchase_id,
                medicine_id,
                batch_id,
                batch_no,
                expiry_date,
                manufacture_date,
                purchase_rate,
                ptr,
                pts,
                retail_rate,
                wholesale_rate,
                mrp,
                gst_percent,
                discount_percent,
                free_qty,
                carton_qty,
                box_qty,
                strip_qty,
                loose_qty,
                total_base_qty,
                amount
            )
            VALUES
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                purchaseId,
                item.medicine_id,
                item.batch_id,
                item.batch_no,
                item.expiry_date,
                item.manufacture_date,
                item.purchase_rate,
                item.ptr,
                item.pts,
                item.retail_rate,
                item.wholesale_rate,
                item.mrp,
                item.gst_percent,
                item.discount_percent,
                item.free_qty,
                item.carton_qty,
                item.box_qty,
                item.strip_qty,
                item.loose_qty,
                item.total_base_qty,
                item.amount
            ]
        );

        return result.insertId;

    }

    // ============================
    // Get Purchase List
    // ============================

    async getAllPurchases() {

        const [rows] = await db.execute(
            `SELECT
                p.id,
                p.purchase_no,
                p.invoice_no,
                p.purchase_date,
                s.supplier_name,
                p.grand_total,
                p.payment_type,
                p.status
            FROM purchases p
            INNER JOIN suppliers s
                ON p.supplier_id=s.id
            ORDER BY p.id DESC`
        );

        return rows;

    }

    // ============================
    // Get Purchase By Id
    // ============================

    async getPurchaseById(id) {

        const [rows] = await db.execute(
            `SELECT *
            FROM purchases
            WHERE id=?`,
            [id]
        );

        return rows[0];

    }

    // ============================
    // Get Purchase Items
    // ============================

    async getPurchaseItems(id) {

        const [rows] = await db.execute(
            `SELECT
                pi.*,
                m.medicine_name
            FROM purchase_items pi
            INNER JOIN medicines m
                ON pi.medicine_id=m.id
            WHERE pi.purchase_id=?`,
            [id]
        );

        return rows;

    }

    // ============================
    // Cancel Purchase
    // ============================

    async cancelPurchase(connection, id) {

        await connection.execute(
            `UPDATE purchases
             SET status='Cancelled'
             WHERE id=?`,
            [id]
        );

    }

}

module.exports = new PurchaseRepository();