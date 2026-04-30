# Backend Frete (Melhor Envio)

## Rodar localmente
```bash
npm install
cp .env.example .env   # edite com seu token
npm start
```

## Deploy (Render / Railway / Fly)
1. Suba esta pasta em um repositório Git.
2. Crie um Web Service apontando para o repo.
3. Build command: `npm install`
4. Start command: `npm start`
5. Variáveis de ambiente:
   - `MELHOR_ENVIO_TOKEN` — seu token Bearer
   - `MELHOR_ENVIO_EMAIL` — e-mail de contato (User-Agent)
   - `MELHOR_ENVIO_BASE` — `https://sandbox.melhorenvio.com.br` ou `https://www.melhorenvio.com.br`
6. Anote a URL pública (ex.: `https://meu-backend.onrender.com`).

## Endpoint
`POST /frete` com o body do shipment/calculate do Melhor Envio.
