/**
 * Servidor HTTP Standalone para Desenrola Direito
 * 
 * Este servidor:
 * 1. Serve a versão HTML estática em simples.html
 * 2. Suporta arquivos estáticos (CSS, JS, imagens)
 * 3. Configura cabeçalhos CORS para permitir requisições de API
 * 4. Implementa redirecionamento de todas as rotas para o HTML principal (SPA behavior)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Importe a classe de armazenamento para acessar os dados na memória
const { storage } = require('./server/storage');

// Configuração
const PORT = 5000;
const HTML_PATH = path.join(__dirname, 'index.html');

// Ler o HTML
let html;
try {
  html = fs.readFileSync(HTML_PATH, 'utf8');
  console.log('HTML carregado com sucesso!');
} catch (err) {
  console.error('ERRO: Não foi possível ler o arquivo HTML:', err);
  html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Desenrola Direito - Erro</title>
      <style>
        body { font-family: Arial; max-width: 800px; margin: 0 auto; padding: 20px; }
        .error { color: red; background: #ffeeee; padding: 10px; border-radius: 5px; }
      </style>
    </head>
    <body>
      <h1>Desenrola Direito</h1>
      <div class="error">
        <h2>Erro ao carregar a página</h2>
        <p>Não foi possível ler o arquivo HTML. Por favor, verifique se o arquivo index.html existe.</p>
      </div>
    </body>
    </html>
  `;
}

// Atualizar o arquivo .replit.port
try {
  fs.writeFileSync('.replit.port', PORT.toString());
  console.log(`Porta ${PORT} configurada para o Replit`);
} catch (err) {
  console.warn('Aviso: Não foi possível atualizar .replit.port');
}

// Criar servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Requisição: ${req.method} ${req.url}`);
  
  // Definir cabeçalhos para evitar problemas de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Tratar requisições OPTIONS (preflight CORS)
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Servir a página principal para várias rotas
  if (req.url === '/' || req.url === '/basico' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }
  
  // Rota para verificação de saúde da API
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      message: 'Servidor HTML estático funcionando',
      timestamp: new Date().toISOString()
    }));
    return;
  }
  
  // Servir arquivos estáticos (CSS, JS, imagens, etc.)
  if (req.url && (
      req.url.endsWith('.css') ||
      req.url.endsWith('.js') ||
      req.url.endsWith('.svg') ||
      req.url.endsWith('.png') ||
      req.url.endsWith('.jpg') ||
      req.url.endsWith('.jpeg') ||
      req.url.endsWith('.ico') ||
      req.url.endsWith('.webp') ||
      req.url.endsWith('.json')
    )) {
    // Verificar se o arquivo está na pasta attached_assets
    let filePath = '';
    
    if (req.url.startsWith('/attached_assets/')) {
      filePath = path.join(__dirname, req.url);
    } else if (req.url.startsWith('/assets/')) {
      // Tentar encontrar em attached_assets para arquivos em /assets/
      filePath = path.join(__dirname, 'attached_assets', req.url.substring(8));
    } else {
      // Para outros caminhos, buscar na raiz primeiro, depois em attached_assets
      filePath = path.join(__dirname, req.url.startsWith('/') ? req.url.substring(1) : req.url);
      
      if (!fs.existsSync(filePath)) {
        const alternativePath = path.join(__dirname, 'attached_assets', req.url.startsWith('/') ? req.url.substring(1) : req.url);
        if (fs.existsSync(alternativePath)) {
          filePath = alternativePath;
        }
      }
    }
    
    try {
      const fileContent = fs.readFileSync(filePath);
      let contentType = 'application/octet-stream';
      
      // Determinar o tipo de conteúdo com base na extensão do arquivo
      if (req.url.endsWith('.css')) {
        contentType = 'text/css';
      } else if (req.url.endsWith('.js')) {
        contentType = 'text/javascript';
      } else if (req.url.endsWith('.svg')) {
        contentType = 'image/svg+xml';
      } else if (req.url.endsWith('.png')) {
        contentType = 'image/png';
      } else if (req.url.endsWith('.jpg') || req.url.endsWith('.jpeg')) {
        contentType = 'image/jpeg';
      } else if (req.url.endsWith('.webp')) {
        contentType = 'image/webp';
      } else if (req.url.endsWith('.ico')) {
        contentType = 'image/x-icon';
      } else if (req.url.endsWith('.json')) {
        contentType = 'application/json';
      }
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(fileContent);
      return;
    } catch (err) {
      console.error(`Arquivo não encontrado: ${filePath}`, err);
    }
  }
  
  // Servir arquivos estáticos da pasta 'public'
  if (req.url && req.url.startsWith('/public/')) {
    const filePath = path.join(__dirname, req.url.substring(1));
    
    try {
      const fileContent = fs.readFileSync(filePath);
      let contentType = 'application/octet-stream';
      
      if (req.url.endsWith('.css')) {
        contentType = 'text/css';
      } else if (req.url.endsWith('.js')) {
        contentType = 'text/javascript';
      }
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(fileContent);
      return;
    } catch (err) {
      console.error(`Arquivo não encontrado: ${filePath}`, err);
    }
  }
  
  // Para todos os outros caminhos (rotas SPA), servir o HTML principal
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

// Iniciar o servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Servidor HTML estático rodando na porta ${PORT}`);
  console.log('📱 Acessível em:');
  console.log(`   - http://localhost:${PORT}`);
  console.log('   - http://0.0.0.0:5000');
  console.log('   - https://[seu-replit].repl.co');
  console.log('\n📄 Páginas disponíveis:');
  console.log('   - / (Página principal)');
  console.log('   - /basico (Mesmo conteúdo da raiz)');
  console.log('   - /api/health (Verificação de status)');
});