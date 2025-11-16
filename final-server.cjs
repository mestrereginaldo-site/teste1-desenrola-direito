/**
 * Servidor simples em CommonJS (CJS) para funcionar em qualquer ambiente
 */
const http = require('http');
const fs = require('fs');

// Porta fixa para o Replit
const PORT = 5000;

// HTML estático do site
const HTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desenrola Direito - Em Breve</title>
  <style>
    :root {
      --primary: #0056b3;
      --primary-dark: #003d7a;
      --background: #f5f9ff;
      --text: #333;
      --white: #fff;
      --shadow: rgba(0, 0, 0, 0.1);
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: var(--background);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    header {
      background-color: var(--white);
      box-shadow: 0 2px 10px var(--shadow);
      padding: 15px 0;
    }
    
    .container {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 1.8rem;
      font-weight: bold;
      color: var(--primary);
      text-decoration: none;
    }
    
    .nav-menu {
      display: flex;
      list-style: none;
    }
    
    .nav-menu li {
      margin-left: 25px;
    }
    
    .nav-menu a {
      color: var(--text);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;
    }
    
    .nav-menu a:hover {
      color: var(--primary);
    }
    
    main {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 0;
    }
    
    .maintenance {
      background-color: var(--white);
      border-radius: 10px;
      box-shadow: 0 4px 15px var(--shadow);
      padding: 40px;
      text-align: center;
      max-width: 600px;
      width: 90%;
    }
    
    .maintenance h1 {
      color: var(--primary);
      font-size: 2.2rem;
      margin-bottom: 20px;
    }
    
    .maintenance p {
      font-size: 1.2rem;
      margin-bottom: 30px;
    }
    
    .heart {
      color: var(--primary);
      font-size: 5rem;
      margin: 20px 0;
    }
    
    footer {
      background-color: var(--primary-dark);
      color: var(--white);
      padding: 30px 0;
      text-align: center;
    }
    
    .footer-links {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    
    .footer-links a {
      color: var(--white);
      text-decoration: none;
      margin: 0 15px;
    }
    
    .footer-links a:hover {
      text-decoration: underline;
    }
    
    .copyright {
      font-size: 0.9rem;
      opacity: 0.8;
    }
    
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
      }
      
      .nav-menu {
        margin-top: 15px;
      }
      
      .nav-menu li {
        margin: 0 10px;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="header-content">
        <a href="#" class="logo">Desenrola Direito</a>
        <ul class="nav-menu">
          <li><a href="#">Início</a></li>
          <li><a href="#">Artigos</a></li>
          <li><a href="#">Calculadoras</a></li>
          <li><a href="#">Consulta</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </div>
    </div>
  </header>
  
  <main>
    <div class="maintenance">
      <h1>Estamos em Manutenção</h1>
      <p>Estamos realizando melhorias no site para lhe oferecer uma experiência ainda melhor.</p>
      <div class="heart">♥</div>
      <p>Por favor, aguarde alguns instantes enquanto finalizamos os ajustes.</p>
      <p>Agradecemos sua paciência!</p>
    </div>
  </main>
  
  <footer>
    <div class="container">
      <div class="footer-links">
        <a href="#">Sobre</a>
        <a href="#">Política de Privacidade</a>
        <a href="#">Termos de Uso</a>
        <a href="#">Contato</a>
      </div>
      <p class="copyright">© 2025 Desenrola Direito. Todos os direitos reservados.</p>
    </div>
  </footer>
</body>
</html>
`;

// Criar o servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Requisição: ${req.method} ${req.url}`);
  
  // Configurar cabeçalhos de resposta
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  
  // Enviar o HTML
  res.end(HTML);
});

// Iniciar o servidor
try {
  // Garantir que a porta é registrada para o Replit
  fs.writeFileSync('.replit.port', PORT.toString());
  
  // Iniciar o servidor
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor online na porta ${PORT}`);
    console.log(`🌐 Acesse: http://0.0.0.0:${PORT}`);
  });
} catch (error) {
  console.error('Erro ao iniciar servidor:', error);
}