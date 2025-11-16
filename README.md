# Desenrola Direito - Plataforma de Educação Jurídica

Uma plataforma completa de educação jurídica e suporte legal que fornece conteúdo interativo, calculadoras jurídicas e recursos educacionais para ajudar os cidadãos a compreenderem seus direitos em diversas áreas do Direito brasileiro.

## Funcionalidades Principais

- **Artigos Jurídicos**: Conteúdo educacional em categorias como Direito do Consumidor, Trabalhista, Médico, Penal, Família e Previdenciário
- **Calculadoras Jurídicas**: Ferramentas interativas para cálculos de rescisão trabalhista, multas de trânsito, indenizações e pensão alimentícia
- **Modelos de Documentos**: Templates de documentos jurídicos em formato TXT para fácil utilização
- **Busca Avançada**: Sistema de busca para encontrar conteúdo específico na plataforma
- **Design Responsivo**: Interface adaptada para funcionar em dispositivos móveis e desktop
- **SEO Otimizado**: Estrutura preparada para indexação por mecanismos de busca

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express
- **Banco de Dados**: PostgreSQL
- **ORM**: Drizzle
- **Deploy**: Configurado para hospedagem na Hostinger

## Estrutura do Projeto

```
desenrola-direito/
├── client/               # Código do frontend React
│   ├── src/              # Código fonte do cliente
│   │   ├── components/   # Componentes React reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── hooks/        # React hooks personalizados
│   │   └── lib/          # Bibliotecas e utilitários
├── server/               # Código do backend
│   ├── routes.ts         # Rotas da API
│   ├── storage.ts        # Interface de armazenamento
│   └── db.ts             # Configuração do banco de dados
├── shared/               # Código compartilhado entre cliente e servidor
│   └── schema.ts         # Esquema do banco de dados
├── public/               # Arquivos estáticos
├── dist/                 # Build de produção (gerado)
└── scripts/              # Scripts utilitários
```

## Requisitos de Sistema

- Node.js 18.x ou superior
- PostgreSQL 14.x ou superior
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## Configuração e Instalação Local

### Pré-requisitos

- Node.js instalado
- PostgreSQL configurado e rodando
- Git (opcional)

### Passos para Instalação

1. Clone o repositório ou faça o download dos arquivos:
   ```bash
   git clone https://github.com/seu-usuario/desenrola-direito.git
   cd desenrola-direito
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco de dados:
   - Crie um banco de dados PostgreSQL
   - Crie um arquivo `.env` na raiz do projeto:
     ```
     DATABASE_URL=postgres://usuario:senha@localhost:5432/desenrola_direito
     EMAIL_HOST=seu-servidor-smtp
     EMAIL_PORT=587
     EMAIL_USER=seu-email
     EMAIL_PASSWORD=sua-senha
     ```

4. Inicialize o banco de dados:
   ```bash
   node init-database.js
   ```

5. Execute a aplicação:
   ```bash
   npm run dev
   ```

6. Acesse a aplicação em `http://localhost:5000`

## Configuração para Produção (Hostinger)

Para preparar o projeto para hospedagem na Hostinger, execute:

```bash
node prepare-for-hostinger.js
```

Este script configura o projeto para ambiente de produção e cria uma documentação detalhada (`HOSTINGER-DEPLOY.md`) com todos os passos necessários para o deploy.

## Adicionando Conteúdo

### Adicionando Novos Artigos

Execute o script de adição de artigos:

```bash
node add-article.js
```

Para adicionar os artigos complementares que garantem 5 artigos por categoria:

```bash
node run-complete-articles.js
```

## Backup do Banco de Dados

Para fazer backup do banco de dados:

```bash
./backup-database.sh
```

## Guia de Manutenção

### Para realizar atualizações:

1. Faça as alterações desejadas no código
2. Construa a versão de produção:
   ```bash
   npm run build
   ```
3. Reinicie o servidor:
   ```bash
   npm run start
   ```

## Licença

Este projeto é propriedade intelectual e está protegido por direitos autorais. Todos os direitos reservados.

## Suporte

Para suporte técnico, entre em contato através do email: seu-email@exemplo.com