require("dotenv").config();

const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {

    try {

        const connection = await db.getConnection();

        console.log("===================================");

        console.log("✅ MySQL Connected Successfully");

        console.log("===================================");

        connection.release();

        app.listen(PORT, () => {

            console.log(`🚀 Server Running On Port ${PORT}`);

        });

    } catch (err) {

        console.log("Database Connection Failed");

        console.log(err.message);

    }

}

startServer();