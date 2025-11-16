// Servidor HTTP básico para servir apenas o arquivo HTML estático
const http = require('http');
const fs = require('fs');

// Porta fixa para o Replit
const PORT = 5000;

// Ler o conteúdo HTML
const html = fs.readFileSync('simples.html', 'utf8');

// Criar servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  
  // Enviar resposta HTML para qualquer rota
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  
  res.end(html);
});

// Garantir que o arquivo .replit.port está atualizado
fs.writeFileSync('.replit.port', PORT.toString());

// Iniciar o servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor HTML simples rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});