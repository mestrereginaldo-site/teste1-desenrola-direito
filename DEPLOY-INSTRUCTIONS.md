# Instruções de Hospedagem - Desenrola Direito

Este documento contém instruções detalhadas para hospedar o site "Desenrola Direito" em um servidor externo.

## Requisitos

* Node.js 16.x ou superior
* NPM ou Yarn
* Servidor web com suporte a Node.js (como Heroku, Vercel, Netlify, AWS, DigitalOcean, etc.)

## Arquivos Principais

O site está configurado para funcionar com um servidor Express simplificado:

* `final-server.cjs` - Servidor Express autônomo com dados e API embutidos
* `Procfile` - Configuração para hospedagem em serviços como Heroku

## Como Hospedar

### Opção 1: Hospedagem no Heroku

1. Crie uma conta no [Heroku](https://www.heroku.com/)
2. Instale o [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Faça login no Heroku: `heroku login`
4. Na pasta do projeto, crie um aplicativo Heroku: `heroku create desenrola-direito`
5. Envie o código para o Heroku: `git push heroku main`
6. Abra o aplicativo: `heroku open`

### Opção 2: Hospedagem na Vercel

1. Crie uma conta na [Vercel](https://vercel.com/)
2. Instale o [Vercel CLI](https://vercel.com/cli): `npm install -g vercel`
3. Faça login na Vercel: `vercel login`
4. Na pasta do projeto, implante com: `vercel --prod`

### Opção 3: Hospedagem em VPS (DigitalOcean, AWS, etc.)

1. Conecte-se ao seu servidor via SSH
2. Clone o repositório
3. Navegue até a pasta do projeto
4. Instale as dependências: `npm install`
5. Inicie o servidor: `node final-server.cjs`
6. Para manter o servidor rodando, use um gerenciador de processos como o PM2:
   ```
   npm install -g pm2
   pm2 start final-server.cjs
   pm2 save
   pm2 startup
   ```

### Opção 4: Hospedagem no serviço de sua preferência (cPanel, Hostinger, etc.)

1. Faça upload de todos os arquivos para o seu servidor
2. Configure o Node.js no seu serviço de hospedagem
3. Configure o servidor para executar `node final-server.cjs`

## Considerações Importantes

* O servidor está configurado para usar a porta definida em `process.env.PORT` ou 5000 por padrão
* Certifique-se de que as portas usadas estão liberadas no firewall do servidor
* Para personalização, edite o arquivo `final-server.cjs`
* Para produção real, recomendamos implementar um banco de dados para armazenar artigos e categorias
* O arquivo `.env` pode ser usado para configurar variáveis de ambiente

## Domínio Personalizado

Para configurar o domínio `desenroladireito.com.br`:

1. No seu provedor de DNS, configure um registro A apontando para o IP do seu servidor ou um registro CNAME para o URL do serviço de hospedagem
2. Se estiver usando Heroku, use: `heroku domains:add desenroladireito.com.br`
3. Se estiver usando Vercel, configure o domínio no painel administrativo ou use: `vercel domains add desenroladireito.com.br`

## Suporte e Manutenção

Para qualquer problema ou dúvida sobre a hospedagem, entre em contato com o desenvolvedor.