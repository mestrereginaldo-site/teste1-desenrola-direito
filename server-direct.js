import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { storage } from './server/storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Corpo JSON
app.use(express.json());

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando!' });
});

// Rota para categorias
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await storage.getCategories();
    res.json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

// Rota para artigos
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await storage.getArticles();
    res.json(articles);
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    res.status(500).json({ error: 'Erro ao buscar artigos' });
  }
});

// Página inicial simples
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Desenrola Direito - API Direta</title>
        <meta charset="UTF-8">
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
          h1 { color: #1e40af; }
          h2 { color: #2563eb; }
          .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
          .endpoint { background-color: #f9fafb; padding: 8px; border-left: 4px solid #3b82f6; margin-bottom: 8px; }
          code { font-family: monospace; background-color: #f1f5f9; padding: 2px 4px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>Desenrola Direito - API</h1>
        
        <div class="card">
          <h2>✅ Servidor funcionando!</h2>
          <p>O servidor está respondendo na porta ${PORT}.</p>
          <p>Data atual: ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="card">
          <h2>Endpoints disponíveis:</h2>
          
          <div class="endpoint">
            <code>GET /api/health</code>
            <p>Verifica o status da API</p>
          </div>
          
          <div class="endpoint">
            <code>GET /api/categories</code>
            <p>Lista todas as categorias de artigos</p>
          </div>
          
          <div class="endpoint">
            <code>GET /api/articles</code>
            <p>Lista todos os artigos</p>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Rota de fallback
app.get('*', (req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Página não encontrada - Desenrola Direito</title>
        <meta charset="UTF-8">
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #1e40af; }
          .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
          .back { display: inline-block; margin-top: 1rem; padding: 0.5rem 1rem; background-color: #1e40af; color: white; text-decoration: none; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>Desenrola Direito</h1>
        <div class="card">
          <h2>⚠️ Página não encontrada</h2>
          <p>A URL solicitada não existe em nosso servidor.</p>
          <p>URL requisitada: ${req.url}</p>
          <a href="/" class="back">Voltar para a página inicial</a>
        </div>
      </body>
    </html>
  `);
});

// Iniciar o servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor direto rodando em http://0.0.0.0:${PORT}`);
});