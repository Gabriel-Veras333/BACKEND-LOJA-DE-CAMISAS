import express from "express";
import { calcularFreteAPI } from "../servicos/melhorEnvio.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("📦 BODY RECEBIDO:", JSON.stringify(req.body, null, 2));
    const data = await calcularFreteAPI(req.body);
    return res.json(data);
  } catch (error) {
    console.error("❌ ERRO FRETE:", error.message);
    console.error("📋 DETALHES:", JSON.stringify(error.detalhes, null, 2));
    return res.status(error.status || 500).json({
      erro: error.message,
      detalhes: error.detalhes ?? null,
    });
  }
});

export default router;
