const db = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (username, password) => {

    const [rows] = await db.execute(
        `SELECT
            id,
            username,
            password,
            full_name,
            role_id,
            status
        FROM users
        WHERE username = ?`,
        [username]
    );

    if (rows.length === 0) {
        return {
            success: false,
            message: "Invalid Username"
        };
    }

    const user = rows[0];

    if (user.status !== "Active") {
        return {
            success: false,
            message: "User Account Disabled"
        };
    }

    const isMatch = await bcrypt.compare(password, user.password);


console.log("Entered Password :", password);
console.log("Stored Hash      :", user.password);
console.log("Password Match   :", isMatch);

    if (!isMatch) {
        return {
            success: false,
            message: "Invalid Password"
        };
    }

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role_id: user.role_id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "8h"
        }
    );

    return {
        success: true,
        message: "Login Successful",
        token,
        user: {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            role_id: user.role_id
        }
    };
};

module.exports = {
    login
};