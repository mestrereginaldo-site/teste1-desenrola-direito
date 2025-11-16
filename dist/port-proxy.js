// Proxy simples que encaminha requisições da porta 5000 para a porta 3000
import http from 'http';
import { spawn } from 'child_process';

// Portas de entrada e saída
const EXTERNAL_PORT = 5000; // A porta que o Replit espera
const INTERNAL_PORT = 3000; // A porta que o servidor principal usa

// Iniciar servidor proxy
const proxy = http.createServer((req, res) => {
  console.log(`Proxy: Encaminhando requisição de porta ${EXTERNAL_PORT} para ${INTERNAL_PORT}: ${req.url}`);
  
  const options = {
    hostname: 'localhost',
    port: INTERNAL_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers
  };
  
  // Criar requisição para o servidor interno
  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });
  
  // Tratar erros
  proxyReq.on('error', (err) => {
    console.error('Erro no proxy:', err.message);
    
    // Enviar página de fallback
    res.writeHead(503, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Desenrola Direito - Em manutenção</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; line-height: 1.6; }
          h1 { color: #0066cc; }
          .status { padding: 20px; background: #f8f9fa; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>Desenrola Direito</h1>
        <div class="status">
          <h2>Estamos em manutenção</h2>
          <p>O servidor principal está sendo inicializado. Por favor, aguarde alguns instantes e atualize a página.</p>
        </div>
      </body>
      </html>
    `);
  });
  
  // Encaminhar dados de entrada para o servidor interno
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    req.pipe(proxyReq);
  } else {
    proxyReq.end();
  }
});

// Iniciar servidor proxy
proxy.listen(EXTERNAL_PORT, '0.0.0.0', () => {
  console.log(`✅ Proxy iniciado na porta ${EXTERNAL_PORT} -> ${INTERNAL_PORT}`);
  
  // Iniciar o servidor principal na porta interna
  console.log('🚀 Iniciando servidor principal na porta', INTERNAL_PORT);
  const appServer = spawn('tsx', ['server/index.ts'], {
    stdio: 'inherit',
    env: { ...process.env, PORT: INTERNAL_PORT.toString() }
  });
  
  appServer.on('error', (err) => {
    console.error('❌ Erro ao iniciar o servidor principal:', err);
  });
});