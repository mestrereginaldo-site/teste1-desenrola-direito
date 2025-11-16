/**
 * Inicia o servidor na porta 3000 e o proxy na porta 5000 simultaneamente
 */
import { spawn, ChildProcess } from 'child_process';
import { promises as fs } from 'fs';

function startProcess(command, args, name) {
  console.log(`Iniciando ${name}...`);
  
  const process = spawn(command, args, {
    stdio: 'pipe',
    shell: true
  });
  
  process.stdout.on('data', (data) => {
    console.log(`[${name}] ${data.toString().trim()}`);
  });
  
  process.stderr.on('data', (data) => {
    console.error(`[${name} ERROR] ${data.toString().trim()}`);
  });
  
  process.on('close', (code) => {
    console.log(`${name} encerrado com código ${code}`);
  });
  
  process.on('error', (err) => {
    console.error(`Erro ao iniciar ${name}:`, err);
  });
  
  return process;
}

// Garantir que .replit.port existe
async function ensurePortFile() {
  try {
    await fs.writeFile('.replit.port', '5000');
    console.log('✅ Arquivo .replit.port criado/atualizado');
  } catch (err) {
    console.error('Erro ao criar arquivo .replit.port:', err);
  }
}

async function main() {
  await ensurePortFile();
  
  console.log('🚀 Iniciando servidor e proxy...');
  
  // Inicia o servidor na porta 3000
  const serverProcess = startProcess('npm', ['run', 'dev'], 'Servidor Express');
  
  // Espera um pouco e inicia o proxy na porta 5000
  setTimeout(() => {
    const proxyProcess = startProcess('node', ['port-opener.js'], 'Proxy');
    
    // Configura o encerramento gracioso
    process.on('SIGINT', () => {
      console.log('Encerrando processos...');
      serverProcess.kill();
      proxyProcess.kill();
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      console.log('Encerrando processos...');
      serverProcess.kill();
      proxyProcess.kill();
      process.exit(0);
    });
  }, 2000);
}

main().catch(console.error);