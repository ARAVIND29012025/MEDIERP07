const BaseService = require("../../utils/baseService");
const db = require("../../config/db");

class DoctorService extends BaseService {

    constructor() {
        super("doctors");
    }

    async addDoctor(data) {

        const [code] = await db.execute(
            "SELECT id FROM doctors WHERE doctor_code=?",
            [data.doctor_code]
        );

        if (code.length > 0) {
            return {
                success: false,
                message: "Doctor Code Already Exists"
            };
        }

        const [name] = await db.execute(
            "SELECT id FROM doctors WHERE doctor_name=?",
            [data.doctor_name]
        );

        if (name.length > 0) {
            return {
                success: false,
                message: "Doctor Name Already Exists"
            };
        }

        await db.execute(
            `INSERT INTO doctors
            (
                doctor_code,
                doctor_name,
                qualification,
                specialization,
                mobile,
                email,
                clinic_name,
                address,
                status
            )
            VALUES
            (?,?,?,?,?,?,?,?,?)`,
            [
                data.doctor_code,
                data.doctor_name,
                data.qualification,
                data.specialization,
                data.mobile,
                data.email,
                data.clinic_name,
                data.address,
                data.status || "Active"
            ]
        );

        return {
            success: true,
            message: "Doctor Added Successfully"
        };

    }

}

module.exports = new DoctorService();