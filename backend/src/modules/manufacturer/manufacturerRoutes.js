const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const manufacturerController = require("./manufacturerController");

router.get(
    "/",
    verifyToken,
    manufacturerController.getAllManufacturers
);

router.post(
    "/",
    verifyToken,
    manufacturerController.addManufacturer
);

module.exports = router;