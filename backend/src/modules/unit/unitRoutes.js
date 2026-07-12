const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const unitController = require("./unitController");

router.get(
    "/",
    verifyToken,
    unitController.getAllUnits
);

router.post(
    "/",
    verifyToken,
    unitController.addUnit
);

module.exports = router;