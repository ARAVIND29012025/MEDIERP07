const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const purchaseController = require("./purchaseController");

const validatePurchase = require("./purchaseValidation");

router.post(
    "/",
    verifyToken,
    validatePurchase,
    purchaseController.savePurchase
);

router.get(
    "/",
    verifyToken,
    purchaseController.getAll
);

module.exports = router;