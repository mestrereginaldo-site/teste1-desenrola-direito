#!/usr/bin/env node
/**
 * Script de inicialização especial para o Desenrola Direito no Replit
 * 
 * Este script ignora o Vite e inicia um servidor HTTP simples
 * exclusivamente para servir a versão estática do site.
 */

import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawn } from 'node:child_process';

// Configuração
const PORT = 5000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML_PATH = join(__dirname, 'simples.html');

// Ler o HTML estático
let html;
try {
  html = await readFile(HTML_PATH, 'utf8');
  console.log('✅ Arquivo HTML carregado com sucesso');
} catch (err) {
  console.error('❌ Erro ao ler o arquivo HTML:', err);
  process.exit(1);
}

// Atualizar o arquivo .replit.port
try {
  await writeFile('.replit.port', PORT.toString());
  console.log(`✅ Porta ${PORT} configurada para o Replit`);
} catch (err) {
  console.warn('⚠️ Aviso: Não foi possível atualizar .replit.port:', err);
}

// Criar e iniciar o servidor
const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(`📝 Requisição: ${req.method} ${url.pathname}`);
  
  // Rota principal e variações
  if (url.pathname === '/' || url.pathname === '/basico' || url.pathname === '/index.html') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(html);
    return;
  }
  
  // Arquivo específico na pasta public (para CSS, JS, imagens, etc.)
  if (url.pathname.startsWith('/public/')) {
    const filePath = join(__dirname, url.pathname);
    const stream = createReadStream(filePath);
    
    stream.on('error', (err) => {
      console.error(`❌ Erro ao ler arquivo: ${url.pathname}`, err);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Arquivo não encontrado');
    });
    
    // Determinar o tipo de conteúdo baseado na extensão
    const ext = url.pathname.split('.').pop()?.toLowerCase();
    let contentType = 'text/plain';
    
    switch (ext) {
      case 'html': contentType = 'text/html'; break;
      case 'css': contentType = 'text/css'; break;
      case 'js': contentType = 'text/javascript'; break;
      case 'json': contentType = 'application/json'; break;
      case 'png': contentType = 'image/png'; break;
      case 'jpg': case 'jpeg': contentType = 'image/jpeg'; break;
      case 'gif': contentType = 'image/gif'; break;
      case 'svg': contentType = 'image/svg+xml'; break;
    }
    
    res.writeHead(200, { 'Content-Type': contentType });
    stream.pipe(res);
    return;
  }
  
  // Rota API - heath check
  if (url.pathname === '/api/health') {
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

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Servidor estático rodando na porta ${PORT}`);
  console.log(`📄 Acesse: http://0.0.0.0:${PORT}`);
  console.log('📋 Rotas disponíveis:');
  console.log('   - / (Página principal)');
  console.log('   - /basico (Mesmo conteúdo da raiz)');
  console.log('   - /api/health (Verificação de status)\n');
});