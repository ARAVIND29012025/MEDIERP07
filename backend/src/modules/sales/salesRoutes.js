const express = require("express");

const router = express.Router();

const verifyToken =
require("../../middleware/authMiddleware");

const salesController =
require("./salesController");

// Save Sale
router.post(
    "/",
    verifyToken,
    salesController.saveSale
);

// Get All Sales
router.get(
    "/",
    verifyToken,
    salesController.getAll
);

// Get Sale By Id
router.get(
    "/:id",
    verifyToken,
    salesController.getById
);

module.exports = router;