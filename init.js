// ESM compatível com CommonJS
console.log("Iniciando servidor na porta 5000...");

import('node:child_process').then(({ spawn }) => {
  // Inicializar servidor principal na porta 5000 fixada
  const serverProcess = spawn('node', ['--experimental-modules', 'server-direct.js'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: "5000"
    }
  });
  
  serverProcess.on('error', (err) => {
    console.error('Erro ao iniciar servidor:', err);
  });
  
  process.on('SIGINT', () => {
    console.log('Encerrando servidor...');
    serverProcess.kill('SIGINT');
    process.exit(0);
  });
});