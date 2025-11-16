/**
 * Servidor Express simplificado para o Desenrola Direito
 */
const express = require('express');
const path = require('path');
const fs = require('fs');

// Criar o aplicativo Express
const app = express();
app.use(express.json());

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

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Servir imagens da pasta attached_assets
app.use('/assets', express.static(path.join(__dirname, 'attached_assets')));

// Rota principal com HTML estático
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'site-original.html'));
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

// Qualquer outra rota não encontrada volta para o index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'site-original.html'));
});

// Função para tentar escutar em diferentes portas
function tryListening(index = 0) {
  const ports = [5000, 3000, 8080, 8000];
  const port = ports[index] || 3001 + index;
  
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`✅ Servidor Express rodando na porta ${port}`);
    console.log(`🌐 Site disponível em: http://localhost:${port}`);
    
    // Atualizar o arquivo .replit.port para que o Replit detecte a porta
    try {
      fs.writeFileSync('.replit.port', String(port));
      console.log(`✅ Porta ${port} registrada para o Replit`);
    } catch (err) {
      console.error('Erro ao atualizar arquivo .replit.port:', err);
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && index < ports.length + 5) {
      console.log(`⚠️ Porta ${port} em uso, tentando a próxima...`);
      tryListening(index + 1);
    } else {
      console.error('Erro ao iniciar servidor:', err);
    }
  });
}

// Iniciar o servidor tentando diferentes portas
tryListening();