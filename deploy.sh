#!/bin/bash

# Script de deploy para o Desenrola Direito
echo "Iniciando processo de build e deploy..."

# Verificando se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js."
    exit 1
fi

# Limpando cache
echo "🧹 Limpando cache..."
rm -rf client/dist
rm -rf node_modules/.cache

# Instalando dependências
echo "📦 Instalando dependências..."
npm install

# Fazendo o build do frontend
echo "🔨 Fazendo build do frontend..."
npm run build

# Preparando para deploy
echo "🚀 Preparando para deploy..."
mkdir -p .deploy
cp -r client/dist .deploy/
cp server-deploy.js .deploy/
cp package.json .deploy/
cp netlify.toml .deploy/
cp vercel.json .deploy/
cp _redirects .deploy/

echo "✅ Processo finalizado com sucesso!"
echo "Os arquivos para deploy estão na pasta .deploy/"
echo "Você pode fazer o deploy usando:"
echo "1. Replit Deploy (no botão 'Run' do Replit)"
echo "2. Netlify (usando o netlify.toml)"
echo "3. Vercel (usando o vercel.json)"