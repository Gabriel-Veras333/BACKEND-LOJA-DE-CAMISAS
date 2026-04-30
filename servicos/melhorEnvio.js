import { TOKEN, CONTACT_EMAIL, API_BASE } from "../config/env.js";

export async function calcularFreteAPI(body) {
  const token = TOKEN?.trim();

  if (!token) {
    const err = new Error("MELHOR_ENVIO_TOKEN não configurado no servidor.");
    err.status = 500;
    throw err;
  }

  const url = `${API_BASE.replace(/\/$/, "")}/api/v2/me/shipment/calculate`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": `Aplicacao Frete (${CONTACT_EMAIL})`,
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();

  // tenta converter JSON com segurança
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    const err = new Error(
      `Resposta não-JSON da API (status ${response.status})`
    );
    err.status = 502;
    err.detalhes = text?.slice(0, 300);
    throw err;
  }

  if (!response.ok) {
    const err = new Error(
      data?.message || `Melhor Envio respondeu ${response.status}`
    );
    err.status = response.status;
    err.detalhes = data;
    throw err;
  }

  return data;
}