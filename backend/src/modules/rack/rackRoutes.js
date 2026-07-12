const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const rackController = require("./rackController");

router.get(
    "/",
    verifyToken,
    rackController.getAll
);
router.post(
    "/",
    verifyToken,
    rackController.addRack
);
module.exports = router;