/**
 * Servidor HTTP simplificado para o Desenrola Direito
 * CommonJS versão para compatibilidade
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Porta fixa para o Replit
const PORT = 5000;

// Caminho para o HTML
const htmlPath = path.join(__dirname, 'simples.html');

// Criar servidor HTTP
const server = http.createServer((req, res) => {
  console.log(`Requisição: ${req.method} ${req.url}`);
  
  // Tratamento de rotas básicas
  if (req.url === '/' || req.url === '/basico' || req.url === '/index.html') {
    try {
      const html = fs.readFileSync(htmlPath, 'utf8');
      
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      });
      
      res.end(html);
    } catch (error) {
      console.error('Erro ao ler o arquivo HTML:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Erro interno ao carregar a página');
    }
    return;
  }
  
  // API de verificação de saúde
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      message: 'Servidor estático funcionando',
      time: new Date().toISOString()
    }));
    return;
  }
  
  // Qualquer outra rota - 404
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Página não encontrada');
});

// Garantir que o arquivo .replit.port está atualizado
try {
  fs.writeFileSync('.replit.port', PORT.toString());
  console.log(`✅ Porta ${PORT} configurada para o Replit`);
} catch (err) {
  console.warn('⚠️ Aviso: Não foi possível atualizar .replit.port:', err);
}

// Iniciar o servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Servidor estático rodando na porta ${PORT}`);
  console.log(`📄 Acesse: http://0.0.0.0:${PORT}`);
  console.log('📋 Rotas disponíveis:');
  console.log('   - / (Página principal)');
  console.log('   - /basico (Mesmo conteúdo da raiz)');
  console.log('   - /api/health (Verificação de status)\n');
});