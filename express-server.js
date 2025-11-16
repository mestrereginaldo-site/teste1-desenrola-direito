/**
 * Servidor Express simplificado para o Desenrola Direito
 * Configurado para iniciar na porta 5000, usada pelo Replit 
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { registerRoutes } from './server/routes.js';
import { checkEmailConfig } from './server/email.js';
import { spawn, exec } from 'child_process';

// Configuração do ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Garantir que o arquivo .replit.port existe
fs.writeFileSync('.replit.port', '5000');

// Verificar configuração de e-mail
const emailConfigured = checkEmailConfig();
if (emailConfigured) {
  console.log("Configuração de e-mail validada com sucesso!");
} else {
  console.warn("Configuração de e-mail incompleta. O envio de e-mails pode não funcionar corretamente.");
}

// Criar o aplicativo Express
const app = express();

// Configurar middleware básico
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// Iniciar o servidor de desenvolvimento do Vite em segundo plano (em modo de desenvolvimento)
if (process.env.NODE_ENV !== 'production') {
  console.log('Iniciando servidor de desenvolvimento Vite...');
  
  // Tentar utilizar o servidor Vite na porta 3000
  const viteProcess = spawn('npx', ['vite', '--port', '3000', '--host', '0.0.0.0'], {
    cwd: path.join(__dirname),
    stdio: 'inherit',
    shell: true
  });
  
  viteProcess.on('error', (error) => {
    console.error(`Erro ao iniciar o servidor Vite: ${error.message}`);
  });
  
  // Esperamos um pequeno delay para o servidor Vite iniciar
  setTimeout(() => {
    console.log('Servidor Vite iniciado em segundo plano na porta 3000.');
    console.log('Frontend disponível em: http://localhost:3000');
  }, 3000);
}

// Rota raiz que mostra a página de informações em desenvolvimento
app.get('/', (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    // Em produção, redireciona para o frontend compilado
    res.redirect('/app');
  } else {
    // Em desenvolvimento, mostra informações sobre a API e links para o frontend
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Desenrola Direito - API</title>
          <meta charset="UTF-8">
          <style>
            body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #1e40af; }
            .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
            .api-link { display: block; margin: 10px 0; color: #2563eb; text-decoration: none; }
            .api-link:hover { text-decoration: underline; }
            .frontend-link { 
              display: inline-block; 
              margin: 20px 0; 
              padding: 12px 24px; 
              background-color: #1e40af; 
              color: white; 
              text-decoration: none; 
              border-radius: 6px;
              font-weight: bold;
            }
            .frontend-link:hover {
              background-color: #1e3a8a;
            }
          </style>
        </head>
        <body>
          <h1>Desenrola Direito</h1>
          <div class="card">
            <h2>API Status</h2>
            <p>O servidor backend está rodando na porta 5000</p>
            <p>API status: <span style="color: green; font-weight: bold;">✓ Online</span></p>
            
            <h3>API Endpoints Disponíveis:</h3>
            <a href="/api/health" class="api-link">/api/health</a>
            <a href="/api/categories" class="api-link">/api/categories</a>
            <a href="/api/articles" class="api-link">/api/articles</a>
            <a href="/api/articles/recent" class="api-link">/api/articles/recent</a>
            <a href="/api/articles/featured" class="api-link">/api/articles/featured</a>
            <a href="/api/solutions" class="api-link">/api/solutions</a>
            
            <hr style="margin: 24px 0;">
            
            <h2>Frontend Desenvolvimento</h2>
            <p>O frontend está disponível em:</p>
            <a href="https://desenroladireito.com.br/app" class="frontend-link">Acessar Frontend</a>
            <p><small>Nota: O frontend está em execução separada na porta 3000, mas pode ser acessado via proxy na URL acima.</small></p>
          </div>
        </body>
      </html>
    `);
  }
});

// Rota para redirecionar para o frontend em desenvolvimento
app.get('/app', (req, res) => {
  res.redirect('https://desenroladireito.com.br:3000');
});

// Rota para a página de saúde da API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API está funcionando!' });
});

// Registrar todas as rotas da API
registerRoutes(app).then(httpServer => {
  // Iniciar o servidor na porta 5000 (fixo para evitar problemas no Replit)
  const PORT = 5000;

  // Usar o httpServer criado pela função registerRoutes
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor Express rodando na porta ${PORT}`);
    console.log('API disponível em: http://localhost:5000/api');
    console.log('Frontend (dev) disponível em: http://localhost:3000');
    console.log('Página de status: http://localhost:5000');
  });
});