import { exec, ChildProcess } from 'child_process';
import fs from 'fs';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import http from 'http';

// Garantir que o arquivo .replit.port existe para o Replit detectar a porta
fs.writeFileSync('.replit.port', '5000');

// Iniciar o servidor principal em segundo plano
function startMainServer(): ChildProcess {
  console.log("Iniciando servidor principal...");
  
  return exec('tsx server/index.ts', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar o servidor: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
    if (stdout) {
      console.log(`Stdout: ${stdout}`);
    }
  });
}

// Iniciar o servidor Vite em segundo plano
const viteProcess = exec('npx vite --port 3000 --host 0.0.0.0', (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao executar o Vite: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr Vite: ${stderr}`);
  }
  if (stdout) {
    console.log(`Stdout Vite: ${stdout}`);
  }
});

// Criar um servidor proxy para rotear solicitações
const app = express();

// Redirecionar requisições de API para o servidor principal
app.use('/api', createProxyMiddleware({ 
  target: 'http://localhost:5000',
  changeOrigin: true
}));

// Redirecionar todas as outras requisições para o servidor Vite
app.use('/', createProxyMiddleware({ 
  target: 'http://localhost:3000',
  changeOrigin: true,
  ws: true, // Habilitar websockets para hot reload
}));

// Iniciar o servidor proxy na porta 5000
const server = http.createServer(app);
server.listen(5000, '0.0.0.0', () => {
  console.log('✅ Servidor proxy iniciado na porta 5000');
  console.log('→ Redirecionando API para http://localhost:5000');
  console.log('→ Redirecionando frontend para http://localhost:3000');
  
  // Iniciar o servidor principal após o proxy estar pronto
  const mainServer = startMainServer();
  
  // Lidar com o encerramento do processo
  process.on('SIGINT', () => {
    console.log('Encerrando servidores...');
    mainServer.kill();
    viteProcess.kill();
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log('Encerrando servidores...');
    mainServer.kill();
    viteProcess.kill();
    process.exit(0);
  });
});