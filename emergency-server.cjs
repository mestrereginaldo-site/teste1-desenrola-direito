/**
 * Servidor de emergência para o Desenrola Direito
 * Este servidor serve uma versão estática do site
 * com design baseado nas capturas de tela fornecidas.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// HTML estático com CSS embutido baseado nos designs fornecidos
const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desenrola Direito - Versão de Emergência</title>
  <style>
    :root {
      --color-primary: #1e40af;
      --color-secondary: #f97316;
      --color-text: #334155;
      --color-bg: #ffffff;
    }
    body {
      font-family: system-ui, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      color: var(--color-text);
    }
    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 20px;
    }
    header {
      background: var(--color-primary);
      color: white;
      padding: 20px 0;
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
    }
    .hero {
      background: var(--color-primary);
      color: white;
      padding: 60px 0;
      text-align: center;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    .hero p {
      font-size: 1.2rem;
      max-width: 800px;
      margin: 0 auto 2rem;
    }
    .btn {
      display: inline-block;
      background: var(--color-secondary);
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      margin: 0 10px;
    }
    .btn-outline {
      background: transparent;
      border: 2px solid white;
    }
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
      margin: 40px 0;
    }
    .card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 25px;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
    .card-icon {
      width: 50px;
      height: 50px;
      background: var(--color-primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      font-size: 24px;
      margin-bottom: 20px;
    }
    section {
      padding: 60px 0;
    }
    h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 20px;
      color: var(--color-primary);
    }
    .section-desc {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 40px;
      color: #64748b;
    }
    footer {
      background: var(--color-primary);
      color: white;
      padding: 40px 0 20px;
      text-align: center;
    }
    @media (max-width: 768px) {
      .card-grid {
        grid-template-columns: 1fr;
      }
      .header-content {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container header-content">
      <div class="logo">Desenrola Direito</div>
      <nav>
        <a href="#" style="color: white; margin: 0 10px;">Início</a>
        <a href="#" style="color: white; margin: 0 10px;">Categorias</a>
        <a href="#" style="color: white; margin: 0 10px;">Artigos</a>
        <a href="#" style="color: white; margin: 0 10px;">Contato</a>
      </nav>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Simplificando o Conhecimento Jurídico</h1>
      <p>Entenda seus direitos e obrigações legais de forma simples e acessível. Conte com nosso auxílio para resolver questões jurídicas do dia a dia.</p>
      <div>
        <a href="#" class="btn">Consultoria Jurídica</a>
        <a href="#" class="btn btn-outline">Explorar Conteúdo</a>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <h2>Áreas do Direito</h2>
      <p class="section-desc">Navegue por nossas categorias e encontre informações relevantes para sua situação específica.</p>
      
      <div class="card-grid">
        <div class="card">
          <div class="card-icon">📝</div>
          <h3>Direito do Consumidor</h3>
          <p>Tudo sobre seus direitos como consumidor de produtos e serviços.</p>
          <a href="#" style="color: var(--color-primary);">Explorar →</a>
        </div>
        
        <div class="card">
          <div class="card-icon">💼</div>
          <h3>Direito Trabalhista</h3>
          <p>Informações sobre seus direitos e deveres nas relações de trabalho.</p>
          <a href="#" style="color: var(--color-primary);">Explorar →</a>
        </div>
        
        <div class="card">
          <div class="card-icon">🏠</div>
          <h3>Direito Imobiliário</h3>
          <p>Orientações sobre compra, venda e aluguel de imóveis.</p>
          <a href="#" style="color: var(--color-primary);">Explorar →</a>
        </div>
      </div>
    </div>
  </section>

  <section style="background: #f8fafc;">
    <div class="container">
      <h2>Artigos Recentes</h2>
      <p class="section-desc">Fique atualizado com as informações jurídicas mais recentes e relevantes.</p>
      
      <div class="card-grid">
        <div class="card" style="background: white;">
          <h3>Direitos do Consumidor no E-commerce</h3>
          <p>Saiba quais são seus direitos ao comprar produtos pela internet...</p>
          <div style="color: #64748b; font-size: 14px;">15 de Abril, 2025</div>
        </div>
        
        <div class="card" style="background: white;">
          <h3>Direitos na Demissão sem Justa Causa</h3>
          <p>Entenda quais são seus direitos quando demitido sem justa causa...</p>
          <div style="color: #64748b; font-size: 14px;">22 de Janeiro, 2025</div>
        </div>
        
        <div class="card" style="background: white;">
          <h3>O que Verificar Antes de Comprar um Imóvel</h3>
          <p>Lista de verificação essencial antes de fechar negócio imobiliário...</p>
          <div style="color: #64748b; font-size: 14px;">15 de Março, 2025</div>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; 2025 Desenrola Direito. Todos os direitos reservados.</p>
    </div>
  </footer>
</body>
</html>`;

// Criar servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  
  // Rota para a API de saúde
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', message: 'API está funcionando!' }));
    return;
  }
  
  // Para qualquer outra rota, retorna o HTML estático
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
});

// Porta na qual o servidor irá escutar (5001 para evitar conflitos com a 5000)
const PORT = 5001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor de emergência rodando na porta ${PORT}`);
  console.log(`Site disponível em: http://localhost:${PORT}`);
  
  // Atualizar o arquivo .replit.port para que o Replit detecte a porta
  try {
    fs.writeFileSync('.replit.port', String(PORT));
    console.log(`Porta ${PORT} registrada para o Replit`);
  } catch (err) {
    console.error('Erro ao atualizar arquivo .replit.port:', err);
  }
});