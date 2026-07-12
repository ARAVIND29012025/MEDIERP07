const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const taxController = require("./taxController");

router.get("/", verifyToken, taxController.getAll);

router.post("/", verifyToken, taxController.addTax);

module.exports = router;