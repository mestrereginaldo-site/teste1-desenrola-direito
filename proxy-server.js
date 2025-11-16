/**
 * Servidor proxy simples para o Desenrola Direito
 * Este servidor detecta a porta onde o servidor principal está executando
 * e redireciona todas as solicitações para essa porta
 */

const express = require('express');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Porta fixa para o proxy (a que o Replit espera)
const PROXY_PORT = 5000;

// Função para encontrar a porta real do servidor
function getRealServerPort() {
  try {
    // Verificar se há logs de inicialização do servidor
    const logs = fs.readFileSync('server.log', 'utf8');
    const portMatch = logs.match(/rodando na porta (\d+)/);
    
    if (portMatch && portMatch[1]) {
      return parseInt(portMatch[1], 10);
    }
    
    // Verificar arquivo .replit.port
    if (fs.existsSync('.replit.port')) {
      const port = parseInt(fs.readFileSync('.replit.port', 'utf8').trim(), 10);
      if (!isNaN(port) && port !== PROXY_PORT) {
        return port;
      }
    }
    
    // Porta padrão do Vite de desenvolvimento
    return 3000;
  } catch (err) {
    console.error('Erro ao buscar porta do servidor:', err);
    // Usar porta padrão alternativa
    return 3000;
  }
}

// Criar o aplicativo Express
const app = express();

// Porta real do servidor principal
const targetPort = getRealServerPort();
console.log(`Servidor principal detectado na porta ${targetPort}`);

// Configurar o proxy para todas as requisições
app.use('/', createProxyMiddleware({
  target: `http://localhost:${targetPort}`,
  changeOrigin: true,
  ws: true,
  logLevel: 'debug'
}));

// Iniciar o servidor proxy
app.listen(PROXY_PORT, '0.0.0.0', () => {
  console.log(`Proxy rodando na porta ${PROXY_PORT}`);
  console.log(`Redirecionando para http://localhost:${targetPort}`);
});