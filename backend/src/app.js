const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/authRoutes");
const companyRoutes = require("./modules/company/companyRoutes");
const categoryRoutes = require("./modules/category/categoryRoutes");
const manufacturerRoutes = require("./modules/manufacturer/manufacturerRoutes");
const genericRoutes = require("./modules/generic/genericRoutes");
const unitRoutes = require("./modules/unit/unitRoutes");

const rackRoutes = require("./modules/rack/rackRoutes");
const warehouseRoutes = require("./modules/warehouse/warehouseRoutes");
const hsnRoutes = require("./modules/hsn/hsnRoutes");
const gstRoutes = require("./modules/gst/gstRoutes");
const taxRoutes = require("./modules/tax/taxRoutes");
const supplierRoutes = require("./modules/supplier/supplierRoutes");
const customerRoutes = require("./modules/customer/customerRoutes");
const doctorRoutes = require("./modules/doctor/doctorRoutes");
const app = express();

// ==========================
// Middlewares
// ==========================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==========================
// Home Route
// ==========================
app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        project: "Medical ERP",

        version: "1.0.0",

        message: "Medical ERP API Running Successfully"

    });

});

// ==========================
// API Routes
// ==========================
app.use("/api/auth", authRoutes);

app.use("/api/company", companyRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/manufacturer", manufacturerRoutes);
app.use("/api/generic", genericRoutes);
app.use("/api/unit", unitRoutes);
app.use("/api/rack", rackRoutes);
app.use("/api/warehouse", warehouseRoutes);
app.use("/api/hsn", hsnRoutes);
app.use("/api/gst", gstRoutes);
app.use("/api/tax", taxRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/doctor", doctorRoutes);

// ==========================
// 404 Route
// ==========================
app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "API Route Not Found"

    });

});

module.exports = app;