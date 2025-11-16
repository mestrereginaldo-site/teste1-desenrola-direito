/**
 * Script para preparar o projeto Desenrola Direito para hospedagem na Hostinger
 * 
 * Este script:
 * 1. Cria uma versão de produção (build) do frontend
 * 2. Configura o servidor para ambiente de produção
 * 3. Prepara o arquivo de configuração do banco de dados
 * 4. Garante que todos os scripts necessários estejam configurados no package.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Iniciando preparação do Desenrola Direito para hospedagem na Hostinger...');

// 1. Verificar e atualizar package.json
console.log('\n1. Configurando package.json para produção...');

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

// Adicionar scripts necessários para produção
packageJson.scripts = {
  ...packageJson.scripts,
  "build": "vite build",
  "start": "node production-server.js",
  "initdb": "node init-database.js",
  "add-article": "node add-article.js"
};

// Garantir que as dependências necessárias estejam no lugar certo
const dependencies = packageJson.dependencies || {};
const devDependencies = packageJson.devDependencies || {};

// Movendo dependências de desenvolvimento essenciais para produção
const requiredDependencies = [
  '@types/express', 
  '@types/node', 
  'typescript', 
  'vite',
  '@vitejs/plugin-react'
];

for (const dep of requiredDependencies) {
  if (devDependencies[dep] && !dependencies[dep]) {
    dependencies[dep] = devDependencies[dep];
    delete devDependencies[dep];
  }
}

packageJson.dependencies = dependencies;
packageJson.devDependencies = devDependencies;

// Salvar package.json atualizado
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ package.json atualizado com scripts e dependências para produção');

// 2. Criar arquivo de servidor para produção
console.log('\n2. Criando servidor para ambiente de produção...');

const productionServerContent = `/**
 * Servidor de produção para o Desenrola Direito
 * Configurado para hospedagem na Hostinger
 */
const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { pool } = require('./server/db');

// Importar rotas da API
const apiRoutes = require('./server/routes');

const app = express();
const httpServer = createServer(app);

// Definir porta (Hostinger normalmente usa a porta 3000)
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON e URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta dist (gerada pelo Vite)
app.use(express.static(path.join(__dirname, 'dist')));

// Configurar rotas da API
app.use('/api', apiRoutes);

// Rota catch-all para SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro no servidor!');
});

// Iniciar servidor
httpServer.listen(PORT, () => {
  console.log(\`Servidor Desenrola Direito rodando na porta \${PORT}\`);
  console.log(\`Acesse: http://localhost:\${PORT}\`);
});

// Tratamento para encerramento gracioso
process.on('SIGTERM', () => {
  console.log('SIGTERM recebido, fechando o servidor...');
  httpServer.close(() => {
    console.log('Servidor fechado');
    pool.end();
    process.exit(0);
  });
});
`;

fs.writeFileSync('production-server.js', productionServerContent);
console.log('✅ Arquivo production-server.js criado');

// 3. Criar arquivo de configuração do ambiente
console.log('\n3. Criando arquivo de configuração do ambiente...');

const envExampleContent = `# Configurações do Banco de Dados
DATABASE_URL=postgres://usuario:senha@localhost:5432/desenrola_direito

# Configurações do Servidor
PORT=3000

# Configurações de Email
EMAIL_HOST=smtp.hostinger.com.br
EMAIL_PORT=587
EMAIL_USER=seu-email@seudominio.com.br
EMAIL_PASSWORD=sua-senha-de-email
`;

fs.writeFileSync('.env.example', envExampleContent);
console.log('✅ Arquivo .env.example criado como modelo para configuração na Hostinger');

// 4. Criar instruções para implantação
console.log('\n4. Criando arquivo de instruções para implantação na Hostinger...');

const deployInstructionsContent = `# Instruções para Deploy do Desenrola Direito na Hostinger

## Pré-requisitos
- Plano de hospedagem com Node.js (Plano Premium ou superior na Hostinger)
- Banco de dados PostgreSQL configurado
- Acesso SSH à hospedagem

## Etapas para Implantação

### 1. Preparar o projeto para upload
\`\`\`bash
# Construir o frontend
npm run build

# Verificar se a pasta dist foi criada
\`\`\`

### 2. Fazer upload dos arquivos
Fazer upload de todos os arquivos exceto:
- node_modules/ (será instalado no servidor)
- .git/
- arquivos temporários e de desenvolvimento

### 3. Configurar o ambiente
\`\`\`bash
# Conectar via SSH à hospedagem
ssh seu-usuario@seu-servidor

# Navegar até a pasta do projeto
cd caminho/para/seu/projeto

# Criar arquivo .env com base no .env.example
cp .env.example .env
nano .env  # Editar com as informações corretas
\`\`\`

### 4. Instalar dependências
\`\`\`bash
npm install --production
\`\`\`

### 5. Inicializar o banco de dados (apenas na primeira vez)
\`\`\`bash
npm run initdb
\`\`\`

### 6. Configurar o Node.js Application na Hostinger
No painel da Hostinger:
1. Acesse "Node.js Application"
2. Clique em "Criar Aplicação"
3. Configure:
   - Nome da aplicação: DesenrolaDireito
   - Diretório raiz: caminho/para/seu/projeto
   - Arquivo de inicialização: production-server.js
   - Versão do Node.js: 18.x (ou superior)
   - Salvar e ativar

### 7. Configurar domínio (opcional)
Se tiver um domínio personalizado:
1. No painel da Hostinger, acesse "Domínios"
2. Aponte seu domínio para a aplicação Node.js criada

## Manutenção e Atualização

### Adicionar novos artigos
\`\`\`bash
# Conectar via SSH
ssh seu-usuario@seu-servidor

# Navegar até a pasta do projeto
cd caminho/para/seu/projeto

# Executar script de adicionar artigos
node add-article.js
# ou
npm run add-article
\`\`\`

### Atualizar o site após modificações
1. Fazer as mudanças localmente
2. Construir novamente: \`npm run build\`
3. Fazer upload dos arquivos modificados
4. Reiniciar a aplicação no painel da Hostinger

## Solução de Problemas

### Logs de erro
Na Hostinger, acesse:
- Node.js Application > Sua Aplicação > Logs

### Banco de dados não conecta
Verifique:
- Credenciais no arquivo .env
- Firewall permitindo conexões ao banco de dados
- Se o PostgreSQL está ativo e aceitando conexões
`;

fs.writeFileSync('HOSTINGER-DEPLOY.md', deployInstructionsContent);
console.log('✅ Arquivo HOSTINGER-DEPLOY.md criado com instruções detalhadas');

// 5. Verificar configuração do banco de dados
console.log('\n5. Verificando configuração do banco de dados...');

try {
  const dbFilePath = path.join(__dirname, 'server', 'db.js');
  let dbFileContent = fs.readFileSync(dbFilePath, 'utf8');
  
  // Verificar se já tem tratamento para variáveis de ambiente
  if (!dbFileContent.includes('process.env.DATABASE_URL')) {
    dbFileContent = dbFileContent.replace(
      /neonConfig.webSocketConstructor = ws;/,
      `neonConfig.webSocketConstructor = ws;

// Suporte a variáveis de ambiente para configuração flexível na hospedagem
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/desenroladireito';`
    );
    
    dbFileContent = dbFileContent.replace(
      /export const pool = new Pool\({ connectionString: process\.env\.DATABASE_URL }\);/,
      `export const pool = new Pool({ connectionString: DATABASE_URL });`
    );
    
    fs.writeFileSync(dbFilePath, dbFileContent);
    console.log('✅ Arquivo db.js atualizado para suportar configuração flexível');
  } else {
    console.log('✅ Arquivo db.js já está configurado corretamente');
  }
} catch (error) {
  console.error('❌ Erro ao verificar/atualizar configuração do banco de dados:', error.message);
}

// 6. Criar .htaccess para redirecionamento (Hostinger usa Apache)
console.log('\n6. Criando arquivo .htaccess para redirecionamento...');

const htaccessContent = `# Redirecionar tudo para o Node.js
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
</IfModule>

# Permitir acesso a arquivos estáticos
<FilesMatch "\\.(css|js|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot)$">
  Allow from all
</FilesMatch>
`;

fs.writeFileSync('.htaccess', htaccessContent);
console.log('✅ Arquivo .htaccess criado para configuração do Apache');

// 7. Criar script de backup do banco de dados
console.log('\n7. Criando script de backup do banco de dados...');

const backupScriptContent = `#!/bin/bash
# Script para fazer backup do banco de dados PostgreSQL do Desenrola Direito
# Salva na pasta backups com data e hora

# Carregar variáveis de ambiente
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Configurações
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/desenrola_direito_$TIMESTAMP.sql"

# Criar diretório de backup se não existir
mkdir -p $BACKUP_DIR

# Extrair informações de conexão da DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
  echo "Erro: DATABASE_URL não definida"
  exit 1
fi

# Fazer backup
echo "Iniciando backup do banco de dados..."
pg_dump $DATABASE_URL > $BACKUP_FILE

# Verificar se o backup foi bem-sucedido
if [ $? -eq 0 ]; then
  echo "Backup concluído com sucesso: $BACKUP_FILE"
  
  # Compactar o arquivo para economizar espaço
  gzip $BACKUP_FILE
  echo "Arquivo compactado: $BACKUP_FILE.gz"
else
  echo "Erro ao criar backup"
  exit 1
fi

# Limpar backups antigos (manter apenas os 5 mais recentes)
ls -t $BACKUP_DIR/*.gz | tail -n +6 | xargs -r rm
echo "Backups antigos removidos. Mantidos apenas os 5 mais recentes."
`;

fs.writeFileSync('backup-database.sh', backupScriptContent);
console.log('✅ Script backup-database.sh criado para backups do banco de dados');
fs.chmodSync('backup-database.sh', '755'); // Tornar executável

// 8. Criar arquivo .gitignore atualizado
console.log('\n8. Atualizando arquivo .gitignore...');

const gitignoreContent = `# Dependências
node_modules/
.npm
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Arquivos de construção
dist/
build/
out/
.next/

# Ambiente
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Sistema operacional
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Backups
backups/
*.backup
*.bak
*.sql.gz

# Vite
.vite/

# Arquivos temporários
temp/
tmp/
*.tmp

# IDE e editores
.idea/
.vscode/
*.swp
*.swo
`;

fs.writeFileSync('.gitignore', gitignoreContent);
console.log('✅ Arquivo .gitignore atualizado');

// 9. Criar pasta backups
if (!fs.existsSync('backups')) {
  fs.mkdirSync('backups');
  console.log('✅ Pasta backups criada');
}

// Instruções finais
console.log('\n✅ Preparação concluída! O projeto está pronto para ser hospedado na Hostinger.');
console.log('\nPróximos passos:');
console.log('1. Execute "npm run build" para criar a versão de produção do frontend');
console.log('2. Siga as instruções detalhadas no arquivo HOSTINGER-DEPLOY.md');