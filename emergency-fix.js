/**
 * SOLUÇÃO DE EMERGÊNCIA
 * 
 * Este script cria um servidor web simples que serve arquivos estáticos
 * como uma solução imediata para o problema de rendering no Replit.
 */

const express = require('express');
const path = require('path');

const app = express();

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Criar uma página inicial simples
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Desenrola Direito</title>
        <style>
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #1e40af;
            color: white;
            padding: 30px 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 2.5rem;
          }
          .header p {
            font-size: 1.2rem;
            margin: 10px 0 0;
            opacity: 0.9;
          }
          .categories {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
          }
          .category-card {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            transition: all 0.3s ease;
          }
          .category-card:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: translateY(-5px);
          }
          .category-card h3 {
            color: #1e40af;
            margin-top: 0;
          }
          .articles {
            margin-bottom: 40px;
          }
          .article-card {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
          }
          .article-card h3 {
            margin-top: 0;
            color: #1e3a8a;
          }
          .article-meta {
            color: #6b7280;
            font-size: 0.9rem;
            margin-bottom: 10px;
          }
          .article-excerpt {
            margin-bottom: 15px;
          }
          .footer {
            text-align: center;
            padding: 30px 0;
            margin-top: 40px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
          }
          .api-section {
            background-color: #f3f4f6;
            padding: 20px;
            border-radius: 8px;
            margin-top: 40px;
          }
          .api-link {
            display: block;
            margin: 10px 0;
            color: #2563eb;
            text-decoration: none;
          }
          .api-link:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Desenrola Direito</h1>
          <p>Informações jurídicas acessíveis para todos</p>
        </div>
        
        <h2>Categorias</h2>
        <div class="categories">
          <div class="category-card">
            <h3>Direito do Consumidor</h3>
            <p>Tudo sobre seus direitos como consumidor de produtos e serviços</p>
          </div>
          <div class="category-card">
            <h3>Direito Trabalhista</h3>
            <p>Informações sobre seus direitos e deveres nas relações de trabalho</p>
          </div>
          <div class="category-card">
            <h3>Direito Imobiliário</h3>
            <p>Orientações sobre compra, venda e aluguel de imóveis</p>
          </div>
        </div>
        
        <h2>Artigos Recentes</h2>
        <div class="articles">
          <div class="article-card">
            <h3>Artigo 1 sobre Direito do Consumidor</h3>
            <div class="article-meta">Categoria: Direito do Consumidor • 15 de Abril de 2025</div>
            <div class="article-excerpt">Resumo do artigo 1 sobre Direito do Consumidor.</div>
          </div>
          <div class="article-card">
            <h3>Artigo 1 sobre Direito Trabalhista</h3>
            <div class="article-meta">Categoria: Direito Trabalhista • 10 de Abril de 2025</div>
            <div class="article-excerpt">Resumo do artigo 1 sobre Direito Trabalhista.</div>
          </div>
        </div>
        
        <div class="api-section">
          <h2>API do Desenrola Direito</h2>
          <p>Endpoints disponíveis:</p>
          <a href="/api/health" class="api-link">/api/health</a>
          <a href="/api/categories" class="api-link">/api/categories</a>
          <a href="/api/articles" class="api-link">/api/articles</a>
          <a href="/api/articles/recent" class="api-link">/api/articles/recent</a>
          <a href="/api/articles/featured" class="api-link">/api/articles/featured</a>
          <a href="/api/solutions" class="api-link">/api/solutions</a>
        </div>
        
        <div class="footer">
          <p>© 2025 Desenrola Direito - Todos os direitos reservados</p>
        </div>
      </body>
    </html>
  `);
});

// Rota de API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API está funcionando!' });
});

// Rota para categorias
app.get('/api/categories', (req, res) => {
  const categories = [
    {
      id: 1,
      name: "Direito do Consumidor",
      slug: "direito-consumidor",
      description: "Tudo sobre seus direitos como consumidor de produtos e serviços",
      iconName: "shopping-cart",
      imageUrl: "https://images.unsplash.com/photo-1556742031-c6961e8560b0"
    },
    {
      id: 2,
      name: "Direito Trabalhista",
      slug: "direito-trabalhista",
      description: "Informações sobre seus direitos e deveres nas relações de trabalho",
      iconName: "briefcase",
      imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216"
    },
    {
      id: 3,
      name: "Direito Imobiliário",
      slug: "direito-imobiliario",
      description: "Orientações sobre compra, venda e aluguel de imóveis",
      iconName: "home",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
    }
  ];
  
  res.json(categories);
});

// Rotas adicionais de API
app.get('/api/articles', (req, res) => {
  res.json([
    {
      id: 1,
      title: "Artigo 1 sobre Direito do Consumidor",
      slug: "artigo-1-direito-consumidor",
      excerpt: "Resumo do artigo 1 sobre Direito do Consumidor.",
      content: "Conteúdo completo do artigo aqui...",
      publishDate: "2025-04-15T10:00:00Z",
      categoryId: 1,
      category: {
        id: 1,
        name: "Direito do Consumidor",
        slug: "direito-consumidor"
      }
    },
    {
      id: 2,
      title: "Artigo 1 sobre Direito Trabalhista",
      slug: "artigo-1-direito-trabalhista",
      excerpt: "Resumo do artigo 1 sobre Direito Trabalhista.",
      content: "Conteúdo completo do artigo aqui...",
      publishDate: "2025-04-10T10:00:00Z",
      categoryId: 2,
      category: {
        id: 2,
        name: "Direito Trabalhista",
        slug: "direito-trabalhista"
      }
    }
  ]);
});

app.get('/api/articles/recent', (req, res) => {
  res.json([
    {
      id: 1,
      title: "Artigo 1 sobre Direito do Consumidor",
      slug: "artigo-1-direito-consumidor",
      excerpt: "Resumo do artigo 1 sobre Direito do Consumidor.",
      publishDate: "2025-04-15T10:00:00Z",
      categoryId: 1,
      category: {
        id: 1,
        name: "Direito do Consumidor",
        slug: "direito-consumidor"
      }
    },
    {
      id: 2,
      title: "Artigo 1 sobre Direito Trabalhista",
      slug: "artigo-1-direito-trabalhista",
      excerpt: "Resumo do artigo 1 sobre Direito Trabalhista.",
      publishDate: "2025-04-10T10:00:00Z",
      categoryId: 2,
      category: {
        id: 2,
        name: "Direito Trabalhista",
        slug: "direito-trabalhista"
      }
    }
  ]);
});

app.get('/api/articles/featured', (req, res) => {
  res.json([
    {
      id: 1,
      title: "Artigo 1 sobre Direito do Consumidor",
      slug: "artigo-1-direito-consumidor",
      excerpt: "Resumo do artigo 1 sobre Direito do Consumidor.",
      publishDate: "2025-04-15T10:00:00Z",
      categoryId: 1,
      category: {
        id: 1,
        name: "Direito do Consumidor",
        slug: "direito-consumidor"
      }
    }
  ]);
});

app.get('/api/solutions', (req, res) => {
  res.json([
    {
      id: 1,
      title: "Consultoria Jurídica Online",
      description: "Tire suas dúvidas com advogados especializados em direito civil sem sair de casa",
      link: "/consultoria-juridica",
      linkText: "Agendar Consulta",
      imageUrl: null
    },
    {
      id: 2,
      title: "Revisão de Contratos",
      description: "Análise profissional de contratos para identificar cláusulas abusivas ou irregularidades",
      link: "/revisao-contratos",
      linkText: "Solicitar Revisão",
      imageUrl: null
    }
  ]);
});

// Iniciar o servidor na porta 80
const PORT = process.env.PORT || 80;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor de emergência rodando na porta ${PORT}`);
});