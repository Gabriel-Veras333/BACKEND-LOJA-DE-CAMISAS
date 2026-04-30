import "dotenv/config";

// Nunca commit o token real. Configure como variável de ambiente no host.
// Render/Railway: Settings → Environment → adicionar MELHOR_ENVIO_TOKEN
export const TOKEN = process.env.MELHOR_ENVIO_TOKEN || "";

// E-mail de contato exigido pelo Melhor Envio no header User-Agent.
export const CONTACT_EMAIL = process.env.MELHOR_ENVIO_EMAIL || "Vintagesports.contato@gmail.com";

// Use "https://sandbox.melhorenvio.com.br" para testes
// e "https://www.melhorenvio.com.br" para produção.
export const API_BASE = process.env.MELHOR_ENVIO_BASE || "https://sandbox.melhorenvio.com.br";
