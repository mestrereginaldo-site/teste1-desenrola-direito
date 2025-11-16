/**
 * Script para atualizar um artigo específico no MemStorage
 */
const { storage } = require('./server/storage');

// Artigo: Como cancelar compras online
const updateCancelacaoCompras = async () => {
  try {
    const article = await storage.getArticleBySlug('como-cancelar-compras-online');
    
    if (!article) {
      console.log('Artigo não encontrado');
      return;
    }
    
    console.log(`Atualizando o artigo: ${article.title}`);
    
    // Conteúdo expandido
    const newContent = `
# Como cancelar compras online: Guia prático

Você fez uma compra pela internet e se arrependeu? Saiba que o Código de Defesa do Consumidor (CDC) garante o direito de arrependimento para compras realizadas fora do estabelecimento comercial. Este guia apresenta informações detalhadas sobre como exercer esse direito, os prazos legais, exceções e procedimentos práticos para efetuar o cancelamento de compras online sem dor de cabeça.

## O direito de arrependimento no e-commerce

O artigo 49 do CDC estabelece que o consumidor pode desistir da compra no prazo de 7 dias, contados a partir do recebimento do produto ou da assinatura do contrato. Este direito é garantido independentemente do motivo do arrependimento, não sendo necessário justificar a desistência.

### Fundamentação legal

O direito de arrependimento nas compras online está fundamentado no seguinte texto legal:

> Art. 49. O consumidor pode desistir do contrato, no prazo de 7 dias a contar de sua assinatura ou do ato de recebimento do produto ou serviço, sempre que a contratação de fornecimento de produtos e serviços ocorrer fora do estabelecimento comercial, especialmente por telefone ou a domicílio.
> 
> Parágrafo único. Se o consumidor exercitar o direito de arrependimento previsto neste artigo, os valores eventualmente pagos, a qualquer título, durante o prazo de reflexão, serão devolvidos, de imediato, monetariamente atualizados.

Esta proteção foi criada porque, nas compras realizadas a distância, o consumidor não tem contato físico prévio com o produto, ficando impossibilitado de avaliar adequadamente suas características, qualidade e adequação às expectativas.

## Prazos para exercer o direito de arrependimento

O prazo de 7 dias é contado de forma corrida (incluindo finais de semana e feriados) e começa a partir de dois momentos possíveis:

1. **Data de recebimento do produto**: Quando se trata de compra de bem físico
2. **Data da contratação do serviço**: Quando se trata de aquisição de serviço

### Início da contagem para diferentes situações

- **Compra de múltiplos itens com entrega separada**: O prazo conta individualmente para cada produto, a partir da data de recebimento de cada um
- **Compra de produtos com entrega recorrente**: O prazo inicia a cada entrega realizada
- **Contratação de serviços contínuos**: O prazo começa após a assinatura do contrato ou da disponibilização do serviço, o que ocorrer primeiro

É importante destacar que o CDC não exige que a embalagem permaneça lacrada para o exercício do direito de arrependimento. O consumidor pode abrir a embalagem e verificar o produto, desde que o use apenas para teste, sem descaracterizá-lo.

## Como proceder para cancelar:

O cancelamento deve seguir alguns passos importantes para garantir que o direito seja respeitado:

### 1. Entre em contato com a empresa

Formalize o pedido de cancelamento por escrito, preferencialmente por:
- E-mail corporativo da empresa
- Chat oficial do site (salvando o histórico da conversa)
- Seção específica "Cancelamento" ou "Troca e Devolução" do site
- Aplicativo da loja, na seção de atendimento ao cliente

**Dica importante**: Sempre registre um protocolo de atendimento e anote o nome do atendente que lhe auxiliou.

### 2. Informações que devem constar no pedido de cancelamento

Ao solicitar o cancelamento, inclua:
- Seus dados completos (nome, CPF, endereço)
- Número do pedido ou nota fiscal
- Data exata do recebimento do produto (anexe comprovante)
- Declaração expressa de desistência com base no art. 49 do CDC
- Dados bancários para reembolso

### 3. Devolução do valor

A empresa deve devolver integralmente qualquer valor pago, inclusive frete, com atualização monetária.

**Prazos para reembolso**:
- **Cartão de crédito**: Estorno na próxima fatura ou em até 2 faturas
- **Débito ou PIX**: Devolução em até 30 dias
- **Boleto bancário**: Crédito em conta em até 7 dias úteis

**Atenção**: A empresa não pode:
- Oferecer apenas crédito na loja
- Cobrar multa ou taxa de cancelamento
- Reter parte do valor a título de "taxa administrativa"

<!-- ADSENSE -->
<div class="adsense-container">
  <p class="adsense-text">Publicidade</p>
  <div class="adsense-placeholder">
    <!-- Código Google AdSense será inserido aqui -->
  </div>
</div>
<!-- FIM ADSENSE -->

### 4. Custos de devolução

Em regra, os custos de devolução são de responsabilidade da empresa. O Superior Tribunal de Justiça (STJ) consolidou entendimento de que o ônus do transporte para devolução não pode ser imposto ao consumidor, pois isso representaria um obstáculo ao exercício do direito de arrependimento.

Alternativas comuns oferecidas pelas empresas:
- Envio de transportadora para retirada
- Código de postagem reversa pelos Correios
- Autorização para devolução em loja física

## O que fazer se a empresa se recusar a cancelar:

Caso enfrente resistência por parte da empresa, siga estes passos:

### 1. Documentação de provas

- Guarde capturas de tela (screenshots) de todo o processo de compra
- Arquive e-mails de confirmação e protocolos de atendimento
- Mantenha registro das tentativas de contato com a empresa
- Fotografe o produto na embalagem original antes de devolvê-lo

### 2. Formalização da reclamação

- **Procon**: Registre uma queixa formal no órgão de defesa do consumidor do seu estado ou município
- **Consumidor.gov.br**: Plataforma oficial do governo federal que medeia conflitos entre consumidores e empresas
- **Reclame Aqui**: Site privado que dá visibilidade a reclamações e ajuda na resolução

### 3. Medidas legais

- **Juizados Especiais Cíveis**: Para causas de até 20 salários mínimos, não é necessário advogado
- **Ação judicial com advogado**: Para casos mais complexos ou de valor superior
- **Notificação extrajudicial**: Documento formal que pode ser enviado antes de iniciar uma ação

## Exceções ao direito de arrependimento:

Existem algumas situações em que o direito de arrependimento pode ser limitado:

### Produtos personalizados

Itens confeccionados sob medida ou com personalização específica solicitada pelo consumidor podem ter restrições. Exemplos:
- Móveis planejados com medidas exclusivas
- Camisetas com estampas personalizadas
- Jóias com gravações pessoais

### Produtos perecíveis

Alimentos, flores e outros itens de natureza perecível têm tratamento diferenciado devido à sua durabilidade limitada.

### Conteúdos digitais após acesso

Após o download ou acesso ao conteúdo digital (filmes, e-books, jogos), o direito de arrependimento pode ser limitado, desde que:
- O consumidor tenha sido claramente informado antes da compra
- A possibilidade de teste tenha sido oferecida
- O acesso ou download tenha sido efetivamente realizado

## Cancelamento de compras por outras razões

Além do direito de arrependimento, existem outras situações que justificam o cancelamento:

### Atraso na entrega

Se o produto não for entregue no prazo informado durante a compra:

1. Entre em contato com a empresa e estabeleça um novo prazo
2. Se ainda assim não houver entrega, você pode escolher entre:
   - Aceitar outro produto ou serviço equivalente
   - Cancelar a compra com devolução integral dos valores
   - Manter a compra com abatimento proporcional do preço

**Base legal**: Artigo 35 do Código de Defesa do Consumidor

### Produto com defeito

Se o produto apresentar problemas:

- **Produtos não duráveis**: 30 dias para reclamar
- **Produtos duráveis**: 90 dias para reclamar

As opções ao consumidor são:
- Substituição do produto
- Abatimento proporcional do preço
- Devolução do valor pago
- Reparo do defeito (se for possível)

### Disparidade nas informações

Quando o produto entregue não corresponde à descrição apresentada no site:
- Fotos diferentes da realidade
- Funcionalidades prometidas ausentes
- Especificações técnicas divergentes

Neste caso, trata-se de propaganda enganosa, que dá direito ao cancelamento com base no artigo 37 do CDC.

## Dicas práticas para evitar problemas em compras online:

### Antes de comprar:

1. **Pesquise sobre a reputação da loja**:
   - Verifique avaliações no Reclame Aqui e Google
   - Consulte o CNPJ no site da Receita Federal
   - Verifique se o site tem o cadeado de segurança (HTTPS)

2. **Guarde todas as informações**:
   - Faça capturas de tela das páginas de produto
   - Salve e-mails de confirmação
   - Arquive comprovantes de pagamento

3. **Leia as políticas da loja**:
   - Política de troca e devolução
   - Prazos de entrega
   - Condições de frete para devoluções

### Após receber o produto:

1. **Verifique imediatamente**:
   - Abra a embalagem com cuidado
   - Confira se o produto corresponde ao anunciado
   - Teste o funcionamento básico

2. **Em caso de arrependimento**:
   - Aja rapidamente dentro do prazo de 7 dias
   - Mantenha o produto em boas condições
   - Guarde a embalagem original quando possível

## Direitos adicionais em compras internacionais

Para compras em sites estrangeiros, existem algumas diferenças importantes:

- O Código de Defesa do Consumidor se aplica quando a empresa tem representação no Brasil
- Para empresas sem representação no Brasil, valem as leis do país de origem
- Taxas de importação geralmente não são reembolsáveis em caso de devolução
- Os prazos de devolução podem ser maiores devido à logística internacional

## Considerações finais

O direito de arrependimento nas compras online é uma proteção fundamental ao consumidor, que equilibra a relação de consumo no ambiente virtual. Conhecer esse direito e saber como exercê-lo adequadamente é essencial para uma experiência de compra segura.

Lembre-se que, além de um direito legal, o arrependimento é reconhecido como boa prática por empresas sérias, que valorizam a satisfação e confiança do cliente. Por isso, empresas com políticas de devolução claras e descomplicadas geralmente oferecem uma experiência de compra mais confiável.

Em caso de dúvidas específicas sobre situações não abordadas neste guia, consulte o Procon da sua cidade ou um advogado especializado em direito do consumidor.
`;
    
    // Fazer a atualização no storage
    article.content = newContent;
    
    // Atualizar o artigo no MemStorage
    storage.articles.set(article.id, article);
    
    console.log('Artigo atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar artigo:', error);
  }
};

// Executar a função
updateCancelacaoCompras()
  .then(() => console.log('Processo concluído!'))
  .catch(err => console.error('Erro:', err));