const express = require("express");

const router = express.Router();

const agencyKeys = {
    "HUNTER-DEMO-001": {
        id: "demo-001",
        name: "Imobiliária Demo",
        initials: "ID"
    }
};

router.post("/login", (req, res) => {
    const { key } = req.body;

    if (!key) {
        return res.status(400).json({
            success: false,
            message: "Informe a chave da imobiliária."
        });
    }

    const agency = agencyKeys[key];

    if (!agency) {
        return res.status(401).json({
            success: false,
            message: "Chave inválida."
        });
    }

    return res.json({
        success: true,
        token: "demo-token-" + agency.id,
        agency
    });
});

module.exports = router;
