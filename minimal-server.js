// Servidor ultra simples para Replit (menos de 50 linhas)
import express from 'express';
import http from 'http';
import fs from 'fs';

// Porta padrão para o Replit
const PORT = 5000;

// Criar aplicação Express
const app = express();

// Adicionar cabeçalhos CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// HTML simples para qualquer rota
const htmlTemplate = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desenrola Direito</title>
  <style>
    body { font-family: Arial; background-color: #f5f9ff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .container { text-align: center; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); max-width: 80%; }
    h1 { color: #0056b3; margin-bottom: 20px; }
    p { color: #333; line-height: 1.6; margin-bottom: 15px; }
    .heart { color: #0056b3; font-size: 5rem; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Desenrola Direito</h1>
    <p>Estamos realizando melhorias no site.</p>
    <div class="heart">♥</div>
    <p>Em breve, novidades para você!</p>
    <p>Agradecemos sua paciência.</p>
  </div>
</body>
</html>
`;

// Adicionar rota para todas as solicitações
app.get('*', (req, res) => {
  res.send(htmlTemplate);
});

// Criar servidor HTTP
const server = http.createServer(app);

// Iniciar servidor na porta correta
server.listen(PORT, '0.0.0.0', () => {
  fs.writeFileSync('.replit.port', PORT.toString());
  console.log(`🌐 Servidor rodando na porta ${PORT}`);
});