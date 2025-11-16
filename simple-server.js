// @ts-check
// Servidor super simplificado que não depende de módulos externos

import http from 'http';

// Configurações
const PORT = 5000;

// HTML de manutenção
const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desenrola Direito - Em Manutenção</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f5f9ff;
      color: #333;
      margin: 0;
      padding: 20px;
      line-height: 1.6;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    
    .maintenance-container {
      max-width: 600px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      padding: 30px;
      text-align: center;
    }
    
    h1 {
      color: #0056b3;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    
    p {
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }
    
    .heart {
      color: #0056b3;
      font-size: 5rem;
      margin: 2rem 0;
    }
  </style>
</head>
<body>
  <div class="maintenance-container">
    <h1>Desenrola Direito</h1>
    <p>Estamos realizando melhorias no site para lhe oferecer uma experiência ainda melhor.</p>
    <div class="heart">♥</div>
    <p>Por favor, aguarde alguns instantes enquanto finalizamos os ajustes técnicos.</p>
    <p>Agradecemos sua paciência!</p>
  </div>
</body>
</html>
`;

// Criar o servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Requisição recebida: ${req.url}`);
  
  // Definir cabeçalhos para compatibilidade
  res.writeHead(200, { 
    'Content-Type': 'text/html; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  
  // Responder com o HTML
  res.end(HTML_CONTENT);
});

// Iniciar o servidor
try {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor básico rodando na porta ${PORT}`);
    console.log(`🔗 Acesse: http://0.0.0.0:${PORT}`);
  });
} catch (error) {
  console.error('Erro ao iniciar o servidor:', error);
}