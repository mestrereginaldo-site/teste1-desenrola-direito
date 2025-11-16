/**
 * Servidor HTML simples para emergência
 * Este servidor apenas serve o HTML principal do site
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Conseguir o diretório atual (não funciona com __dirname em ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Porta para o servidor
const PORT = 3000;

// Caminho para o arquivo HTML
const htmlPath = path.join(__dirname, 'client', 'index.html');

// Criar o servidor
const server = http.createServer((req, res) => {
  console.log(`Requisição recebida: ${req.url}`);
  
  // Cabeçalhos para compatibilidade com o Replit
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Ler o arquivo HTML
  fs.readFile(htmlPath, 'utf8', (err, content) => {
    if (err) {
      console.error('Erro ao ler o arquivo HTML:', err);
      res.writeHead(500);
      res.end('Erro interno no servidor');
      return;
    }
    
    // Modificar o HTML para não depender do Vite em desenvolvimento
    const modifiedContent = content.replace(
      '<script type="module" src="/src/main.tsx"></script>',
      `<style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f5f9ff;
          color: #333;
          line-height: 1.6;
        }
        
        #root {
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        h1 {
          color: #0056b3;
          margin-top: 0;
        }
        
        .maintenance {
          text-align: center;
          padding: 40px 20px;
        }
        
        .maintenance h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #0056b3;
        }
        
        .maintenance p {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }
        
        .maintenance-image {
          width: 250px;
          max-width: 100%;
          height: auto;
          margin: 2rem 0;
        }
      </style>
      <div id="root">
        <div class="maintenance">
          <h1>Desenrola Direito</h1>
          <p>Estamos realizando melhorias no site para lhe oferecer uma experiência ainda melhor.</p>
          <p>Por favor, aguarde alguns instantes enquanto finalizamos os ajustes.</p>
          <svg class="maintenance-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0056b3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
          <p>Agradecemos sua paciência!</p>
        </div>
      </div>`
    );
    
    res.writeHead(200);
    res.end(modifiedContent);
  });
});

// Iniciar o servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`⚠️ Servidor de emergência rodando na porta ${PORT}`);
  console.log(`⚠️ Acesse: http://0.0.0.0:${PORT}`);
});