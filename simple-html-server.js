/**
 * Servidor simples para o Desenrola Direito
 * Este servidor serve o HTML estático das imagens fornecidas
 */
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Criar o aplicativo Express
const app = express();
app.use(express.json());

// Garantir que o arquivo .replit.port existe
fs.writeFileSync('.replit.port', '5000');

// Rota da API de saúde
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

// Rota principal com HTML das imagens fornecidas
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desenrola Direito - Simplificando o Conhecimento Jurídico</title>
  <style>
    :root {
      --color-primary: #1e40af;
      --color-primary-dark: #1e3a8a;
      --color-primary-light: #3b82f6;
      --color-secondary: #f97316;
      --color-text: #334155;
      --color-text-light: #64748b;
      --color-background: #ffffff;
      --color-gray-100: #f1f5f9;
      --color-gray-200: #e2e8f0;
      --color-gray-300: #cbd5e1;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: var(--color-text);
      line-height: 1.6;
      background-color: var(--color-background);
    }
    
    a {
      color: var(--color-primary);
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }
    
    /* Header */
    .header {
      background-color: var(--color-background);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .logo {
      font-size: 24px;
      font-weight: 700;
      color: var(--color-primary);
    }
    
    .nav-links {
      display: flex;
      gap: 24px;
    }
    
    .nav-links a {
      color: var(--color-text);
      font-weight: 500;
    }
    
    .nav-links a:hover, 
    .nav-links a.active {
      color: var(--color-primary);
    }
    
    /* Hero Section */
    .hero {
      background-color: var(--color-primary);
      color: #fff;
      padding: 80px 0;
    }
    
    .hero-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 60px;
    }
    
    .hero-content {
      max-width: 600px;
    }
    
    .hero h1 {
      font-size: 48px;
      line-height: 1.2;
      margin-bottom: 24px;
    }
    
    .hero p {
      font-size: 20px;
      margin-bottom: 32px;
      opacity: 0.9;
    }
    
    .btn {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 4px;
      font-weight: 500;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-primary {
      background-color: var(--color-secondary);
      color: white;
    }
    
    .btn-primary:hover {
      background-color: #ea580c;
      text-decoration: none;
    }
    
    .btn-outline {
      background-color: transparent;
      color: white;
      border: 1px solid white;
      margin-left: 16px;
    }
    
    .btn-outline:hover {
      background-color: rgba(255, 255, 255, 0.1);
      text-decoration: none;
    }
    
    /* Categories Section */
    .section {
      padding: 80px 0;
    }
    
    .section-title {
      font-size: 32px;
      color: var(--color-primary-dark);
      margin-bottom: 16px;
    }
    
    .section-description {
      font-size: 18px;
      color: var(--color-text-light);
      margin-bottom: 48px;
      max-width: 800px;
    }
    
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }
    
    .category-card {
      background-color: var(--color-background);
      border: 1px solid var(--color-gray-200);
      border-radius: 8px;
      padding: 24px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .category-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .category-icon {
      width: 48px;
      height: 48px;
      background-color: var(--color-primary-light);
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      font-size: 24px;
    }
    
    .category-card h3 {
      font-size: 20px;
      margin-bottom: 12px;
      color: var(--color-primary-dark);
    }
    
    .category-card p {
      color: var(--color-text-light);
      margin-bottom: 16px;
    }
    
    .category-card a {
      display: inline-flex;
      align-items: center;
      font-weight: 500;
    }
    
    .category-card a span {
      margin-left: 4px;
    }
    
    /* Articles Section */
    .articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 32px;
    }
    
    .article-card {
      background-color: var(--color-background);
      border: 1px solid var(--color-gray-200);
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .article-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .article-image {
      height: 200px;
      background-color: var(--color-gray-100);
      background-size: cover;
      background-position: center;
    }
    
    .article-content {
      padding: 24px;
    }
    
    .article-category {
      display: inline-block;
      padding: 4px 12px;
      background-color: var(--color-primary-light);
      color: white;
      border-radius: 16px;
      font-size: 14px;
      margin-bottom: 12px;
    }
    
    .article-title {
      font-size: 20px;
      margin-bottom: 12px;
      color: var(--color-primary-dark);
    }
    
    .article-excerpt {
      color: var(--color-text-light);
      margin-bottom: 16px;
    }
    
    .article-meta {
      font-size: 14px;
      color: var(--color-text-light);
    }
    
    /* Quick Access Section */
    .quick-access {
      background-color: var(--color-gray-100);
    }
    
    .quick-access-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }
    
    .quick-access-card {
      background-color: var(--color-background);
      border-radius: 8px;
      padding: 24px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
    }
    
    .quick-access-card:hover {
      transform: translateY(-5px);
    }
    
    .quick-access-icon {
      width: 64px;
      height: 64px;
      background-color: var(--color-primary-light);
      color: white;
      border-radius: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 32px;
    }
    
    .quick-access-card h3 {
      font-size: 20px;
      margin-bottom: 12px;
      color: var(--color-primary-dark);
    }
    
    .quick-access-card p {
      color: var(--color-text-light);
      margin-bottom: 16px;
    }
    
    /* Consultation Section */
    .consultation {
      background-color: var(--color-primary);
      color: white;
    }
    
    .consultation-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
    }
    
    .consultation h2 {
      color: white;
    }
    
    .consultation-description {
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 24px;
    }
    
    .consultation-features {
      margin-bottom: 32px;
    }
    
    .consultation-feature {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .consultation-feature svg {
      margin-right: 12px;
      color: var(--color-secondary);
    }
    
    .consultation-form {
      background-color: white;
      border-radius: 8px;
      padding: 32px;
      color: var(--color-text);
    }
    
    .consultation-form h3 {
      font-size: 24px;
      margin-bottom: 24px;
      color: var(--color-primary-dark);
      text-align: center;
    }
    
    .form-control {
      margin-bottom: 16px;
    }
    
    .form-label {
      display: block;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--color-text);
    }
    
    .form-input,
    .form-textarea,
    .form-select {
      width: 100%;
      padding: 12px;
      border: 1px solid var(--color-gray-300);
      border-radius: 4px;
      font-family: inherit;
      font-size: 16px;
    }
    
    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }
    
    .form-submit {
      width: 100%;
      background-color: var(--color-primary);
      color: white;
      padding: 12px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .form-submit:hover {
      background-color: var(--color-primary-dark);
    }
    
    /* Footer */
    .footer {
      background-color: var(--color-primary-dark);
      color: white;
      padding: 64px 0 32px;
    }
    
    .footer-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 48px;
      margin-bottom: 48px;
    }
    
    .footer-column h3 {
      font-size: 18px;
      margin-bottom: 24px;
      color: white;
    }
    
    .footer-links {
      list-style: none;
    }
    
    .footer-links li {
      margin-bottom: 12px;
    }
    
    .footer-links a {
      color: rgba(255, 255, 255, 0.8);
      transition: color 0.3s ease;
    }
    
    .footer-links a:hover {
      color: white;
      text-decoration: none;
    }
    
    .footer-social {
      display: flex;
      gap: 16px;
    }
    
    .footer-social a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      transition: background-color 0.3s ease;
    }
    
    .footer-social a:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 32px;
      text-align: center;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
    }
    
    /* Responsive */
    @media (max-width: 992px) {
      .hero-container {
        flex-direction: column;
        gap: 32px;
      }
      
      .consultation-container {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
      
      .hero h1 {
        font-size: 36px;
      }
      
      .hero p {
        font-size: 18px;
      }
      
      .section {
        padding: 60px 0;
      }
      
      .section-title {
        font-size: 28px;
      }
      
      .section-description {
        font-size: 16px;
      }
      
      .articles-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="header-container">
      <div class="logo">Desenrola Direito</div>
      <nav class="nav-links">
        <a href="/" class="active">Início</a>
        <a href="/categorias">Categorias</a>
        <a href="/artigos">Artigos</a>
        <a href="/calculadoras">Calculadoras</a>
        <a href="/consultoria">Consultoria</a>
        <a href="/contato">Contato</a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container hero-container">
      <div class="hero-content">
        <h1>Simplificando o Conhecimento Jurídico</h1>
        <p>Entenda seus direitos e obrigações legais de forma simples e acessível. Conte com nosso auxílio para resolver questões jurídicas do dia a dia.</p>
        <div>
          <a href="/consultoria" class="btn btn-primary">Consultoria Jurídica</a>
          <a href="/artigos" class="btn btn-outline">Explorar Conteúdo</a>
        </div>
      </div>
      <div class="hero-image">
        <!-- Imagem aqui -->
      </div>
    </div>
  </section>

  <!-- Categories Section -->
  <section class="section categories">
    <div class="container">
      <h2 class="section-title">Áreas do Direito</h2>
      <p class="section-description">Navegue por nossas categorias e encontre informações relevantes para sua situação específica.</p>
      
      <div class="categories-grid">
        <!-- Category 1 -->
        <div class="category-card">
          <div class="category-icon">📝</div>
          <h3>Direito do Consumidor</h3>
          <p>Tudo sobre seus direitos como consumidor de produtos e serviços.</p>
          <a href="/categorias/direito-do-consumidor">Explorar <span>→</span></a>
        </div>
        
        <!-- Category 2 -->
        <div class="category-card">
          <div class="category-icon">💼</div>
          <h3>Direito Trabalhista</h3>
          <p>Informações sobre seus direitos e deveres nas relações de trabalho.</p>
          <a href="/categorias/direito-trabalhista">Explorar <span>→</span></a>
        </div>
        
        <!-- Category 3 -->
        <div class="category-card">
          <div class="category-icon">🏠</div>
          <h3>Direito Imobiliário</h3>
          <p>Orientações sobre compra, venda e aluguel de imóveis.</p>
          <a href="/categorias/direito-imobiliario">Explorar <span>→</span></a>
        </div>
        
        <!-- Category 4 -->
        <div class="category-card">
          <div class="category-icon">👨‍👩‍👧‍👦</div>
          <h3>Direito Familiar</h3>
          <p>Orientações sobre casamento, divórcio, guarda de filhos e pensão alimentícia.</p>
          <a href="/categorias/direito-familiar">Explorar <span>→</span></a>
        </div>
        
        <!-- Category 5 -->
        <div class="category-card">
          <div class="category-icon">🏥</div>
          <h3>Direito Previdenciário</h3>
          <p>Informações sobre aposentadoria, pensões e benefícios do INSS.</p>
          <a href="/categorias/direito-previdenciario">Explorar <span>→</span></a>
        </div>
        
        <!-- Category 6 -->
        <div class="category-card">
          <div class="category-icon">⚖️</div>
          <h3>Direito Penal</h3>
          <p>Orientações sobre crimes, processos criminais e direitos do acusado.</p>
          <a href="/categorias/direito-penal">Explorar <span>→</span></a>
        </div>
      </div>
    </div>
  </section>

  <!-- Recent Articles Section -->
  <section class="section articles">
    <div class="container">
      <h2 class="section-title">Artigos Recentes</h2>
      <p class="section-description">Fique atualizado com as informações jurídicas mais recentes e relevantes.</p>
      
      <div class="articles-grid">
        <!-- Article 1 -->
        <div class="article-card">
          <div class="article-image" style="background-image: url('https://source.unsplash.com/random/800x600/?consumer')"></div>
          <div class="article-content">
            <span class="article-category">Direito do Consumidor</span>
            <h3 class="article-title">Direitos do Consumidor no E-commerce</h3>
            <p class="article-excerpt">Saiba quais são seus direitos ao comprar produtos pela internet e como se proteger de fraudes e problemas comuns.</p>
            <div class="article-meta">15 de Abril, 2025</div>
          </div>
        </div>
        
        <!-- Article 2 -->
        <div class="article-card">
          <div class="article-image" style="background-image: url('https://source.unsplash.com/random/800x600/?work')"></div>
          <div class="article-content">
            <span class="article-category">Direito Trabalhista</span>
            <h3 class="article-title">Direitos na Demissão sem Justa Causa</h3>
            <p class="article-excerpt">Entenda quais são seus direitos quando demitido sem justa causa e como calcular suas verbas rescisórias.</p>
            <div class="article-meta">22 de Janeiro, 2025</div>
          </div>
        </div>
        
        <!-- Article 3 -->
        <div class="article-card">
          <div class="article-image" style="background-image: url('https://source.unsplash.com/random/800x600/?house')"></div>
          <div class="article-content">
            <span class="article-category">Direito Imobiliário</span>
            <h3 class="article-title">O que Verificar Antes de Comprar um Imóvel</h3>
            <p class="article-excerpt">Lista de verificação essencial antes de fechar negócio imobiliário para evitar problemas futuros.</p>
            <div class="article-meta">15 de Março, 2025</div>
          </div>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 40px;">
        <a href="/artigos" class="btn btn-primary">Ver Todos os Artigos</a>
      </div>
    </div>
  </section>

  <!-- Quick Access Section -->
  <section class="section quick-access">
    <div class="container">
      <h2 class="section-title">Acesso Rápido</h2>
      <p class="section-description">Ferramentas úteis para auxiliar você em situações jurídicas comuns.</p>
      
      <div class="quick-access-grid">
        <!-- Quick Access 1 -->
        <div class="quick-access-card">
          <div class="quick-access-icon">🧮</div>
          <h3>Calculadoras</h3>
          <p>Calcule valores de rescisão trabalhista, pensão alimentícia e muito mais.</p>
          <a href="/calculadoras" class="btn btn-primary">Acessar</a>
        </div>
        
        <!-- Quick Access 2 -->
        <div class="quick-access-card">
          <div class="quick-access-icon">📋</div>
          <h3>Modelos de Documentos</h3>
          <p>Acesse modelos de petições, contratos e outros documentos jurídicos.</p>
          <a href="/modelos" class="btn btn-primary">Acessar</a>
        </div>
        
        <!-- Quick Access 3 -->
        <div class="quick-access-card">
          <div class="quick-access-icon">❓</div>
          <h3>Perguntas Frequentes</h3>
          <p>Encontre respostas para as dúvidas jurídicas mais comuns.</p>
          <a href="/faq" class="btn btn-primary">Acessar</a>
        </div>
        
        <!-- Quick Access 4 -->
        <div class="quick-access-card">
          <div class="quick-access-icon">📱</div>
          <h3>Consulta Processual</h3>
          <p>Consulte informações sobre processos judiciais em andamento.</p>
          <a href="/consulta" class="btn btn-primary">Acessar</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Consultation Section -->
  <section class="section consultation">
    <div class="container consultation-container">
      <div>
        <h2 class="section-title">Consultoria Jurídica Personalizada</h2>
        <p class="consultation-description">Não encontrou o que precisava? Nossos especialistas estão prontos para te ajudar com orientações específicas para o seu caso.</p>
        
        <div class="consultation-features">
          <div class="consultation-feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Atendimento com profissionais especializados</span>
          </div>
          <div class="consultation-feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Orientação clara e em linguagem acessível</span>
          </div>
          <div class="consultation-feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Sigilo e confidencialidade garantidos</span>
          </div>
          <div class="consultation-feature">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Primeiro contato gratuito</span>
          </div>
        </div>
      </div>
      
      <div class="consultation-form">
        <h3>Solicite uma Consulta</h3>
        <form id="consultation-form">
          <div class="form-control">
            <label class="form-label" for="name">Nome Completo</label>
            <input type="text" id="name" class="form-input" required>
          </div>
          
          <div class="form-control">
            <label class="form-label" for="email">E-mail</label>
            <input type="email" id="email" class="form-input" required>
          </div>
          
          <div class="form-control">
            <label class="form-label" for="phone">Telefone</label>
            <input type="tel" id="phone" class="form-input" required>
          </div>
          
          <div class="form-control">
            <label class="form-label" for="issue">Área Jurídica</label>
            <select id="issue" class="form-select" required>
              <option value="" disabled selected>Selecione a área</option>
              <option value="consumidor">Direito do Consumidor</option>
              <option value="trabalhista">Direito Trabalhista</option>
              <option value="imobiliario">Direito Imobiliário</option>
              <option value="familiar">Direito Familiar</option>
              <option value="previdenciario">Direito Previdenciário</option>
              <option value="penal">Direito Penal</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          
          <div class="form-control">
            <label class="form-label" for="details">Descreva seu problema</label>
            <textarea id="details" class="form-textarea" required></textarea>
          </div>
          
          <button type="submit" class="form-submit">Solicitar Consulta</button>
        </form>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-container">
        <div class="footer-column">
          <h3>Desenrola Direito</h3>
          <p style="margin-bottom: 20px; color: rgba(255, 255, 255, 0.8);">Simplificando o conhecimento jurídico para todos.</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
        
        <div class="footer-column">
          <h3>Categorias</h3>
          <ul class="footer-links">
            <li><a href="/categorias/direito-do-consumidor">Direito do Consumidor</a></li>
            <li><a href="/categorias/direito-trabalhista">Direito Trabalhista</a></li>
            <li><a href="/categorias/direito-imobiliario">Direito Imobiliário</a></li>
            <li><a href="/categorias/direito-familiar">Direito Familiar</a></li>
            <li><a href="/categorias/direito-previdenciario">Direito Previdenciário</a></li>
            <li><a href="/categorias/direito-penal">Direito Penal</a></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>Links Úteis</h3>
          <ul class="footer-links">
            <li><a href="/sobre">Sobre Nós</a></li>
            <li><a href="/equipe">Nossa Equipe</a></li>
            <li><a href="/calculadoras">Calculadoras</a></li>
            <li><a href="/modelos">Modelos de Documentos</a></li>
            <li><a href="/consultoria">Consultoria Jurídica</a></li>
            <li><a href="/contato">Contato</a></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>Contato</h3>
          <ul class="footer-links">
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              (11) 3030-3030
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              contato@desenroladireito.com.br
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              São Paulo - SP
            </li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 Desenrola Direito. Todos os direitos reservados.</p>
        <p style="margin-top: 8px;">
          <a href="/termos">Termos de Uso</a> | 
          <a href="/privacidade">Política de Privacidade</a>
        </p>
      </div>
    </div>
  </footer>

  <!-- Script -->
  <script>
    // Form handling for legal consultation
    document.getElementById('consultation-form')?.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        issue: document.getElementById('issue').value,
        details: document.getElementById('details').value
      };
      
      // Simulating form submission
      console.log('Form submitted:', formData);
      
      // Show success message or redirect
      alert('Sua solicitação foi enviada com sucesso! Entraremos em contato em breve.');
      
      // Reset form
      this.reset();
    });
  </script>
</body>
</html>
  `);
});

// Iniciar o servidor na porta 5000
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor Express rodando na porta ${PORT}`);
  console.log(`🌐 Site disponível em: http://localhost:${PORT}`);
});