const BaseService = require("../../utils/baseService");
const db = require("../../config/db");

class CustomerService extends BaseService {

    constructor() {
        super("customers");
    }

    async addCustomer(data) {

        // Check Customer Code
        const [code] = await db.execute(
            "SELECT id FROM customers WHERE customer_code=?",
            [data.customer_code]
        );

        if (code.length > 0) {
            return {
                success: false,
                message: "Customer Code Already Exists"
            };
        }

        // Check Customer Name
        const [name] = await db.execute(
            "SELECT id FROM customers WHERE customer_name=?",
            [data.customer_name]
        );

        if (name.length > 0) {
            return {
                success: false,
                message: "Customer Name Already Exists"
            };
        }

        await db.execute(
            `INSERT INTO customers
            (
                customer_code,
                customer_name,
                mobile,
                whatsapp,
                email,
                address,
                city,
                state,
                pincode,
                gst_no,
                customer_type,
                credit_limit,
                opening_balance,
                status
            )
            VALUES
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.customer_code,
                data.customer_name,
                data.mobile,
                data.whatsapp,
                data.email,
                data.address,
                data.city,
                data.state,
                data.pincode,
                data.gst_no,
                data.customer_type || "Retail",
                data.credit_limit || 0,
                data.opening_balance || 0,
                data.status || "Active"
            ]
        );

        return {
            success: true,
            message: "Customer Added Successfully"
        };
    }

}

module.exports = new CustomerService();