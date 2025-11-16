/**
 * Servidor mínimo para teste
 * Este é um servidor HTTP extremamente simples que retorna apenas HTML
 */

import http from 'http';
import fs from 'fs';
const PORT = 5000;

// Criar conteúdo HTML estático
const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Desenrola Direito</title>
    <style>
      body {
        font-family: system-ui, -apple-system, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #1e40af;
        color: white;
        padding: 30px;
        border-radius: 8px;
        text-align: center;
        margin-bottom: 30px;
      }
      .content {
        background-color: #f0f4f8;
        padding: 20px;
        border-radius: 8px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Desenrola Direito</h1>
      <p>Informações jurídicas simplificadas</p>
    </div>
    
    <div class="content">
      <h2>Servidor funcionando!</h2>
      <p>Esta é uma página estática simples para verificar se o servidor está funcionando corretamente.</p>
      <p>Se você está vendo esta página, o servidor está funcionando!</p>
    </div>
  </body>
</html>
`;

// Garantir que o arquivo .replit.port existe para o Replit detectar a porta
fs.writeFileSync('.replit.port', '80');

// Iniciar o servidor
const server = http.createServer((req, res) => {
  if (req.url === '/api/health') {
    // Rota de API para verificação de saúde
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', message: 'API está funcionando!' }));
  } else {
    // Qualquer outra rota retorna HTML
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡ Servidor simples rodando na porta ${PORT}`);
});