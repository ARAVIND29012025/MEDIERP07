const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const warehouseController = require("./warehouseController");

router.get(
    "/",
    verifyToken,
    warehouseController.getAll
);

router.post(
    "/",
    verifyToken,
    warehouseController.addWarehouse
);

module.exports = router;