/**
 * Script de inicialização personalizado para o projeto Desenrola Direito
 * 
 * Este script inicia o servidor Express que serve:
 * 1. A aplicação React (cliente)
 * 2. As APIs REST (servidor)
 * 3. Uma versão simplificada HTML quando o cliente não carregar
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurar a porta
const PORT = 5000;

// Garantir que o arquivo .replit.port existe
try {
  fs.writeFileSync('.replit.port', PORT.toString());
  console.log(`✅ Porta ${PORT} configurada para o Replit`);
} catch (err) {
  console.warn(`⚠️ Aviso: Não foi possível atualizar .replit.port: ${err.message}`);
}

// Iniciar o servidor usando 'npm run dev'
console.log('🚀 Iniciando servidor Desenrola Direito...');

const serverProcess = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true,
});

// Manipular eventos do processo
serverProcess.on('error', (err) => {
  console.error('❌ Erro ao iniciar o servidor:', err);
});

serverProcess.on('exit', (code, signal) => {
  if (code !== 0) {
    console.log(`⚠️ O servidor foi encerrado com código ${code} e sinal ${signal}`);
  }
});

// Lidar com sinais para encerramento limpo
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