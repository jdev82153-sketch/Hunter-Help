const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

app.use(express.json());

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

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Hunter Help API rodando na porta ${PORT}`);
});
