import "dotenv/config";
import express from "express";
import cors from "cors";
import freteRotas from "./rotas/frete.js";

const app = express();

// Em produção, troque "*" pelo domínio do seu frontend, ex.:
// origin: ["https://seu-app.lovable.app", "http://localhost:5173"]
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (_req, res) => res.json({ ok: true, service: "backend-frete" }));
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/frete", freteRotas);

// Aviso na inicialização se o token não foi carregado
if (!process.env.MELHOR_ENVIO_TOKEN) {
  console.warn("⚠️  ATENÇÃO: MELHOR_ENVIO_TOKEN não foi carregado do .env");
} else {
  console.log("✅ Token Melhor Envio carregado");
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
