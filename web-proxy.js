/**
 * Proxy web simples para redirecionar solicitações da porta 5000 para a porta real do servidor
 */
import http from 'http';
import httpProxy from 'http-proxy';
import fs from 'fs';

// Adaptação para CommonJS
const createProxyServer = httpProxy.createProxyServer || httpProxy.createServer;

// Tentar ler a porta do arquivo .replit.port
let targetPort = 39703; // Porta padrão que sabemos que está funcionando
try {
  const portFromFile = fs.readFileSync('.replit.port', 'utf8').trim();
  if (portFromFile && !isNaN(parseInt(portFromFile))) {
    targetPort = parseInt(portFromFile);
  }
} catch (error) {
  console.error('Erro ao ler o arquivo .replit.port:', error);
}

// Criar o servidor proxy
const proxy = createProxyServer({});

// Configuração do servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Proxy: redirecionando requisição de ${req.url} para a porta ${targetPort}`);
  
  // Adicionar headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
  // Redirecionar para o servidor target
  proxy.web(req, res, { 
    target: `http://localhost:${targetPort}`,
    changeOrigin: true
  }, (err) => {
    console.error('Erro no proxy:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Erro de proxy: não foi possível conectar ao servidor principal');
  });
});

// Iniciar o servidor na porta 5000 (necessário para o Replit detectar)
const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🔄 Proxy rodando na porta ${PORT}, redirecionando para ${targetPort}`);
});