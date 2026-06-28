const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/authMiddleware");

const companyController = require("./companyController");

// Company List
router.get(
    "/",
    verifyToken,
    companyController.getAllCompanies
);

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