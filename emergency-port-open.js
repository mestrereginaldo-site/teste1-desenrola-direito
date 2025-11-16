// Script de emergência para abrir a porta 5000 imediatamente
const http = require('http');
const { exec } = require('child_process');

console.log('⚡ Script de emergência para abrir a porta 5000 imediatamente');

// Cria um servidor HTTP simples na porta 5000
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Desenrola Direito - Servidor em Manutenção</title>
        <meta http-equiv="refresh" content="5">
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 100px; }
          .loader { border: 5px solid #f3f3f3; border-top: 5px solid #0066cc; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 20px auto; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <h1>Desenrola Direito</h1>
        <p>Site em manutenção.</p>
        <div class="loader"></div>
        <p>Tentando iniciar o servidor principal...</p>
        <p>Esta página será atualizada automaticamente.</p>
      </body>
    </html>
  `);
});

// Inicia o servidor na porta 5000
server.listen(5000, '0.0.0.0', () => {
  console.log('✅ Porta 5000 aberta com sucesso!');
  
  // Tenta iniciar o servidor principal em segundo plano
  console.log('🚀 Tentando iniciar o servidor principal em segundo plano...');
  exec('tsx server/index.ts', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao iniciar o servidor principal: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});

// Mantém o processo em execução
setInterval(() => {
  console.log('📡 Mantendo servidor de emergência ativo...');
}, 60000);