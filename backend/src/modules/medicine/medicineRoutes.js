const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const medicineController = require("./medicineController");

const validateMedicine = require("./medicineValidation");

router.post(
    "/",
    verifyToken,
    validateMedicine,
    medicineController.addMedicine
);

module.exports = router;