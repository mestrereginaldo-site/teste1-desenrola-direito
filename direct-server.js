/**
 * Servidor Express mais simples que importa diretamente o Vite e o inicia junto com a API
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerRoutes } from './server/routes.js';
import { checkEmailConfig } from './server/email.js';

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

async function createServer() {
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
  
  // Rota de saúde básica (health check)
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'API está funcionando!' });
  });
  
  // Criar servidor Vite para desenvolvimento
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  
  // Usar middleware do Vite
  app.use(vite.middlewares);
  
  // Registrar todas as rotas da API
  const httpServer = await registerRoutes(app);
  
  // Iniciar o servidor na porta 5000 (fixo para evitar problemas no Replit)
  const PORT = 5000;
  
  // Usar o httpServer criado pela função registerRoutes
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    console.log(`  → API: http://localhost:${PORT}/api`);
    console.log(`  → Frontend: http://localhost:${PORT}/`);
  });
}

createServer().catch((err) => {
  console.error('Erro ao iniciar o servidor:', err);
});