const BaseService = require("../../utils/baseService");
const db = require("../../config/db");

class SupplierService extends BaseService {

    constructor() {
        super("suppliers");
    }

    async addSupplier(data) {

        // Check Supplier Code
        const [code] = await db.execute(
            "SELECT id FROM suppliers WHERE supplier_code = ?",
            [data.supplier_code]
        );

        if (code.length > 0) {
            return {
                success: false,
                message: "Supplier Code Already Exists"
            };
        }

        // Check Supplier Name
        const [name] = await db.execute(
            "SELECT id FROM suppliers WHERE supplier_name = ?",
            [data.supplier_name]
        );

        if (name.length > 0) {
            return {
                success: false,
                message: "Supplier Name Already Exists"
            };
        }

        await db.execute(
            `INSERT INTO suppliers
            (
                supplier_code,
                supplier_name,
                contact_person,
                mobile,
                whatsapp,
                email,
                gst_no,
                dl_no,
                address,
                city,
                state,
                pincode,
                opening_balance,
                credit_days,
                status
            )
            VALUES
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.supplier_code,
                data.supplier_name,
                data.contact_person,
                data.mobile,
                data.whatsapp,
                data.email,
                data.gst_no,
                data.dl_no,
                data.address,
                data.city,
                data.state,
                data.pincode,
                data.opening_balance || 0,
                data.credit_days || 0,
                data.status || "Active"
            ]
        );

        return {
            success: true,
            message: "Supplier Added Successfully"
        };

    }

}

module.exports = new SupplierService();