/**
 * Servidor HTTP independente para o Desenrola Direito
 * Este servidor ignora completamente o Vite e serve apenas a versão HTML estática
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Porta fixa para o Replit
const PORT = 5000;

// Ler o conteúdo HTML
const htmlPath = path.join(__dirname, 'simples.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Criar servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  
  // URLs a serem tratadas
  if (req.url === '/' || req.url === '/basico' || req.url === '/index.html') {
    // Enviar resposta HTML
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(html);
  } else {
    // Para outras rotas, responder 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página não encontrada');
  }
});

// Garantir que o arquivo .replit.port está atualizado
fs.writeFileSync('.replit.port', PORT.toString());

// Iniciar o servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor HTML estático rodando na porta ${PORT}`);
  console.log(`📄 Acesse: http://0.0.0.0:${PORT}`);
});