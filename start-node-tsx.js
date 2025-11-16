/**
 * Script inicial para executar o servidor TypeScript com tsx
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurar porta
const PORT = 3333;
fs.writeFileSync('.replit.port', PORT.toString());
console.log(`✅ Porta ${PORT} configurada para o Replit`);

// Iniciar o servidor com tsx
console.log('🚀 Iniciando servidor Desenrola Direito...');
const serverProcess = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true
});

// Manipular eventos do processo
serverProcess.on('error', (err) => {
  console.error('❌ Erro ao iniciar o servidor:', err);
});

serverProcess.on('exit', (code, signal) => {
  if (code !== 0) {
    console.log(`⚠️ Servidor encerrado com código ${code} e sinal ${signal}`);
  }
});

// Manipular sinais para encerramento limpo
process.on('SIGINT', () => {
  console.log('Encerrando o servidor...');
  serverProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Encerrando o servidor...');
  serverProcess.kill('SIGTERM');
  process.exit(0);
});