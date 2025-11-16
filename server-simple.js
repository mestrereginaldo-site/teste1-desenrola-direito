// Servidor simples que tenta várias portas
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Desenrola Direito - Servidor de Teste</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #0066cc; }
        </style>
      </head>
      <body>
        <h1>Desenrola Direito</h1>
        <p>O servidor de teste está funcionando na porta <strong>${port}</strong>!</p>
        <p>Hora atual: ${new Date().toLocaleString()}</p>
      </body>
    </html>
  `);
});

// Lista de portas para tentar
const ports = [5000, 3000, 8080, 4000];
let port = ports[0];

function tryListening(index = 0) {
  if (index >= ports.length) {
    console.error('Não foi possível iniciar o servidor em nenhuma porta');
    return;
  }
  
  port = ports[index];
  console.log(`Tentando iniciar servidor na porta ${port}...`);
  
  server.listen(port, '0.0.0.0')
    .on('listening', () => {
      console.log(`✅ Servidor iniciado com sucesso na porta ${port}`);
    })
    .on('error', (err) => {
      console.log(`❌ Erro ao iniciar na porta ${port}: ${err.message}`);
      server.close();
      tryListening(index + 1);
    });
}

// Iniciar o servidor
tryListening();