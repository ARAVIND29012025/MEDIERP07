const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");
const doctorController = require("./doctorController");

router.get("/", verifyToken, doctorController.getAll);

router.post("/", verifyToken, doctorController.addDoctor);

module.exports = router;