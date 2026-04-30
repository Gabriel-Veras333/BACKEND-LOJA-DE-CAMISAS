import { TOKEN, CONTACT_EMAIL, API_BASE } from "../config/env.js";

export async function calcularFreteAPI(body) {
  if (!TOKEN) {
    const err = new Error("MELHOR_ENVIO_TOKEN não configurado no servidor.");
    err.status = 500;
    throw err;
  }

  // Node 18+ tem fetch nativo, não precisa de node-fetch.
  const response = await fetch(`${API_BASE}/api/v2/me/shipment/calculate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      // OBRIGATÓRIO pelo Melhor Envio: nome do app + e-mail de contato.
      "User-Agent": `Aplicacao Frete (${CONTACT_EMAIL})`,
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  const contentType = response.headers.get("content-type") || "";

  // Resposta não-JSON (HTML de login, página 502 etc.)
  if (!contentType.includes("application/json")) {
    const err = new Error(
      `API do Melhor Envio retornou resposta não-JSON (status ${response.status}). ` +
      `Verifique TOKEN, escopos e endpoint.`
    );
    err.status = 502;
    err.detalhes = text.slice(0, 300);
    throw err;
  }

  const data = JSON.parse(text);

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
