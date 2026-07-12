const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const hsnController = require("./hsnController");

router.get(
    "/",
    verifyToken,
    hsnController.getAll
);

router.post(
    "/",
    verifyToken,
    hsnController.addHSN
);

module.exports = router;