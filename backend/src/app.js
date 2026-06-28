const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/authRoutes");
const companyRoutes = require("./modules/company/companyRoutes");

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