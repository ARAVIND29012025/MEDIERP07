const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const controller = require("./medicinePackingController");

router.post(
    "/",
    verifyToken,
    controller.addPacking
);

router.get(
    "/:medicineId",
    verifyToken,
    controller.getPacking
);

module.exports = router;