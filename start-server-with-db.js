/**
 * Script para iniciar o servidor Desenrola Direito com banco de dados PostgreSQL
 * 
 * Este script:
 * 1. Inicializa o banco de dados (se necessário)
 * 2. Inicia o servidor com integração ao PostgreSQL
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Verificar se DATABASE_URL está configurado
if (!process.env.DATABASE_URL) {
  console.error('\n❌ A variável de ambiente DATABASE_URL não está configurada.');
  console.error('   Por favor, configure-a com a string de conexão do PostgreSQL.');
  process.exit(1);
}

console.log('\n🔍 Verificando banco de dados...');

// Inicializar o banco de dados
try {
  console.log('\n📊 Inicializando banco de dados...');
  execSync('node init-database.js', { stdio: 'inherit' });
  console.log('✅ Banco de dados inicializado com sucesso!');
} catch (error) {
  console.error('⚠️ Aviso: Erro ao inicializar o banco de dados.');
  console.error('   O servidor será iniciado, mas pode não funcionar corretamente.');
  console.error(`   Erro: ${error.message}`);
}

// Iniciar o servidor
console.log('\n🚀 Iniciando servidor...');
try {
  execSync('node server-with-db.js', { stdio: 'inherit' });
} catch (error) {
  console.error(`\n❌ Erro ao iniciar o servidor: ${error.message}`);
  process.exit(1);
}