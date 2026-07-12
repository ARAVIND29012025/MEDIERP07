const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const genericController = require("./genericController");

router.get(
    "/",
    verifyToken,
    genericController.getAllGenerics
);

router.post(
    "/",
    verifyToken,
    genericController.addGeneric
);

module.exports = router;