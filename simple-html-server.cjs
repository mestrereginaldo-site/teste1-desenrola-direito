/**
 * Servidor HTML estático mínimo
 * Este arquivo deve ser rodado com Node.js: node simple-html-server.cjs
 */

const http = require('http');
const fs = require('fs');

// Porta para o Replit
const PORT = 5000;

// HTML estático básico
const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desenrola Direito</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      background-color: #f5f9ff; 
      margin: 0; 
      padding: 0;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    header {
      background-color: #0056b3;
      color: white;
      padding: 1rem;
      text-align: center;
    }
    
    main {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }
    
    .maintenance {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 2rem;
      text-align: center;
      max-width: 600px;
    }
    
    h1 {
      color: #0056b3;
    }
    
    .heart {
      color: #0056b3;
      font-size: 3rem;
      margin: 1rem 0;
    }
    
    footer {
      background-color: #003d7a;
      color: white;
      text-align: center;
      padding: 1rem;
    }
  </style>
</head>
<body>
  <header>
    <h1>Desenrola Direito</h1>
  </header>
  
  <main>
    <div class="maintenance">
      <h2>Estamos em Manutenção</h2>
      <p>Estamos trabalhando para melhorar o site e oferecer uma experiência ainda melhor para você.</p>
      <div class="heart">♥</div>
      <p>Por favor, aguarde alguns instantes enquanto finalizamos os ajustes.</p>
      <p>Agradecemos sua paciência!</p>
    </div>
  </main>
  
  <footer>
    <p>&copy; 2025 Desenrola Direito - Todos os direitos reservados</p>
  </footer>
</body>
</html>
`;

// Criar servidor
const server = http.createServer((req, res) => {
  // Log da requisição
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Responder todas as requisições com o mesmo HTML
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  
  res.end(html);
});

// Iniciar o servidor
try {
  // Salvar a porta para o Replit
  fs.writeFileSync('.replit.port', PORT.toString());
  
  // Iniciar o servidor na porta especificada
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('Erro ao iniciar o servidor:', error);
}