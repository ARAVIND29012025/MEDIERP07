const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const categoryController = require("./categoryController");

router.get(
    "/",
    verifyToken,
    categoryController.getAllCategories
);

router.post(
    "/",
    verifyToken,
    categoryController.addCategory
);

module.exports = router;