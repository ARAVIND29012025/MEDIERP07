const BaseService = require("../../utils/baseService");
const db = require("../../config/db");

class WarehouseService extends BaseService {

    constructor() {
        super("warehouses");
    }

    async addWarehouse(data) {

        const [code] = await db.execute(
            "SELECT id FROM warehouses WHERE warehouse_code = ?",
            [data.warehouse_code]
        );

        if (code.length > 0) {
            return {
                success: false,
                message: "Warehouse Code Already Exists"
            };
        }

        const [name] = await db.execute(
            "SELECT id FROM warehouses WHERE warehouse_name = ?",
            [data.warehouse_name]
        );

        if (name.length > 0) {
            return {
                success: false,
                message: "Warehouse Name Already Exists"
            };
        }

        await db.execute(
            `INSERT INTO warehouses
            (
                warehouse_code,
                warehouse_name,
                address,
                city,
                state,
                pincode,
                status
            )
            VALUES
            (?,?,?,?,?,?,?)`,
            [
                data.warehouse_code,
                data.warehouse_name,
                data.address,
                data.city,
                data.state,
                data.pincode,
                data.status
            ]
        );

        return {
            success: true,
            message: "Warehouse Added Successfully"
        };

    }

}

module.exports = new WarehouseService();