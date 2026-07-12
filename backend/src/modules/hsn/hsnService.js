const BaseService = require("../../utils/baseService");
const db = require("../../config/db");

class HsnService extends BaseService {

    constructor() {
        super("hsn_codes");
    }

    async addHSN(data) {

        const [exists] = await db.execute(
            "SELECT id FROM hsn_codes WHERE hsn_code=?",
            [data.hsn_code]
        );

        if (exists.length > 0) {
            return {
                success: false,
                message: "HSN Code Already Exists"
            };
        }

        await db.execute(
            `INSERT INTO hsn_codes
            (
                hsn_code,
                description,
                gst_rate,
                status
            )
            VALUES
            (?,?,?,?)`,
            [
                data.hsn_code,
                data.description,
                data.gst_rate,
                data.status
            ]
        );

        return {
            success: true,
            message: "HSN Code Added Successfully"
        };

    }

}

module.exports = new HsnService();