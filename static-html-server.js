/**
 * Servidor estático simples para o Desenrola Direito
 * Este servidor serve o HTML estático da versão original do site
 */
const express = require('express');
const path = require('path');
const fs = require('fs');

// Criar o aplicativo Express
const app = express();
app.use(express.json());

// Garantir que o arquivo .replit.port existe
fs.writeFileSync('.replit.port', '5000');

// Rota principal com HTML original das imagens fornecidas
app.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, 'client', 'site-original.html');
  res.sendFile(htmlPath);
});

// Rotas da API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API está funcionando!' });
});

// Iniciar o servidor na porta 5000 (para Replit)
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor estático HTML rodando na porta ${PORT}`);
  console.log(`🌐 Site original disponível em: http://localhost:${PORT}`);
});