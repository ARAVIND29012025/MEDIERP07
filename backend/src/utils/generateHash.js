const bcrypt = require("bcrypt");

async function generateHash() {
    const password = "JAN012025";

    const hash = await bcrypt.hash(password, 10);

    console.log("Password:", password);
    console.log("Hash:", hash);
}

generateHash();