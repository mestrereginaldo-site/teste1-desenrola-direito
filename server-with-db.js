/**
 * Servidor HTTP Standalone para Desenrola Direito com Integração de Banco de Dados PostgreSQL
 * 
 * Este servidor:
 * 1. Serve a versão HTML estática em index.html
 * 2. Implementa rotas de API conectadas ao PostgreSQL
 * 3. Suporta arquivos estáticos (CSS, JS, imagens)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { Pool } = require('@neondatabase/serverless');
const ws = require('ws');

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

// Configuração do PostgreSQL
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  webSocketConstructor: ws
});

// Testar a conexão com o banco de dados
async function testDatabaseConnection() {
  try {
    const client = await pool.connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    client.release();
    return true;
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return false;
  }
}

// Funções de acesso ao banco de dados
async function getCategoriesFromDB() {
  try {
    const result = await pool.query('SELECT id, name, slug, description, icon_name as "iconName" FROM categories ORDER BY name');
    return result.rows;
  } catch (err) {
    console.error('Erro ao obter categorias:', err);
    return [];
  }
}

async function getArticlesFromDB() {
  try {
    const result = await pool.query(`
      SELECT a.*, c.name as category_name, c.slug as category_slug, c.description as category_description, c.icon_name as category_icon
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      ORDER BY a.publish_date DESC
    `);
    
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      imageUrl: row.image_url,
      publishDate: row.publish_date,
      categoryId: row.category_id,
      featured: row.featured,
      category: {
        id: row.category_id,
        name: row.category_name,
        slug: row.category_slug,
        description: row.category_description,
        iconName: row.category_icon
      }
    }));
  } catch (err) {
    console.error('Erro ao obter artigos:', err);
    return [];
  }
}

async function getRecentArticlesFromDB(limit = 5) {
  try {
    const result = await pool.query(`
      SELECT a.*, c.name as category_name, c.slug as category_slug, c.description as category_description, c.icon_name as category_icon
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      ORDER BY a.publish_date DESC
      LIMIT $1
    `, [limit]);
    
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      imageUrl: row.image_url,
      publishDate: row.publish_date,
      categoryId: row.category_id,
      featured: row.featured,
      category: {
        id: row.category_id,
        name: row.category_name,
        slug: row.category_slug,
        description: row.category_description,
        iconName: row.category_icon
      }
    }));
  } catch (err) {
    console.error('Erro ao obter artigos recentes:', err);
    return [];
  }
}

async function getArticlesByCategoryFromDB(categorySlug) {
  try {
    const result = await pool.query(`
      SELECT a.*, c.name as category_name, c.slug as category_slug, c.description as category_description, c.icon_name as category_icon
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      WHERE c.slug = $1
      ORDER BY a.publish_date DESC
    `, [categorySlug]);
    
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      imageUrl: row.image_url,
      publishDate: row.publish_date,
      categoryId: row.category_id,
      featured: row.featured,
      category: {
        id: row.category_id,
        name: row.category_name,
        slug: row.category_slug,
        description: row.category_description,
        iconName: row.category_icon
      }
    }));
  } catch (err) {
    console.error('Erro ao obter artigos por categoria:', err);
    return [];
  }
}

async function getSolutionsFromDB() {
  try {
    const result = await pool.query('SELECT id, title, description, image_url as "imageUrl", link, link_text as "linkText" FROM solutions ORDER BY title');
    return result.rows;
  } catch (err) {
    console.error('Erro ao obter soluções:', err);
    return [];
  }
}

async function searchArticlesFromDB(query) {
  try {
    const searchTerm = `%${query}%`;
    const result = await pool.query(`
      SELECT a.*, c.name as category_name, c.slug as category_slug, c.description as category_description, c.icon_name as category_icon
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      WHERE a.title ILIKE $1 OR a.excerpt ILIKE $1 OR a.content ILIKE $1
      ORDER BY a.publish_date DESC
    `, [searchTerm]);
    
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      imageUrl: row.image_url,
      publishDate: row.publish_date,
      categoryId: row.category_id,
      featured: row.featured,
      category: {
        id: row.category_id,
        name: row.category_name,
        slug: row.category_slug,
        description: row.category_description,
        iconName: row.category_icon
      }
    }));
  } catch (err) {
    console.error('Erro ao buscar artigos:', err);
    return [];
  }
}

// Processador de requisições de API
async function handleApiRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // API de categorias
  if (pathname === '/api/categories') {
    const categories = await getCategoriesFromDB();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(categories));
    return true;
  }
  
  // API de artigos
  if (pathname === '/api/articles') {
    const articles = await getArticlesFromDB();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(articles));
    return true;
  }
  
  // API de artigos recentes
  if (pathname === '/api/articles/recent') {
    const limit = parsedUrl.query.limit ? parseInt(parsedUrl.query.limit) : 5;
    const articles = await getRecentArticlesFromDB(limit);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(articles));
    return true;
  }
  
  // API de artigos por categoria
  if (pathname.startsWith('/api/articles/category/')) {
    const categorySlug = pathname.substring('/api/articles/category/'.length);
    const articles = await getArticlesByCategoryFromDB(categorySlug);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(articles));
    return true;
  }
  
  // API de busca de artigos
  if (pathname === '/api/articles/search') {
    const query = parsedUrl.query.q || '';
    const articles = await searchArticlesFromDB(query);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(articles));
    return true;
  }
  
  // API de soluções
  if (pathname === '/api/solutions') {
    const solutions = await getSolutionsFromDB();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(solutions));
    return true;
  }
  
  // Verificação de saúde da API
  if (pathname === '/api/health') {
    const dbStatus = await testDatabaseConnection();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: dbStatus ? 'ok' : 'database_error',
      message: dbStatus ? 'Servidor e banco de dados funcionando' : 'Servidor funcionando, mas há problemas com o banco de dados',
      timestamp: new Date().toISOString()
    }));
    return true;
  }
  
  return false; // Se não for uma rota de API
}

// Criar servidor HTTP
const server = http.createServer(async (req, res) => {
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
  
  // Verificar se é uma requisição de API
  if (req.url && req.url.startsWith('/api/')) {
    const isApiHandled = await handleApiRequest(req, res);
    if (isApiHandled) return;
  }
  
  // Servir a página principal para várias rotas
  if (req.url === '/' || req.url === '/basico' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
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
  
  // Para todos os outros caminhos (rotas SPA), servir o HTML principal
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

// Testar a conexão com o banco de dados e iniciar o servidor
(async () => {
  const dbStatus = await testDatabaseConnection();
  
  // Mesmo se o banco de dados falhar, continuamos para servir o HTML
  console.log(dbStatus 
    ? '✅ Banco de dados pronto!' 
    : '⚠️ Problemas com o banco de dados. Funcionando em modo off-line.'
  );
  
  // Iniciar o servidor
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Servidor com banco de dados rodando na porta ${PORT}`);
    console.log('📱 Acessível em:');
    console.log(`   - http://localhost:${PORT}`);
    console.log(`   - http://0.0.0.0:${PORT}`);
    console.log('   - https://[seu-replit].repl.co');
    console.log('\n📄 API Endpoints disponíveis:');
    console.log('   - /api/categories');
    console.log('   - /api/articles');
    console.log('   - /api/articles/recent');
    console.log('   - /api/articles/category/:slug');
    console.log('   - /api/articles/search?q=termo');
    console.log('   - /api/solutions');
    console.log('   - /api/health');
  });
})();