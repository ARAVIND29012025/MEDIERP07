const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const companyController = require("./companyController");



router.post(
    "/",
    verifyToken,
    companyController.addCompany
);

router.get(
    "/:id",
    verifyToken,
    companyController.getCompanyById
);

module.exports = router;