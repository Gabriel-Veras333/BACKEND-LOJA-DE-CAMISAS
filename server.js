import "dotenv/config";
import express from "express";
import cors from "cors";
import freteRotas from "./rotas/frete.js";

const app = express();

// CORS (libera geral no desenvolvimento; em produção ideal restringir)
app.use(cors({ origin: "*" }));
app.use(express.json());

// Rotas básicas
app.get("/", (_req, res) => {
  res.json({ ok: true, service: "backend-frete" });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, status: "ok" });
});

// Rotas de frete
app.use("/frete", freteRotas);

// Verificação de token
if (!process.env.MELHOR_ENVIO_TOKEN) {
  console.warn("⚠️ ATENÇÃO: MELHOR_ENVIO_TOKEN não foi carregado do .env");
} else {
  console.log("✅ Token Melhor Envio carregado");
}

// Porta do Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});