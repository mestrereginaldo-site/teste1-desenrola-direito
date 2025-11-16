/**
 * Script para executar tanto o servidor backend quanto o frontend em paralelo
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

// Configuração para suportar ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Garantir que o arquivo .replit.port existe
fs.writeFileSync('.replit.port', '5000');

// Função para executar um comando em um processo separado
function runCommand(command, args, name) {
  console.log(`Iniciando ${name}...`);
  
  const process = spawn(command, args, {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      FORCE_COLOR: true
    }
  });
  
  process.on('error', (error) => {
    console.error(`Erro ao iniciar ${name}:`, error);
  });
  
  process.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`${name} encerrado com código ${code}`);
    }
  });
  
  return process;
}

// Iniciar o servidor backend
const backendProcess = runCommand(
  'tsx',
  ['server/index.ts'],
  'servidor backend'
);

// Iniciar o frontend Vite
const frontendProcess = runCommand(
  'npx',
  ['vite', '--port', '3000', '--host', '0.0.0.0'],
  'servidor frontend'
);

// Lidar com sinais para encerrar os processos adequadamente
process.on('SIGINT', () => {
  console.log('Encerrando processos...');
  backendProcess.kill('SIGINT');
  frontendProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Encerrando processos...');
  backendProcess.kill('SIGTERM');
  frontendProcess.kill('SIGTERM');
  process.exit(0);
});