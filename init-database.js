/**
 * Script para inicializar o banco de dados do Desenrola Direito
 */

const { Pool } = require('@neondatabase/serverless');
const ws = require('ws');
const fs = require('fs');
const path = require('path');

// Verificar variável de ambiente
if (!process.env.DATABASE_URL) {
  console.error('A variável de ambiente DATABASE_URL não está definida.');
  console.error('Por favor, configure-a com a string de conexão do PostgreSQL.');
  process.exit(1);
}

// Configuração do PostgreSQL
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  webSocketConstructor: ws
});

// Funções auxiliares
async function executeQuery(query, params = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } finally {
    client.release();
  }
}

async function tableExists(tableName) {
  const query = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_name = $1
    );
  `;
  
  const result = await executeQuery(query, [tableName]);
  return result.rows[0].exists;
}

async function createTables() {
  console.log('Criando tabelas...');
  
  // Tabela de usuários
  if (!await tableExists('users')) {
    await executeQuery(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);
    console.log('✅ Tabela "users" criada.');
  } else {
    console.log('ℹ️ Tabela "users" já existe.');
  }
  
  // Tabela de categorias
  if (!await tableExists('categories')) {
    await executeQuery(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        description TEXT,
        icon_name TEXT
      );
    `);
    console.log('✅ Tabela "categories" criada.');
  } else {
    console.log('ℹ️ Tabela "categories" já existe.');
  }
  
  // Tabela de artigos
  if (!await tableExists('articles')) {
    await executeQuery(`
      CREATE TABLE articles (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT,
        publish_date TIMESTAMP NOT NULL,
        category_id INTEGER NOT NULL REFERENCES categories(id),
        featured INTEGER DEFAULT 0
      );
    `);
    console.log('✅ Tabela "articles" criada.');
  } else {
    console.log('ℹ️ Tabela "articles" já existe.');
  }
  
  // Tabela de soluções
  if (!await tableExists('solutions')) {
    await executeQuery(`
      CREATE TABLE solutions (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT,
        link TEXT NOT NULL,
        link_text TEXT NOT NULL
      );
    `);
    console.log('✅ Tabela "solutions" criada.');
  } else {
    console.log('ℹ️ Tabela "solutions" já existe.');
  }
}

async function createCategory(name, slug, description, iconName) {
  const result = await executeQuery(
    'INSERT INTO categories (name, slug, description, icon_name) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, slug, description, iconName]
  );
  return result.rows[0];
}

async function createArticle(title, slug, excerpt, content, imageUrl, publishDate, categoryId, featured) {
  const result = await executeQuery(
    'INSERT INTO articles (title, slug, excerpt, content, image_url, publish_date, category_id, featured) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [title, slug, excerpt, content, imageUrl, publishDate, categoryId, featured]
  );
  return result.rows[0];
}

async function createSolution(title, description, imageUrl, link, linkText) {
  const result = await executeQuery(
    'INSERT INTO solutions (title, description, image_url, link, link_text) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, description, imageUrl, link, linkText]
  );
  return result.rows[0];
}

async function hasData() {
  const result = await executeQuery('SELECT COUNT(*) FROM categories');
  return parseInt(result.rows[0].count) > 0;
}

async function seedInitialData() {
  console.log('Verificando se é necessário popular o banco de dados...');
  
  // Verificar se já existem dados
  if (await hasData()) {
    console.log('O banco de dados já contém dados. Pulando a etapa de seed.');
    return;
  }
  
  console.log('Populando o banco de dados com dados iniciais...');
  
  // Criar categorias
  console.log('Criando categorias...');
  const consumerCategory = await createCategory(
    "Direito do Consumidor",
    "direito-consumidor",
    "Saiba como resolver problemas com empresas, garantir seus direitos nas compras e obter ressarcimento por produtos defeituosos.",
    "fa-gavel"
  );
  
  const laborCategory = await createCategory(
    "Direito Trabalhista",
    "direito-trabalhista",
    "Conheça seus direitos no ambiente de trabalho, rescisão, horas extras, assédio e mais. Saiba quando você pode reivindicar.",
    "fa-briefcase"
  );
  
  const realEstateCategory = await createCategory(
    "Direito Imobiliário",
    "direito-imobiliario",
    "Tudo sobre contratos de aluguel, compra e venda de imóveis, financiamentos e como evitar armadilhas neste setor.",
    "fa-home"
  );
  
  const familyCategory = await createCategory(
    "Direito Familiar",
    "direito-familiar",
    "Orientações sobre divórcio, pensão alimentícia, guarda de filhos, inventário e outros assuntos relacionados à família.",
    "fa-users"
  );
  
  const socialSecurityCategory = await createCategory(
    "Direito Previdenciário",
    "direito-previdenciario",
    "Informações sobre aposentadoria, benefícios, auxílios e como garantir seus direitos junto ao INSS.",
    "fa-shield-alt"
  );

  console.log('Categorias criadas com sucesso.');
  
  // Criar alguns artigos para cada categoria
  console.log('Criando artigos...');
  
  // Artigos para Direito do Consumidor
  await createArticle(
    "Como cancelar compras online: Guia prático",
    "como-cancelar-compras-online",
    "Saiba seus direitos de arrependimento em compras pela internet e como proceder para cancelamentos sem dor de cabeça.",
    `# Como cancelar compras online: Guia prático

Você fez uma compra pela internet e se arrependeu? Saiba que o Código de Defesa do Consumidor (CDC) garante o direito de arrependimento para compras realizadas fora do estabelecimento comercial.

## O direito de arrependimento

O artigo 49 do CDC estabelece que o consumidor pode desistir da compra no prazo de 7 dias, contados a partir do recebimento do produto ou da assinatura do contrato. Este direito é garantido independentemente do motivo do arrependimento.

## Como proceder para cancelar:

1. **Entre em contato com a empresa**: Faça o pedido de cancelamento preferencialmente por escrito (e-mail, chat ou outro canal oficial), guardando o protocolo de atendimento.

2. **Prazo legal**: Lembre-se que o pedido deve ser feito em até 7 dias após o recebimento do produto.

3. **Devolução do valor**: A empresa deve devolver integralmente qualquer valor pago, inclusive frete, atualizado monetariamente.

4. **Custos de devolução**: Em regra, os custos de devolução são de responsabilidade da empresa.

## O que fazer se a empresa se recusar a cancelar:

- Guarde todos os comprovantes da tentativa de cancelamento
- Formalize uma reclamação no Procon
- Registre uma queixa no site consumidor.gov.br
- Em último caso, procure o Juizado Especial Cível

## Exceções ao direito de arrependimento:

Alguns produtos podem ter restrições para cancelamento, como:
- Produtos personalizados
- Produtos perecíveis
- Conteúdos digitais após o download ou acesso

Lembre-se que conhecer seus direitos é o primeiro passo para garantir que sejam respeitados!`,
    "https://images.unsplash.com/photo-1589216996730-15c1486d8590",
    new Date(),
    consumerCategory.id,
    1
  );
  
  await createArticle(
    "Produtos com defeito: Como exigir seus direitos",
    "produtos-com-defeito",
    "Guia completo sobre como proceder quando um produto apresenta defeito, incluindo prazos e opções de reparação.",
    `# Produtos com defeito: Como exigir seus direitos

Comprou um produto que apresentou defeito? O Código de Defesa do Consumidor estabelece regras claras para proteger o consumidor nessas situações.

## Prazos para reclamação

- **Produtos não duráveis**: 30 dias (alimentos, cosméticos, etc.)
- **Produtos duráveis**: 90 dias (eletrodomésticos, móveis, etc.)

Estes prazos começam a contar a partir da entrega efetiva do produto para vícios aparentes, ou da descoberta do problema, para vícios ocultos.

## As três alternativas legais

Quando um produto apresenta defeito, o consumidor pode exigir, à sua escolha:

1. **Substituição do produto**
2. **Abatimento proporcional do preço**
3. **Devolução do valor pago (com correção monetária)**

O fornecedor tem até 30 dias para sanar o problema. Se não resolver neste prazo, o consumidor pode exigir imediatamente qualquer uma das três alternativas acima.

## Como proceder:

1. **Registre o problema**: Tire fotos, guarde notas fiscais e faça um relatório detalhado do defeito
2. **Contate o fornecedor**: Use canais oficiais e guarde protocolos de atendimento
3. **Formalize a reclamação**: Envie carta com AR ou e-mail com confirmação de leitura
4. **Acione órgãos de defesa**: Procon, consumidor.gov.br ou Juizado Especial Cível

## Garantias legais e contratuais

A garantia legal é obrigatória e independe de termo escrito. Já a garantia contratual é complementar, oferecida voluntariamente pelo fornecedor.

Lembre-se: A garantia contratual não substitui a legal, mas se soma a ela!`,
    "https://images.unsplash.com/photo-1625225230517-7426c1be750c",
    new Date(),
    consumerCategory.id,
    0
  );
  
  // Artigos para Direito Trabalhista
  await createArticle(
    "Demissão sem justa causa: O que você precisa saber",
    "demissao-sem-justa-causa",
    "Entenda seus direitos durante uma demissão sem justa causa, quais verbas rescisórias você tem direito e como calcular.",
    `# Demissão sem justa causa: O que você precisa saber

A demissão sem justa causa ocorre quando o empregador decide encerrar o contrato de trabalho sem que o funcionário tenha cometido qualquer falta grave. Nesta situação, o trabalhador tem direito a diversas verbas rescisórias.

## Quais são seus direitos?

Quando demitido sem justa causa, o trabalhador tem direito a:

- **Saldo de salário**: Dias trabalhados no mês da rescisão
- **Aviso prévio**: 30 dias + 3 dias por ano trabalhado (limitado a 90 dias)
- **Férias vencidas e proporcionais**: Com acréscimo de 1/3
- **13º salário proporcional**: Referente aos meses trabalhados no ano
- **FGTS**: Saque do saldo + multa de 40% sobre o total depositado
- **Seguro-desemprego**: Se atender aos requisitos legais

## Prazos para pagamento

A quitação das verbas rescisórias deve ocorrer:
- Em até 10 dias após o término do contrato, se houver aviso prévio trabalhado
- No primeiro dia útil após o término do contrato, se for aviso prévio indenizado

## Como calcular as verbas rescisórias

Para fazer uma estimativa dos valores a receber:

1. **Saldo de salário**: (Salário ÷ 30) × dias trabalhados no mês
2. **Aviso prévio**: Salário mensal
3. **Férias + 1/3**: Salário + (Salário ÷ 3)
4. **13º proporcional**: (Salário ÷ 12) × meses trabalhados no ano
5. **FGTS**: 8% sobre todas as verbas salariais no período + multa de 40%

## O que fazer em caso de problemas?

Se a empresa não pagar corretamente:
- Busque a assistência do sindicato da categoria
- Registre uma denúncia na Superintendência Regional do Trabalho
- Procure um advogado trabalhista ou a Defensoria Pública
- Entre com uma ação na Justiça do Trabalho

Lembre-se: A homologação da rescisão não impede o questionamento posterior de direitos não pagos!`,
    "https://images.unsplash.com/photo-1590087851092-908fd5cc6c67",
    new Date(),
    laborCategory.id,
    1
  );
  
  // Criando mais alguns artigos para as outras categorias
  await createArticle(
    "Contrato de Aluguel: O que verificar antes de assinar",
    "contrato-aluguel-o-que-verificar",
    "Guia completo sobre os pontos críticos que você deve analisar antes de assinar um contrato de locação de imóvel.",
    `# Contrato de Aluguel: O que verificar antes de assinar

Alugar um imóvel é um passo importante que exige atenção aos detalhes do contrato para evitar problemas futuros. Este guia apresenta os principais pontos que você deve verificar antes de assinar um contrato de locação.

## Principais cláusulas a verificar

- **Prazo do contrato**: Verifique a duração e as condições para renovação
- **Valor do aluguel**: Confirme o valor, data de vencimento e forma de reajuste anual
- **Despesas extras**: Esclareça quem paga IPTU, condomínio, taxas e serviços públicos
- **Garantias exigidas**: Fiador, caução, seguro-fiança ou outro tipo de garantia
- **Multa por rescisão**: Valor e condições para quebra antecipada de contrato

## Documentação necessária

1. **Vistoria detalhada**: Exija um relatório com fotos de tudo que está no imóvel e seu estado de conservação
2. **Regularidade do imóvel**: Verifique se existem débitos pendentes de IPTU ou condomínio
3. **Autorização para modificações**: Cláusulas sobre alterações permitidas no imóvel

## Dicas importantes

- Leia o contrato integralmente, mesmo as letras miúdas
- Não assine contratos com cláusulas em branco para preenchimento posterior
- Consulte a lei do inquilinato (Lei 8.245/91) para conhecer seus direitos
- Em caso de dúvidas, procure assessoria jurídica especializada

## Cuidados extras

Antes de assinar, visite o imóvel novamente, teste instalações elétricas, torneiras, chuveiros, e verifique se há infiltrações ou rachaduras não documentadas na vistoria.

A prevenção no momento da assinatura do contrato pode evitar muitos transtornos durante a locação!`,
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    new Date(),
    realEstateCategory.id,
    1
  );
  
  await createArticle(
    "Pensão alimentícia: Como calcular e solicitar",
    "pensao-alimenticia-calculo",
    "Entenda os critérios para definição do valor da pensão alimentícia e como fazer o pedido judicial.",
    `# Pensão alimentícia: Como calcular e solicitar

A pensão alimentícia é um direito garantido aos filhos e, em alguns casos, a ex-cônjuges. Ela visa assegurar a manutenção das necessidades básicas do alimentado, garantindo condições dignas de subsistência.

## Como é calculado o valor?

A legislação brasileira não define um percentual fixo ou valor tabelado para pensão alimentícia. O cálculo leva em consideração três fatores principais:

1. **Necessidade do alimentado**: Gastos com educação, saúde, alimentação, lazer, etc.
2. **Possibilidade do alimentante**: Capacidade financeira de quem paga a pensão
3. **Proporcionalidade**: Equilíbrio entre as necessidades de quem recebe e as possibilidades de quem paga

## Formas de pagamento

- **Percentual sobre a remuneração**: Geralmente entre 20% e 30% dos rendimentos líquidos
- **Valor fixo**: Quantia determinada, atualizada anualmente
- **Mista**: Combinação de valor fixo com percentual
- **In natura**: Pagamento direto de despesas específicas (escola, plano de saúde, etc.)

## Como solicitar judicialmente

1. **Assessoria jurídica**: Procure um advogado, defensor público ou Ministério Público
2. **Documentação necessária**: Certidão de nascimento dos filhos, comprovantes de despesas e de rendimentos
3. **Ação judicial**: Petição inicial com pedido de pensão definitiva e provisória
4. **Audiência de conciliação**: Tentativa de acordo entre as partes
5. **Sentença judicial**: Determinação do valor e forma de pagamento

## Consequências do não pagamento

O não pagamento da pensão alimentícia pode resultar em:
- Prisão civil (regime fechado de 1 a 3 meses)
- Protesto em cartório
- Inclusão em cadastros de inadimplentes
- Penhora de bens e valores

É importante lembrar que a pensão é um direito dos filhos e não um benefício ao ex-cônjuge que detém a guarda. Seu pagamento regular é fundamental para garantir o bem-estar das crianças e adolescentes.`,
    "https://images.unsplash.com/photo-1511895426328-dc8714191300",
    new Date(),
    familyCategory.id,
    1
  );
  
  await createArticle(
    "Aposentadoria por tempo de contribuição: Regras atuais",
    "aposentadoria-tempo-contribuicao",
    "Entenda as mudanças trazidas pela reforma da previdência e as regras para aposentadoria por tempo de contribuição.",
    `# Aposentadoria por tempo de contribuição: Regras atuais

Com a Reforma da Previdência (Emenda Constitucional nº 103/2019), as regras para aposentadoria sofreram alterações significativas. A aposentadoria exclusivamente por tempo de contribuição, como era conhecida, foi extinta, sendo substituída por regras que combinam idade mínima e tempo de contribuição.

## Regra geral atual

Para quem começou a contribuir após a reforma:

**Homens**:
- Idade mínima: 65 anos
- Tempo mínimo de contribuição: 20 anos

**Mulheres**:
- Idade mínima: 62 anos
- Tempo mínimo de contribuição: 15 anos

## Regras de transição

Para quem já estava no sistema antes da reforma, existem cinco regras de transição:

### 1. Regra dos pontos
Soma de idade e tempo de contribuição:
- Mulheres: Começa com 86 pontos (2019), aumentando até 100 pontos (2033)
- Homens: Começa com 96 pontos (2019), aumentando até 105 pontos (2028)

### 2. Idade mínima progressiva
- Mulheres: Começa com 56 anos (2019), aumentando até 62 anos (2031)
- Homens: Começa com 61 anos (2019), aumentando até 65 anos (2027)

### 3. Pedágio de 50%
Para quem estava a menos de 2 anos da aposentadoria:
- Cumprir 50% a mais do tempo que faltava para se aposentar

### 4. Pedágio de 100%
- Idade mínima: 57 anos (mulheres) e 60 anos (homens)
- Cumprir 100% do tempo que faltava para a aposentadoria

### 5. Idade mínima reduzida para professores
Regras especiais para professores da educação básica

## Cálculo do benefício

O valor da aposentadoria agora é calculado com base em 60% da média de todos os salários de contribuição a partir de julho/1994, acrescidos de 2% para cada ano que exceder 20 anos de contribuição (15 anos para mulheres).

## Orientações importantes

- Verifique seu extrato previdenciário regularmente para conferir as contribuições
- Se houver períodos não registrados, solicite a inclusão
- Considere contratar um planejamento de aposentadoria
- Avalie a possibilidade de contribuições facultativas para melhorar o benefício

Para informações mais detalhadas sobre seu caso específico, consulte o INSS ou um advogado especializado em direito previdenciário.`,
    "https://images.unsplash.com/photo-1631815588090-d4bfec5b9211",
    new Date(),
    socialSecurityCategory.id,
    1
  );
  
  console.log('Artigos criados com sucesso.');
  
  // Criar soluções
  console.log('Criando soluções...');
  
  await createSolution(
    "Consultoria Jurídica Online",
    "Atendimento com advogados especializados por videoconferência, chat ou WhatsApp.",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    "/consultoria",
    "Agendar Consulta"
  );
  
  await createSolution(
    "Revisão de Contratos",
    "Analise seus contratos antes de assinar e evite problemas futuros.",
    "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f",
    "/revisao-contratos",
    "Solicitar Revisão"
  );
  
  await createSolution(
    "Calculadora de Direitos",
    "Ferramenta para calcular rescisões, aposentadorias, pensões e mais.",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
    "/calculadoras",
    "Usar Calculadoras"
  );
  
  console.log('Soluções criadas com sucesso.');
  
  console.log('Banco de dados populado com sucesso!');
}

async function main() {
  try {
    console.log('Iniciando configuração do banco de dados...');
    
    // Testar conexão
    const client = await pool.connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    client.release();
    
    // Criar tabelas
    await createTables();
    
    // Popular com dados iniciais
    await seedInitialData();
    
    console.log('Configuração do banco de dados concluída com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro durante a configuração do banco de dados:', err);
    process.exit(1);
  } finally {
    // Encerrar a pool de conexões
    try {
      await pool.end();
    } catch (err) {
      console.error('Erro ao encerrar a pool de conexões:', err);
    }
  }
}

// Executar o script
main();