/**
 * Script de inicialização otimizado para o Replit
 * 
 * Este script:
 * 1. Verifica se já existe um processo na porta 5000
 * 2. Se não, abre um servidor HTTP básico na porta 5000 para o Replit detectar
 * 3. Inicia o servidor principal em segundo plano
 */

import http from 'http';
import fs from 'fs';
import { exec } from 'child_process';

// Verificar se a porta já está em uso
async function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.once('error', () => {
      resolve(false);
    });
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
}

// Criar uma página de carregamento HTML
function createLoadingHtml() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Desenrola Direito - Iniciando...</title>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: system-ui, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
          }
          h1 { color: #1e40af; }
          .loading {
            display: inline-block;
            width: 50px;
            height: 50px;
            border: 3px solid #f3f3f3;
            border-radius: 50%;
            border-top: 3px solid #3498db;
            animation: spin 1s linear infinite;
            margin: 20px 0;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .message {
            background-color: #f1f5f9;
            padding: 16px;
            border-radius: 8px;
            margin-top: 20px;
          }
        </style>
        <script>
          // Recarregar a página automaticamente após um curto período
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        </script>
      </head>
      <body>
        <h1>Desenrola Direito</h1>
        <div class="loading"></div>
        <h2>Iniciando servidor...</h2>
        <div class="message">
          <p>Esta página será atualizada automaticamente quando o servidor estiver pronto.</p>
          <p>Se a página não carregar em 30 segundos, atualize manualmente.</p>
        </div>
      </body>
    </html>
  `;
}

async function main() {
  // Garantir que o arquivo .replit.port existe
  fs.writeFileSync('.replit.port', '5000');
  
  // Verificar se a porta 5000 está disponível
  const portAvailable = await isPortAvailable(5000);
  
  if (portAvailable) {
    // Se a porta estiver disponível, criar um servidor temporário
    console.log('Iniciando servidor HTTP temporário na porta 5000...');
    const tempServer = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(createLoadingHtml());
    });
    
    tempServer.listen(5000, '0.0.0.0', () => {
      console.log('Servidor temporário iniciado. Carregando aplicação principal...');
      
      // Iniciar o servidor principal em segundo plano
      console.log('Iniciando servidor principal...');
      exec('tsx server-wrapper.ts', (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro ao executar o servidor: ${error}`);
          return;
        }
        if (stdout) {
          console.log(stdout);
        }
        if (stderr) {
          console.error(stderr);
        }
      });
    });
  } else {
    // Se a porta já estiver em uso, apenas iniciar o servidor principal
    console.log('Porta 5000 já está em uso. Iniciando diretamente o servidor principal...');
    exec('tsx server-wrapper.ts', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar o servidor: ${error}`);
        return;
      }
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.error(stderr);
      }
    });
  }
}

main().catch(console.error);