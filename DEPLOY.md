# 🚀 Deploy do Desenrola Direito

## Importante: Problema de Porta Resolvido! 
O Replit espera que o servidor rode na porta 5000, mas o deploy usa a porta 3000. Nossa solução implementa um proxy transparente entre as duas portas.

## Deploy Rápido no Replit

### 1. Método recomendado:
```bash
node start-with-proxy.js
```
Este script inicia o servidor na porta 3000 e um proxy na porta 5000 simultaneamente, resolvendo o conflito de portas.

### 2. Alternativas (se o método 1 falhar):

Opção A: Iniciar servidor simples
```bash
node simple-server.js
```

Opção B: Iniciar servidor Express
```bash
node express-server.js
```

## Estrutura dos Arquivos de Deploy

- **start-with-proxy.js**: Solução principal - inicia servidor + proxy
- **port-proxy.js**: Proxy que redireciona porta 5000 → 3000
- **express-server.js**: Servidor Express simplificado
- **simple-server.js**: Servidor HTTP básico
- **server-deploy.js**: Servidor para deploy em produção
- **netlify.toml**: Configuração para deploy no Netlify
- **vercel.json**: Configuração para deploy no Vercel
- **.replit.port**: Indica a porta principal (3000)
- **.replit.custom**: Configuração customizada do Replit

## Como Verificar se o Servidor está Rodando

1. O servidor deve exibir a mensagem "✅ Servidor Express rodando na porta 3000"
2. O proxy deve exibir "✅ Proxy de porta iniciado: 5000 -> 3000"
3. Se algo falhar, verifique os logs em "View logs" no painel do Replit

## Em Caso de Erro no Deploy

1. Verifique se todas as portas estão corretas (3000 no servidor, 5000 no proxy)
2. Tente encerrar processos anteriores: `pkill node` no terminal
3. Se persistir o problema, tente editar o arquivo .replit através da interface
4. Use a opção "Run" do Replit para deploy automático

Para mais informações, consulte o arquivo `INSTRUCOES_DEPLOY.md` com detalhes técnicos adicionais.