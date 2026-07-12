const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const customerController = require("./customerController");

router.get("/", verifyToken, customerController.getAll);

router.post("/", verifyToken, customerController.addCustomer);

module.exports = router;