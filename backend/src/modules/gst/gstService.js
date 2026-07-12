const BaseService = require("../../utils/baseService");
const db = require("../../config/db");

class GstService extends BaseService {

    constructor() {
        super("gst_rates");
    }

    async addGST(data) {

        const [exists] = await db.execute(
            "SELECT id FROM gst_rates WHERE gst_name=?",
            [data.gst_name]
        );

        if (exists.length > 0) {
            return {
                success: false,
                message: "GST Name Already Exists"
            };
        }

        await db.execute(
            `INSERT INTO gst_rates
            (
                gst_name,
                gst_percentage,
                cgst,
                sgst,
                igst,
                status
            )
            VALUES
            (?,?,?,?,?,?)`,
            [
                data.gst_name,
                data.gst_percentage,
                data.cgst,
                data.sgst,
                data.igst,
                data.status
            ]
        );

        return {
            success: true,
            message: "GST Added Successfully"
        };

    }

}

module.exports = new GstService();