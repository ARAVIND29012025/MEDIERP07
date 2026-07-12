const BaseService = require("../../utils/baseService");
const db = require("../../config/db");

class TaxService extends BaseService {

    constructor() {
        super("tax_groups");
    }

    async addTax(data) {

        const [exists] = await db.execute(
            "SELECT id FROM tax_groups WHERE tax_code = ?",
            [data.tax_code]
        );

        if (exists.length > 0) {
            return {
                success: false,
                message: "Tax Code Already Exists"
            };
        }

        await db.execute(
            `INSERT INTO tax_groups
            (
                tax_code,
                tax_name,
                cgst,
                sgst,
                igst,
                gst_percentage,
                status
            )
            VALUES (?,?,?,?,?,?,?)`,
            [
                data.tax_code,
                data.tax_name,
                data.cgst,
                data.sgst,
                data.igst,
                data.gst_percentage,
                data.status
            ]
        );

        return {
            success: true,
            message: "Tax Group Added Successfully"
        };
    }

}

module.exports = new TaxService();