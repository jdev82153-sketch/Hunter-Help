const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hunter Help API online 🚀"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "online"
    });
});

app.listen(PORT, () => {
    console.log(`Hunter Help API rodando na porta ${PORT}`);
});
