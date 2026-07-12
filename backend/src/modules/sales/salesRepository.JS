
const db = require("../../config/db");

class SalesRepository {

    // ===============================
    // Insert Sales Header
    // ===============================
    async insertSale(connection, sale) {

        const [result] = await connection.execute(
            `INSERT INTO sales
            (
                bill_no,
                bill_date,
                customer_id,
                doctor_id,
                sale_type,
                payment_mode,
                total_amount,
                discount_amount,
                taxable_amount,
                cgst_amount,
                sgst_amount,
                igst_amount,
                gst_amount,
                round_off,
                grand_total,
                remarks,
                status,
                created_by
            )
            VALUES
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                sale.bill_no,
                sale.bill_date,
                sale.customer_id,
                sale.doctor_id,
                sale.sale_type,
                sale.payment_mode,
                sale.total_amount,
                sale.discount_amount,
                sale.taxable_amount,
                sale.cgst_amount,
                sale.sgst_amount,
                sale.igst_amount,
                sale.gst_amount,
                sale.round_off,
                sale.grand_total,
                sale.remarks,
                sale.status,
                sale.created_by
            ]
        );

        return result.insertId;
    }

    // ===============================
    // Insert Sales Item
    // ===============================
    async insertSaleItem(connection, saleId, item) {

        await connection.execute(
            `INSERT INTO sale_items
            (
                sale_id,
                medicine_id,
                batch_id,
                sale_price_type,
                sale_unit,
                quantity,
                base_quantity,
                rate,
                discount_percent,
                gst_percent,
                amount
            )
            VALUES
            (?,?,?,?,?,?,?,?,?,?,?)`,
            [
                saleId,
                item.medicine_id,
                item.batch_id,
                item.sale_price_type,
                item.sale_unit,
                item.quantity,
                item.base_quantity,
                item.rate,
                item.discount_percent,
                item.gst_percent,
                item.amount
            ]
        );

    }

    // ===============================
    // Get Sales List
    // ===============================
    async getAllSales() {

        const [rows] = await db.execute(
            `SELECT
                s.id,
                s.bill_no,
                s.bill_date,
                c.customer_name,
                s.grand_total,
                s.payment_mode,
                s.status
            FROM sales s
            LEFT JOIN customers c
                ON s.customer_id = c.id
            ORDER BY s.id DESC`
        );

        return rows;
    }

    // ===============================
    // Get Sale By Id
    // ===============================
    async getSaleById(id) {

        const [rows] = await db.execute(
            `SELECT *
             FROM sales
             WHERE id = ?`,
            [id]
        );

        return rows[0];
    }

    // ===============================
    // Get Sale Items
    // ===============================
    async getSaleItems(id) {

        const [rows] = await db.execute(
            `SELECT
                si.*,
                m.medicine_name
            FROM sale_items si
            INNER JOIN medicines m
                ON si.medicine_id = m.id
            WHERE si.sale_id = ?`,
            [id]
        );

        return rows;
    }

    // ===============================
    // Cancel Sale
    // ===============================
    async cancelSale(connection, id) {

        await connection.execute(
            `UPDATE sales
             SET status='Cancelled'
             WHERE id=?`,
            [id]
        );

    }

}

module.exports = new SalesRepository();