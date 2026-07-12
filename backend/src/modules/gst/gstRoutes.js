const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const gstController = require("./gstController");

router.get(
    "/",
    verifyToken,
    gstController.getAll
);

router.post(
    "/",
    verifyToken,
    gstController.addGST
);

module.exports = router;