const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const supplierController = require("./supplierController");

router.get("/", verifyToken, supplierController.getAll);

router.post("/", verifyToken, supplierController.addSupplier);

module.exports = router;