/**
 * Script para iniciar o servidor Vite para o frontend
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// Configuração para suportar ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Garantir que o arquivo .replit.port existe para a porta 3000
fs.writeFileSync('.replit.port', '3000');

// Iniciar o Vite na porta 3000
console.log('Iniciando servidor Vite para o frontend...');
const viteProcess = spawn('npx', ['vite', '--port', '3000', '--host', '0.0.0.0'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    FORCE_COLOR: true
  }
});

viteProcess.on('error', (error) => {
  console.error('Erro ao iniciar o Vite:', error);
});

viteProcess.on('close', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`Vite encerrado com código ${code}`);
  }
});

// Lidar com sinais para encerrar os processos adequadamente
process.on('SIGINT', () => {
  console.log('Encerrando Vite...');
  viteProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Encerrando Vite...');
  viteProcess.kill('SIGTERM');
  process.exit(0);
});