import axios from "axios";
import { TOKEN, CONTACT_EMAIL, API_BASE } from "../config/env.js";

export async function calcularFreteAPI(body) {
  const token = TOKEN?.trim();

  if (!token) {
    const err = new Error("MELHOR_ENVIO_TOKEN não configurado.");
    err.status = 500;
    throw err;
  }

  const url = `${API_BASE.replace(/\/$/, "")}/api/v2/me/shipment/calculate`;

  try {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": `Aplicacao Frete (${CONTACT_EMAIL})`,
      },
    });

    return response.data;
  } catch (error) {
    const err = new Error(
      error.response?.data?.message || error.message
    );

    err.status = error.response?.status || 500;
    err.detalhes = error.response?.data || null;

    throw err;
  }
}