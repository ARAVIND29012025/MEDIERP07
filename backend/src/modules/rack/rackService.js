const BaseService = require("../../utils/baseService");
const db = require("../../config/db");

class RackService extends BaseService {

    constructor() {
        super("racks");
    }

    async addRack(rack) {

        const [code] = await db.execute(
            "SELECT id FROM racks WHERE rack_code=?",
            [rack.rack_code]
        );

        if (code.length > 0) {
            return {
                success: false,
                message: "Rack Code Already Exists"
            };
        }

        const [name] = await db.execute(
            "SELECT id FROM racks WHERE rack_name=?",
            [rack.rack_name]
        );

        if (name.length > 0) {
            return {
                success: false,
                message: "Rack Name Already Exists"
            };
        }

        await db.execute(
            `INSERT INTO racks
            (
                rack_code,
                rack_name,
                description,
                status
            )
            VALUES
            (?,?,?,?)`,
            [
                rack.rack_code,
                rack.rack_name,
                rack.description,
                rack.status
            ]
        );

        return {
            success: true,
            message: "Rack Added Successfully"
        };
    }

}

module.exports = new RackService();