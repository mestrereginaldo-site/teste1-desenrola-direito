// Script de inicialização específico para o Replit - Versão Proxy
import http from 'http';
import { spawn } from 'child_process';
import fs from 'fs';

// Portas
const PORT_EXTERNO = 5000; // Porta que o Replit espera
const PORT_INTERNO = 3000; // Porta para o servidor real

console.log('🚀 Iniciando aplicação Desenrola Direito no Replit');

// Função para verificar se uma porta está disponível
async function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      } else {
        resolve(true); // Outro erro, mas porta pode estar disponível
      }
    });
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
}

// Criar página de loading/fallback
function createLoadingHtml() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Desenrola Direito</title>
        <meta http-equiv="refresh" content="5">
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 100px; }
          .loader { border: 5px solid #f3f3f3; border-top: 5px solid #0066cc; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 20px auto; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <h1>Desenrola Direito</h1>
        <p>Iniciando o servidor...</p>
        <div class="loader"></div>
        <p>Esta página será atualizada automaticamente em 5 segundos.</p>
      </body>
    </html>
  `;
}

// Criar um proxy HTTP
const proxy = http.createServer((req, res) => {
  // Tentar encaminhar para o servidor interno
  const options = {
    hostname: 'localhost',
    port: PORT_INTERNO,
    path: req.url,
    method: req.method,
    headers: req.headers
  };
  
  // Se o servidor interno estiver disponível, encaminhar requisição
  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });
  
  // Se o servidor interno não estiver disponível, mostrar página de loading
  proxyReq.on('error', () => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(createLoadingHtml());
  });
  
  // Encaminhar corpo da requisição, se existir
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    req.pipe(proxyReq);
  } else {
    proxyReq.end();
  }
});

// Iniciar o proxy na porta que o Replit espera
console.log(`⚡ Abrindo porta ${PORT_EXTERNO} para o Replit...`);
proxy.listen(PORT_EXTERNO, '0.0.0.0', async () => {
  console.log(`✅ Proxy iniciado na porta ${PORT_EXTERNO} -> ${PORT_INTERNO}`);
  
  // Verificar se a porta interna está disponível
  const portAvailable = await isPortAvailable(PORT_INTERNO);
  if (!portAvailable) {
    console.log(`⚠️ A porta ${PORT_INTERNO} já está em uso. O proxy continuará funcionando.`);
    return;
  }
  
  // Verificar ambiente
  const isDev = process.env.NODE_ENV !== 'production';
  const command = isDev ? 'tsx' : 'node';
  const script = isDev ? 'server/index.ts' : 'dist/index.js';
  
  console.log(`🚀 Iniciando servidor principal na porta ${PORT_INTERNO}...`);
  
  // Iniciar o servidor real
  const serverProcess = spawn(command, [script], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: PORT_INTERNO.toString()
    }
  });
  
  // Tratar encerramento do servidor
  serverProcess.on('close', (code) => {
    console.log(`⚠️ Servidor principal encerrado com código ${code}`);
    if (code !== 0) {
      console.log('⚠️ O proxy continuará executando para manter a porta 5000 aberta');
    } else {
      process.exit(code);
    }
  });
  
  // Tratar sinais do sistema para encerramento limpo
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
      console.log(`📌 Recebido sinal ${signal}, encerrando...`);
      serverProcess.kill();
      proxy.close();
      process.exit(0);
    });
  });
});