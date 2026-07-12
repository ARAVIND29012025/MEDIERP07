const db = require("../../config/db");

class MedicineRepository {

    async medicineCodeExists(medicineCode) {

        const [rows] = await db.execute(
            "SELECT id FROM medicines WHERE medicine_code = ?",
            [medicineCode]
        );

        return rows.length > 0;
    }

    async medicineNameExists(medicineName) {

        const [rows] = await db.execute(
            "SELECT id FROM medicines WHERE medicine_name = ?",
            [medicineName]
        );

        return rows.length > 0;
    }

    async insertMedicine(connection, medicine) {

        const [result] = await connection.execute(
            `INSERT INTO medicines
            (
                medicine_code,
                barcode,
                medicine_name,
                generic_id,
                company_id,
                manufacturer_id,
                category_id,
                hsn_id,
                gst_id,
                tax_group_id,
                warehouse_id,
                rack_id,
                schedule_type,
                prescription_required,
                purchase_price,
                mrp,
                retail_price,
                wholesale_price,
                opening_stock,
                min_stock,
                max_stock,
                reorder_level,
                remarks,
                status
            )
            VALUES
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                medicine.medicine_code,
                medicine.barcode,
                medicine.medicine_name,
                medicine.generic_id,
                medicine.company_id,
                medicine.manufacturer_id,
                medicine.category_id,
                medicine.hsn_id,
                medicine.gst_id,
                medicine.tax_group_id,
                medicine.warehouse_id,
                medicine.rack_id,
                medicine.schedule_type,
                medicine.prescription_required,
                medicine.purchase_price,
                medicine.mrp,
                medicine.retail_price,
                medicine.wholesale_price,
                medicine.opening_stock,
                medicine.min_stock,
                medicine.max_stock,
                medicine.reorder_level,
                medicine.remarks,
                medicine.status
            ]
        );

        return result.insertId;
    }

    async insertMedicinePacking(connection, medicineId, packing) {

    await connection.execute(
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
            medicineId,
            packing.level_no,
            packing.unit_id,
            packing.unit_qty,
            packing.is_sale_unit,
            packing.status ?? 1
        ]
    );

}

}

module.exports = new MedicineRepository();