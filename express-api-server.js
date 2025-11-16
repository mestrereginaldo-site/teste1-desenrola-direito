/**
 * Servidor Express para o Desenrola Direito
 * Serve apenas a API para o frontend
 * Porta fixa: 5000 (para o Replit)
 */
const express = require('express');
const fs = require('fs');

// Criar o aplicativo Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Garantir que o arquivo .replit.port existe
fs.writeFileSync('.replit.port', '5000');

// Configuração de CORS para desenvolvimento
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Rota de saúde básica (health check)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API está funcionando!' });
});

// Rota para categorias
app.get('/api/categories', (req, res) => {
  const categories = [
    {
      id: 1,
      name: "Direito do Consumidor",
      slug: "direito-do-consumidor",
      description: "Tudo sobre seus direitos como consumidor de produtos e serviços",
      iconName: "ShoppingCart"
    },
    {
      id: 2,
      name: "Direito Trabalhista",
      slug: "direito-trabalhista",
      description: "Informações sobre seus direitos e deveres nas relações de trabalho",
      iconName: "Briefcase"
    },
    {
      id: 3,
      name: "Direito Imobiliário",
      slug: "direito-imobiliario",
      description: "Orientações sobre compra, venda e aluguel de imóveis",
      iconName: "Home"
    },
    {
      id: 4,
      name: "Direito Familiar",
      slug: "direito-familiar",
      description: "Orientações sobre casamento, divórcio, guarda de filhos e pensão alimentícia",
      iconName: "Users"
    },
    {
      id: 5,
      name: "Direito Previdenciário",
      slug: "direito-previdenciario",
      description: "Informações sobre aposentadoria, pensões e benefícios do INSS",
      iconName: "Heart"
    },
    {
      id: 6,
      name: "Direito Penal",
      slug: "direito-penal",
      description: "Orientações sobre crimes, processos criminais e direitos do acusado",
      iconName: "Shield"
    }
  ];

  res.json(categories);
});

// Rota para artigos
app.get('/api/articles', (req, res) => {
  const articles = [
    {
      id: 1,
      title: "Direitos do Consumidor no E-commerce",
      slug: "direitos-do-consumidor-no-ecommerce",
      excerpt: "Saiba quais são seus direitos ao comprar produtos pela internet...",
      content: "Conteúdo completo do artigo sobre e-commerce",
      publishDate: "2025-02-15T10:00:00Z",
      imageUrl: "https://source.unsplash.com/random/800x600/?shopping",
      category: {
        id: 1,
        name: "Direito do Consumidor",
        slug: "direito-do-consumidor"
      },
      featured: true
    },
    {
      id: 2,
      title: "Como Negociar Dívidas com Bancos",
      slug: "como-negociar-dividas-com-bancos",
      excerpt: "Guia prático para negociação de dívidas bancárias com sucesso...",
      content: "Conteúdo completo do artigo sobre negociação de dívidas",
      publishDate: "2025-03-07T14:30:00Z",
      imageUrl: "https://source.unsplash.com/random/800x600/?bank",
      category: {
        id: 1,
        name: "Direito do Consumidor",
        slug: "direito-do-consumidor"
      },
      featured: false
    },
    {
      id: 3,
      title: "Direitos na Demissão sem Justa Causa",
      slug: "direitos-na-demissao-sem-justa-causa",
      excerpt: "Entenda quais são seus direitos quando demitido sem justa causa...",
      content: "Conteúdo completo do artigo sobre demissão sem justa causa",
      publishDate: "2025-01-22T09:15:00Z",
      imageUrl: "https://source.unsplash.com/random/800x600/?job",
      category: {
        id: 2,
        name: "Direito Trabalhista",
        slug: "direito-trabalhista"
      },
      featured: true
    },
    {
      id: 4,
      title: "Como Funciona o Aviso Prévio",
      slug: "como-funciona-o-aviso-previo",
      excerpt: "Tudo o que você precisa saber sobre o aviso prévio no trabalho...",
      content: "Conteúdo completo do artigo sobre aviso prévio",
      publishDate: "2025-02-28T11:20:00Z",
      imageUrl: "https://source.unsplash.com/random/800x600/?contract",
      category: {
        id: 2,
        name: "Direito Trabalhista",
        slug: "direito-trabalhista"
      },
      featured: false
    },
    {
      id: 5,
      title: "O que Verificar Antes de Comprar um Imóvel",
      slug: "o-que-verificar-antes-de-comprar-um-imovel",
      excerpt: "Lista de verificação essencial antes de fechar negócio imobiliário...",
      content: "Conteúdo completo do artigo sobre compra de imóveis",
      publishDate: "2025-03-15T13:45:00Z",
      imageUrl: "https://source.unsplash.com/random/800x600/?house",
      category: {
        id: 3,
        name: "Direito Imobiliário",
        slug: "direito-imobiliario"
      },
      featured: true
    },
    {
      id: 6,
      title: "Direitos e Deveres do Inquilino",
      slug: "direitos-e-deveres-do-inquilino",
      excerpt: "Conheça os direitos e responsabilidades de quem aluga imóvel...",
      content: "Conteúdo completo do artigo sobre direitos do inquilino",
      publishDate: "2025-01-10T15:30:00Z",
      imageUrl: "https://source.unsplash.com/random/800x600/?apartment",
      category: {
        id: 3,
        name: "Direito Imobiliário",
        slug: "direito-imobiliario"
      },
      featured: false
    }
  ];

  res.json(articles);
});

// Artigos recentes
app.get('/api/articles/recent', (req, res) => {
  const articles = [
    {
      id: 1,
      title: "Direitos do Consumidor no E-commerce",
      slug: "direitos-do-consumidor-no-ecommerce",
      excerpt: "Saiba quais são seus direitos ao comprar produtos pela internet...",
      publishDate: "2025-02-15T10:00:00Z",
      imageUrl: "https://source.unsplash.com/random/800x600/?shopping",
      category: {
        id: 1,
        name: "Direito do Consumidor",
        slug: "direito-do-consumidor"
      }
    },
    {
      id: 3,
      title: "Direitos na Demissão sem Justa Causa",
      slug: "direitos-na-demissao-sem-justa-causa",
      excerpt: "Entenda quais são seus direitos quando demitido sem justa causa...",
      publishDate: "2025-01-22T09:15:00Z",
      imageUrl: "https://source.unsplash.com/random/800x600/?job",
      category: {
        id: 2,
        name: "Direito Trabalhista",
        slug: "direito-trabalhista"
      }
    },
    {
      id: 5,
      title: "O que Verificar Antes de Comprar um Imóvel",
      slug: "o-que-verificar-antes-de-comprar-um-imovel",
      excerpt: "Lista de verificação essencial antes de fechar negócio imobiliário...",
      publishDate: "2025-03-15T13:45:00Z",
      imageUrl: "https://source.unsplash.com/random/800x600/?house",
      category: {
        id: 3,
        name: "Direito Imobiliário",
        slug: "direito-imobiliario"
      }
    }
  ];

  res.json(articles);
});

// Artigos em destaque
app.get('/api/articles/featured', (req, res) => {
  const articles = [
    {
      id: 1,
      title: "Direitos do Consumidor no E-commerce",
      slug: "direitos-do-consumidor-no-ecommerce",
      excerpt: "Saiba quais são seus direitos ao comprar produtos pela internet...",
      publishDate: "2025-02-15T10:00:00Z",
      imageUrl: "https://source.unsplash.com/random/800x600/?shopping",
      category: {
        id: 1,
        name: "Direito do Consumidor",
        slug: "direito-do-consumidor"
      }
    },
    {
      id: 3,
      title: "Direitos na Demissão sem Justa Causa",
      slug: "direitos-na-demissao-sem-justa-causa",
      excerpt: "Entenda quais são seus direitos quando demitido sem justa causa...",
      publishDate: "2025-01-22T09:15:00Z",
      imageUrl: "https://source.unsplash.com/random/800x600/?job",
      category: {
        id: 2,
        name: "Direito Trabalhista",
        slug: "direito-trabalhista"
      }
    },
    {
      id: 5,
      title: "O que Verificar Antes de Comprar um Imóvel",
      slug: "o-que-verificar-antes-de-comprar-um-imovel",
      excerpt: "Lista de verificação essencial antes de fechar negócio imobiliário...",
      publishDate: "2025-03-15T13:45:00Z",
      imageUrl: "https://source.unsplash.com/random/800x600/?house",
      category: {
        id: 3,
        name: "Direito Imobiliário",
        slug: "direito-imobiliario"
      }
    }
  ];

  res.json(articles);
});

// Rota para soluções
app.get('/api/solutions', (req, res) => {
  const solutions = [
    {
      id: 1,
      title: "Consultoria Jurídica Online",
      description: "Orientação jurídica personalizada em tempo real, sem sair de casa.",
      iconName: "MessageCircle"
    },
    {
      id: 2,
      title: "Análise de Contratos",
      description: "Análise detalhada dos seus contratos para evitar problemas futuros.",
      iconName: "FileText"
    },
    {
      id: 3,
      title: "Cartas e Notificações",
      description: "Elaboração de documentos oficiais para resolver seu problema extrajudicialmente.",
      iconName: "Mail"
    },
    {
      id: 4,
      title: "Representação Jurídica",
      description: "Representação por advogados especializados para cases que exijam ação judicial.",
      iconName: "Shield"
    }
  ];

  res.json(solutions);
});

// Rota para contato (POST)
app.post('/api/contact', (req, res) => {
  // Simulação de envio de contato
  const { name, email, phone, subject, message } = req.body;
  
  // Log do contato
  console.log('Contato recebido:');
  console.log('Nome:', name);
  console.log('Email:', email);
  console.log('Telefone:', phone);
  console.log('Assunto:', subject);
  console.log('Mensagem:', message);
  
  // Resposta simulando sucesso
  res.status(200).json({
    success: true,
    message: 'Mensagem enviada com sucesso!'
  });
});

// Rota para consultoria jurídica (POST)
app.post('/api/legal-consultation', (req, res) => {
  // Simulação de solicitação de consultoria
  const { name, email, phone, issue, details } = req.body;
  
  // Log da solicitação
  console.log('Solicitação de consultoria recebida:');
  console.log('Nome:', name);
  console.log('Email:', email);
  console.log('Telefone:', phone);
  console.log('Problema:', issue);
  console.log('Detalhes:', details);
  
  // Resposta simulando sucesso
  res.status(200).json({
    success: true,
    message: 'Solicitação de consultoria enviada com sucesso!'
  });
});

// Rota principal para facilitar testes de API
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API do Desenrola Direito</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
          h1 { color: #1e40af; }
          .endpoint { background: #f1f5f9; padding: 10px; margin-bottom: 10px; border-radius: 4px; }
          .endpoint a { color: #2563eb; text-decoration: none; }
          .endpoint a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>Desenrola Direito - API</h1>
        <p>Esta é a API do Desenrola Direito. Os endpoints disponíveis são:</p>
        
        <div class="endpoint">
          <a href="/api/health">/api/health</a> - Verificar status da API
        </div>
        
        <div class="endpoint">
          <a href="/api/categories">/api/categories</a> - Listar todas as categorias
        </div>
        
        <div class="endpoint">
          <a href="/api/articles">/api/articles</a> - Listar todos os artigos
        </div>
        
        <div class="endpoint">
          <a href="/api/articles/recent">/api/articles/recent</a> - Listar artigos recentes
        </div>
        
        <div class="endpoint">
          <a href="/api/articles/featured">/api/articles/featured</a> - Listar artigos em destaque
        </div>
        
        <div class="endpoint">
          <a href="/api/solutions">/api/solutions</a> - Listar soluções/serviços
        </div>
        
        <p>Para o site principal, consulte o frontend React.</p>
      </body>
    </html>
  `);
});

// Iniciar o servidor na porta 5000 (para Replit)
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor Express rodando na porta ${PORT}`);
  console.log(`🌐 API disponível em: http://localhost:${PORT}`);
});