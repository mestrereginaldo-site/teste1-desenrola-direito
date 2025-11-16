
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Porta 5000 Aberta</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        </style>
      </head>
      <body>
        <h1>Porta 5000 está aberta!</h1>
        <p>Este é um servidor simples para garantir que a porta 5000 esteja aberta para o Replit.</p>
        <p>Data/Hora: ${new Date().toISOString()}</p>
      </body>
    </html>
  `);
});

// Iniciar na porta 5000
server.listen(5000, '0.0.0.0', () => {
  console.log('Servidor simples rodando na porta 5000!');
});