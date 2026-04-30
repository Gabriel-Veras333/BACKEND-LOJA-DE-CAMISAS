import "dotenv/config";

// TOKEN (remove espaços invisíveis e evita undefined silencioso)
export const TOKEN = (process.env.MELHOR_ENVIO_TOKEN ?? "").trim();

// E-mail obrigatório pelo Melhor Envio (User-Agent)
export const CONTACT_EMAIL =
  process.env.MELHOR_ENVIO_EMAIL ?? "Vintagesports.contato@gmail.com";

// BASE da API (sandbox ou produção)
export const API_BASE =
  (process.env.MELHOR_ENVIO_BASE ?? "https://sandbox.melhorenvio.com.br").trim();