/**
 * Script de inicialização otimizado para o Replit
 * 
 * Este script inicia um servidor HTTP simples na porta 5000
 * para que o Replit detecte a porta e, depois, inicia o servidor principal
 */

import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

// Garantir que o arquivo .replit.port existe
fs.writeFileSync('.replit.port', '5000');

// Criar um servidor HTTP básico
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Desenrola Direito - Inicializando</title>
        <meta charset="UTF-8">
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #1e40af; }
          .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
        </style>
      </head>
      <body>
        <h1>Desenrola Direito</h1>
        <div class="card">
          <h2>Inicializando Servidor</h2>
          <p>Aguarde enquanto o servidor principal está sendo iniciado...</p>
        </div>
      </body>
    </html>
  `);
});

// Escutar na porta 5000 para o Replit detectar
server.listen(5000, '0.0.0.0', () => {
  console.log('Servidor básico rodando na porta 5000');
  
  // Iniciar o servidor principal após o servidor básico estar pronto
  console.log('Iniciando o servidor principal...');
  
  // Usar spawn para iniciar o servidor principal como um processo filho
  const serverProcess = spawn('tsx', ['server/index.ts'], {
    stdio: 'inherit',
    shell: true
  });
  
  serverProcess.on('error', (err) => {
    console.error('Erro ao iniciar o servidor principal:', err);
  });
  
  // Encerrar o servidor básico após algum tempo
  setTimeout(() => {
    server.close();
    console.log('Servidor básico encerrado, servidor principal assumiu o controle.');
  }, 5000);
});