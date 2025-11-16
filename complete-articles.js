import { storage } from './server/storage.js';

// Função para adicionar um artigo ao storage
async function addArticle(articleData) {
  try {
    // Converter string de data para objeto Date se necessário
    if (typeof articleData.publishDate === 'string') {
      articleData.publishDate = new Date(articleData.publishDate);
    }
    
    const article = await storage.createArticle(articleData);
    console.log('Artigo adicionado com sucesso:', article.title);
    return article;
  } catch (error) {
    console.error('Erro ao adicionar artigo:', error);
    throw error;
  }
}

// Função para obter categorias
async function getCategories() {
  try {
    const categories = await storage.getCategories();
    return categories;
  } catch (error) {
    console.error('Erro ao obter categorias:', error);
    throw error;
  }
}

// Função para verificar quantos artigos existem em cada categoria
async function countArticlesByCategory() {
  try {
    const categories = await storage.getCategories();
    const counts = {};
    
    for (const category of categories) {
      const articles = await storage.getArticlesByCategory(category.slug);
      counts[category.name] = articles.length;
    }
    
    return counts;
  } catch (error) {
    console.error('Erro ao contar artigos:', error);
    throw error;
  }
}

// Adicionar artigos faltantes ao Direito Trabalhista
async function addArtigosTrabalhistas() {
  const categories = await getCategories();
  const workCategory = categories.find(c => c.slug === 'direito-trabalhista');
  
  if (!workCategory) {
    console.error('Categoria de Direito Trabalhista não encontrada');
    return;
  }
  
  // Primeiro artigo: Férias trabalhistas
  const feriasArticle = {
    title: "Férias trabalhistas: Direitos, cálculos e como garantir seus benefícios",
    slug: "ferias-trabalhistas-direitos-calculos",
    excerpt: "Aprenda sobre seus direitos relacionados às férias, como calcular valores corretamente, e como proceder em casos de irregularidades por parte do empregador.",
    content: `
# Férias trabalhistas: Direitos, cálculos e como garantir seus benefícios

As férias são um direito fundamental de todo trabalhador brasileiro com vínculo empregatício, essencial para o descanso, lazer e recuperação física e mental. A Consolidação das Leis do Trabalho (CLT) e a Constituição Federal estabelecem regras específicas sobre a concessão, remuneração e outros aspectos relacionados às férias. Este artigo aborda em detalhes os direitos relacionados às férias trabalhistas, fornecendo informações práticas para todos os trabalhadores.

## Direito às férias: Aspectos fundamentais

Todo empregado tem direito a férias anuais remuneradas após completar um período de 12 meses de trabalho, denominado "período aquisitivo". As férias devem ser concedidas nos 12 meses subsequentes ao período aquisitivo, conhecido como "período concessivo".

### Duração das férias

A duração padrão das férias é de 30 dias corridos, mas pode ser reduzida conforme o número de faltas injustificadas durante o período aquisitivo:
- Até 5 faltas: 30 dias corridos
- De 6 a 14 faltas: 24 dias corridos
- De 15 a 23 faltas: 18 dias corridos
- De 24 a 32 faltas: 12 dias corridos
- Acima de 32 faltas: perda do direito às férias

### Fracionamento das férias

Após a Reforma Trabalhista de 2017, as férias podem ser fracionadas em até três períodos, com as seguintes condições:
- Um dos períodos deve ser de, no mínimo, 14 dias corridos
- Os demais períodos não podem ser inferiores a 5 dias corridos
- Deve haver concordância do empregado para o fracionamento

### Remuneração das férias

O salário das férias deve ser pago até dois dias antes do início do período de descanso e compreende:
- Salário normal do período (como se estivesse trabalhando)
- Acréscimo de 1/3 (terço constitucional)
- Média de comissões, horas extras e adicionais habituais dos últimos 12 meses

### Férias coletivas

As empresas podem conceder férias coletivas a todos os empregados ou a setores específicos, devendo comunicar com antecedência:
- Ao órgão local do Ministério do Trabalho (com 15 dias de antecedência)
- Aos sindicatos representativos da categoria profissional
- Aos próprios empregados, afixando avisos nos locais de trabalho

## Cálculo da remuneração de férias

O cálculo correto da remuneração de férias é fundamental para garantir que o trabalhador receba todos os valores devidos. Vamos entender como é feito esse cálculo.

### Salário fixo

Para empregados com salário fixo, o cálculo básico é:
1. Salário mensal ÷ 30 × número de dias de férias = Remuneração base
2. Remuneração base + 1/3 = Valor total das férias

**Exemplo**: Um trabalhador com salário de R$ 3.000,00, com direito a 30 dias de férias.
- Remuneração base: R$ 3.000,00
- Terço constitucional: R$ 3.000,00 × 1/3 = R$ 1.000,00
- Valor total das férias: R$ 3.000,00 + R$ 1.000,00 = R$ 4.000,00

### Salário variável (comissões, gorjetas, etc.)

Quando o salário incluir parcelas variáveis:
1. Calcular a média das parcelas variáveis dos últimos 12 meses
2. Adicionar essa média ao salário fixo para obter a remuneração base
3. Acrescentar 1/3 sobre o total

**Exemplo**: Um vendedor com salário fixo de R$ 1.500,00 que recebeu um total de R$ 12.000,00 em comissões nos últimos 12 meses.
- Média mensal de comissões: R$ 12.000,00 ÷ 12 = R$ 1.000,00
- Remuneração base: R$ 1.500,00 + R$ 1.000,00 = R$ 2.500,00
- Terço constitucional: R$ 2.500,00 × 1/3 = R$ 833,33
- Valor total das férias: R$ 2.500,00 + R$ 833,33 = R$ 3.333,33

### Horas extras e adicionais habituais

As horas extras e adicionais pagos com habitualidade devem ser incorporados à remuneração de férias:
1. Calcular a média dos valores recebidos nos últimos 12 meses
2. Incluir essa média no cálculo da remuneração base
3. Aplicar o adicional de 1/3 sobre o total

**Exemplo**: Um trabalhador com salário de R$ 2.000,00 que recebeu um total de R$ 6.000,00 em horas extras nos últimos 12 meses.
- Média mensal de horas extras: R$ 6.000,00 ÷ 12 = R$ 500,00
- Remuneração base: R$ 2.000,00 + R$ 500,00 = R$ 2.500,00
- Terço constitucional: R$ 2.500,00 × 1/3 = R$ 833,33
- Valor total das férias: R$ 2.500,00 + R$ 833,33 = R$ 3.333,33

<!-- ADSENSE -->
<div class="adsense-container">
  <p class="adsense-text">Publicidade</p>
  <div class="adsense-placeholder">
    <!-- Código Google AdSense será inserido aqui -->
  </div>
</div>
<!-- FIM ADSENSE -->

## Abono pecuniário (venda de férias)

O empregado pode optar por converter 1/3 de suas férias em abono pecuniário (venda de férias), desde que solicite ao empregador até 15 dias antes do término do período aquisitivo.

### Cálculo do abono pecuniário

1. Calcular o valor diário da remuneração: Remuneração mensal ÷ 30
2. Multiplicar pelo número de dias vendidos (até 10 dias)
3. Acrescentar 1/3 sobre esse valor

**Exemplo**: Um trabalhador com salário de R$ 3.000,00 que vende 10 dias de férias.
- Valor diário: R$ 3.000,00 ÷ 30 = R$ 100,00
- Valor base dos 10 dias: R$ 100,00 × 10 = R$ 1.000,00
- Terço constitucional sobre os dias vendidos: R$ 1.000,00 × 1/3 = R$ 333,33
- Valor total do abono: R$ 1.000,00 + R$ 333,33 = R$ 1.333,33

Neste caso, o trabalhador receberá:
- R$ 2.000,00 (salário dos 20 dias de férias que irá gozar)
- R$ 666,67 (terço constitucional sobre os 20 dias)
- R$ 1.333,33 (abono pecuniário pelos 10 dias vendidos)
- Total: R$ 4.000,00

## Situações especiais e dúvidas comuns

### Férias proporcionais

Quando o contrato de trabalho é rescindido antes de completar 12 meses, o empregado tem direito a férias proporcionais ao tempo de serviço, desde que não tenha sido dispensado por justa causa:
- O cálculo é feito na proporção de 1/12 por mês ou fração superior a 14 dias de trabalho
- O adicional de 1/3 também é aplicado sobre as férias proporcionais

### Férias em dobro

Se o empregador não conceder as férias dentro do período concessivo (os 12 meses seguintes ao período aquisitivo), deverá pagar as férias em dobro:
- O salário normal do período de férias
- Mais uma remuneração equivalente a título de indenização
- O terço constitucional incide apenas sobre o valor normal (não é duplicado)

### Férias durante aviso prévio

Durante o aviso prévio, seja trabalhado ou indenizado, o empregado continua adquirindo direito às férias proporcionais. Se o período aquisitivo se completar durante o aviso prévio, o empregado tem direito às férias completas.

### Férias após licença-maternidade

O período de licença-maternidade é considerado como tempo de serviço para todos os efeitos legais, não afetando o direito às férias. A empregada que retorna de licença-maternidade mantém seu período aquisitivo normal.

### Férias e afastamento por doença

Se o empregado ficar afastado por doença por mais de 6 meses, mesmo que descontínuos, durante o período aquisitivo, perderá o direito às férias daquele período. Quando retornar, iniciará um novo período aquisitivo.

## Como garantir seus direitos

Para garantir o gozo regular de suas férias e o recebimento correto dos valores devidos, o trabalhador deve:

### Documentação e controle

- Manter registros de datas de admissão e períodos aquisitivos
- Guardar recibos de pagamento de salários e de férias
- Solicitar a marcação de férias com antecedência, preferencialmente por escrito

### Em caso de irregularidades

Se o empregador não conceder as férias no prazo devido ou não pagar corretamente a remuneração, o empregado pode:

1. **Comunicação interna**: Inicialmente, comunicar ao departamento de recursos humanos ou superior hierárquico.

2. **Sindicato**: Buscar orientação e apoio do sindicato da categoria.

3. **Ministério do Trabalho**: Denunciar a situação na Superintendência Regional do Trabalho.

4. **Justiça do Trabalho**: Ajuizar reclamação trabalhista para garantir seus direitos.
   - O prazo prescricional para ações relacionadas às férias é de 5 anos, limitado a 2 anos após o término do contrato de trabalho.

### Direitos após a Reforma Trabalhista

A Reforma Trabalhista de 2017 trouxe algumas mudanças importantes relacionadas às férias:
- Possibilidade de fracionamento em até três períodos
- Vedação do início das férias nos dois dias que antecedem feriado ou dia de repouso semanal remunerado
- Trabalhadores a tempo parcial passaram a ter direito a 30 dias de férias, com possibilidade de venda de 1/3

## Aspectos psicológicos e importância das férias

As férias não representam apenas um direito trabalhista, mas são fundamentais para a saúde física e mental dos trabalhadores:

### Benefícios das férias

- **Redução do estresse**: Período de descanso que diminui os níveis de cortisol (hormônio do estresse)
- **Prevenção do burnout**: Ajuda a prevenir a síndrome de esgotamento profissional
- **Aumento da produtividade**: Trabalhadores retornam mais motivados e produtivos após as férias
- **Melhoria dos relacionamentos**: Tempo disponível para fortalecer laços familiares e sociais
- **Saúde física**: Redução de riscos cardiovasculares associados ao estresse crônico

### Planejamento das férias

Um planejamento adequado das férias contribui para melhor aproveitamento do período:
- Programação financeira antecipada
- Desconexão efetiva do trabalho (evitar e-mails e chamadas profissionais)
- Atividades que promovam bem-estar e relaxamento

## Considerações finais

As férias constituem um direito social garantido pela Constituição Federal e detalhado pela legislação trabalhista. Mais que um simples afastamento temporário do trabalho, representam um mecanismo de proteção à saúde do trabalhador e de manutenção de sua capacidade produtiva.

Conhecer em detalhes os direitos relacionados às férias, incluindo prazos, cálculos e procedimentos, permite que o trabalhador se proteja contra possíveis irregularidades e garanta o gozo pleno desse benefício essencial.

É importante ressaltar que, em caso de dúvidas específicas ou situações particulares não contempladas neste artigo, é recomendável buscar orientação jurídica especializada ou consultar o sindicato da categoria.
    `,
    imageUrl: "https://images.unsplash.com/photo-1570717173024-ec8081c8f8e9?auto=format&fit=crop&w=800&q=80",
    publishDate: "2025-01-18",
    categoryId: workCategory.id,
    featured: 0
  };
  
  // Segundo artigo: Acordo Trabalhista
  const acordoArticle = {
    title: "Acordo trabalhista: Vantagens, riscos e o que você precisa saber antes de assinar",
    slug: "acordo-trabalhista-vantagens-riscos",
    excerpt: "Entenda os prós e contras de fazer um acordo trabalhista, quais direitos podem ou não ser negociados e como garantir que seus interesses sejam protegidos durante o processo.",
    content: `
# Acordo trabalhista: Vantagens, riscos e o que você precisa saber antes de assinar

O acordo trabalhista é uma forma de resolução de conflitos entre empregado e empregador que pode ocorrer tanto durante a vigência do contrato de trabalho quanto após seu término. É uma alternativa à disputa judicial tradicional, possibilitando uma solução mais rápida e, muitas vezes, satisfatória para ambas as partes. No entanto, é fundamental conhecer seus direitos, limitações e implicações antes de optar por esta via. Este artigo aborda em profundidade os aspectos essenciais sobre acordos trabalhistas.

## O que é um acordo trabalhista?

Um acordo trabalhista é um ajuste consensual firmado entre trabalhador e empregador para resolver conflitos de natureza trabalhista. Ele pode ser realizado:

- **Extrajudicialmente**: quando firmado diretamente entre as partes, sem intermediação judicial.
- **Judicialmente**: quando celebrado no curso de um processo trabalhista, sendo homologado pelo juiz.

Independentemente da modalidade, o acordo tem como objetivo principal evitar ou encerrar litígios, estabelecendo condições que atendam, em alguma medida, aos interesses de ambas as partes.

## Modalidades de acordo trabalhista

### 1. Acordo extrajudicial

Após a Reforma Trabalhista de 2017, o acordo extrajudicial ganhou reconhecimento legal expresso na CLT, possibilitando sua homologação perante a Justiça do Trabalho. As características principais desta modalidade são:

- **Procedimento**: As partes, representadas por advogados distintos, apresentam petição conjunta à Justiça do Trabalho.
- **Análise judicial**: O juiz analisa o conteúdo e pode homologar o acordo total ou parcialmente, ou até recusá-lo.
- **Efeitos**: Uma vez homologado, adquire efeito de decisão judicial, com segurança jurídica para ambas as partes.
- **Restrições**: Não pode envolver direitos indisponíveis e deve respeitar a legislação trabalhista.

### 2. Acordo judicial

Realizado durante um processo trabalhista já em andamento, pode ocorrer em diferentes momentos:

- **Audiência inicial de conciliação**: Antes mesmo da apresentação da contestação pela empresa.
- **Audiência de instrução**: Após a coleta de provas, mas antes da sentença.
- **Fase recursal**: Mesmo após a sentença, enquanto o processo está em fase de recurso.
- **Fase de execução**: Quando já existe sentença definitiva, apenas para negociar formas de pagamento dos valores devidos.

### 3. Acordo na rescisão contratual

Ocorre no momento do desligamento do empregado, durante a homologação da rescisão:

- **Procedimento**: Realizado perante o sindicato da categoria ou Ministério do Trabalho.
- **Conteúdo**: Envolve pagamento das verbas rescisórias e eventuais disputas específicas.
- **Quitação**: Pode dar quitação apenas às parcelas e valores especificados no termo de rescisão.

## Requisitos de validade do acordo trabalhista

Para que um acordo trabalhista seja considerado válido e evite questionamentos futuros, é necessário observar os seguintes requisitos:

### Requisitos formais

- **Capacidade das partes**: Tanto empregado quanto empregador devem ter capacidade legal para firmar o acordo.
- **Objeto lícito**: O objeto do acordo deve ser lícito, possível e determinável.
- **Forma prescrita em lei**: Deve seguir as formalidades legais (escritura pública, quando exigido).
- **Assistência jurídica**: Nos acordos extrajudiciais, cada parte deve estar assistida por advogado distinto.

### Requisitos materiais

- **Consentimento livre e informado**: O empregado deve consentir livremente, sem coação ou erro.
- **Respeito aos direitos indisponíveis**: Direitos como registro em CTPS, FGTS, contribuições previdenciárias não podem ser objeto de renúncia.
- **Proporcionalidade e razoabilidade**: Os valores acordados devem guardar relação razoável com os direitos em disputa.

<!-- ADSENSE -->
<div class="adsense-container">
  <p class="adsense-text">Publicidade</p>
  <div class="adsense-placeholder">
    <!-- Código Google AdSense será inserido aqui -->
  </div>
</div>
<!-- FIM ADSENSE -->

## Vantagens do acordo trabalhista

O acordo trabalhista apresenta diversas vantagens para ambas as partes envolvidas:

### Para o trabalhador

- **Resolução rápida**: Recebimento mais célere dos valores, evitando anos de espera em processo judicial.
- **Certeza no recebimento**: Eliminação do risco de insolvência da empresa durante o processo.
- **Redução de custos**: Menores despesas com honorários advocatícios e custas processuais.
- **Menor desgaste emocional**: Evita o estresse prolongado de um litígio judicial.
- **Flexibilidade no pagamento**: Possibilidade de negociar formas de pagamento mais convenientes (parcelamento, pagamento à vista com desconto, etc.).

### Para a empresa

- **Redução de passivo trabalhista**: Encerramento definitivo do litígio, com previsibilidade de custos.
- **Economia processual**: Menores gastos com honorários advocatícios e custas judiciais.
- **Redução de provisões contábeis**: Impacto positivo nas demonstrações financeiras.
- **Preservação da imagem**: Menos exposição negativa em processos judiciais.
- **Flexibilidade no pagamento**: Possibilidade de parcelamento ou outras condições que facilitem o fluxo de caixa.

## Riscos e desvantagens do acordo trabalhista

Apesar das vantagens, existem riscos que devem ser ponderados:

### Para o trabalhador

- **Subvaloração de direitos**: Risco de aceitar valores inferiores aos devidos.
- **Quitação ampla**: Em alguns casos, o acordo pode dar quitação a direitos não especificados.
- **Parcelamento excessivo**: Acordos com muitas parcelas aumentam o risco de inadimplemento.
- **Renúncia involuntária**: Possibilidade de renunciar a direitos por desconhecimento.
- **Tributação**: Dependendo da estrutura do acordo, pode haver impacto fiscal desfavorável.

### Para a empresa

- **Efeito precedente**: Pode estimular outros empregados a buscar acordos semelhantes.
- **Questionamento futuro**: Risco de anulação judicial se não observados os requisitos de validade.
- **Custos imediatos**: Necessidade de desembolso financeiro a curto prazo.
- **Reconhecimento implícito**: O acordo pode ser interpretado como reconhecimento de práticas irregulares.

## Direitos que podem e não podem ser negociados

A legislação trabalhista brasileira distingue entre direitos disponíveis (negociáveis) e indisponíveis (não negociáveis):

### Direitos disponíveis (negociáveis)

- **Aviso prévio indenizado**
- **Férias proporcionais e vencidas**
- **Décimo terceiro salário proporcional**
- **Indenizações por danos morais ou materiais**
- **Horas extras e intervalos não usufruídos**
- **Adicional noturno, de insalubridade ou periculosidade**
- **Comissões e bonificações**

### Direitos indisponíveis (não negociáveis)

- **Registro em CTPS**
- **Recolhimento do FGTS**
- **Contribuições previdenciárias**
- **Normas de saúde e segurança do trabalho**
- **Salário mínimo proporcional à jornada**
- **Normas de proteção à maternidade**
- **Licenças obrigatórias (maternidade, paternidade, etc.)**

## Procedimentos para realização de acordo trabalhista

### Acordo extrajudicial (procedimento da CLT após a Reforma Trabalhista)

1. **Negociação prévia**: Partes negociam termos e condições do acordo.
2. **Assistência jurídica**: Cada parte constitui advogado próprio.
3. **Elaboração do termo de acordo**: Redação do documento com todas as condições.
4. **Petição conjunta**: Envio de petição à Justiça do Trabalho para homologação.
5. **Análise judicial**: O juiz analisa o acordo, podendo designar audiência para esclarecimentos.
6. **Homologação**: Sendo aprovado, o juiz homologa o acordo, dando-lhe força executiva.
7. **Cumprimento**: As partes cumprem o acordado conforme os termos estabelecidos.

### Acordo judicial (durante processo)

1. **Proposta de acordo**: Qualquer das partes pode propor o acordo em qualquer fase.
2. **Audiência de conciliação**: Discussão dos termos em audiência.
3. **Redação do termo**: O acordo é registrado em ata.
4. **Homologação**: O juiz homologa o acordo, verificando sua legalidade.
5. **Extinção com resolução de mérito**: O processo é extinto com base no art. 487, III, "b" do CPC.
6. **Cumprimento**: Execução dos termos conforme estabelecido.

## Aspectos fiscais e previdenciários do acordo trabalhista

Os acordos trabalhistas têm implicações fiscais e previdenciárias que devem ser consideradas:

### Contribuições previdenciárias

- **Obrigatoriedade**: Incide sobre parcelas de natureza salarial (remuneratória).
- **Isenção**: Não incide sobre parcelas indenizatórias.
- **Responsabilidade**: A empresa deve recolher a contribuição patronal e a parte do empregado.
- **Consequências do não recolhimento**: O juiz não pode homologar acordo sem previsão de recolhimento previdenciário sobre verbas salariais.

### Imposto de Renda

- **Incidência**: Aplicável sobre parcelas de natureza salarial.
- **Momento**: Retido na fonte no momento do pagamento.
- **Base de cálculo**: Varia conforme a natureza das verbas e o montante.
- **Parcelas isentas**: Algumas verbas são isentas, como indenização por rescisão de contrato e FGTS.

### Discriminação de parcelas no acordo

É fundamental a correta discriminação das parcelas no acordo, indicando:
- Quais são de natureza salarial (sujeitas a tributos)
- Quais são de natureza indenizatória (isentas)
- Quais os valores correspondentes a cada parcela

## Jurisprudência relevante sobre acordos trabalhistas

A jurisprudência trabalhista tem estabelecido alguns parâmetros importantes sobre acordos:

### Súmula 418 do TST
"A homologação de acordo constitui faculdade do juiz, inexistindo direito líquido e certo à homologação."

### Súmula 330 do TST
"A quitação passada pelo empregado, com assistência de entidade sindical de sua categoria, ao empregador, com observância dos requisitos exigidos nos parágrafos do art. 477 da CLT, tem eficácia liberatória em relação às parcelas expressamente consignadas no recibo, salvo se oposta ressalva expressa e especificada ao valor dado à parcela ou parcelas impugnadas."

### OJ 132 da SDI-2 do TST
"Acordo homologado judicialmente tem força de decisão irrecorrível, na forma do art. 831 da CLT. Assim sendo, a quitação passada pelo reclamante ao reclamado, com assistência de advogado, deve ser respeitada, conferindo ato jurídico perfeito ao termo conciliatório."

## Questões práticas e conselhos

### Para trabalhadores

- **Consulte um advogado especializado**: Antes de aceitar qualquer proposta de acordo.
- **Verifique os cálculos**: Certifique-se de que os valores propostos são justos.
- **Atenção à redação**: Observe como está redigida a cláusula de quitação.
- **Considere os riscos**: Avalie as chances de sucesso em um processo judicial versus a proposta de acordo.
- **Verifique a solidez da empresa**: Certifique-se de que a empresa terá condições de cumprir o acordo.

### Para empresas

- **Política de acordos**: Estabeleça critérios consistentes para propostas de acordo.
- **Provisionamento adequado**: Mantenha provisões contábeis realistas para contingências trabalhistas.
- **Documentação de suporte**: Reúna documentos que embasem sua posição na negociação.
- **Análise jurídica prévia**: Avalie os riscos judiciais antes de propor valores.
- **Cuidado com precedentes**: Considere o impacto do acordo em casos similares.

## Tendências e mudanças recentes

O cenário dos acordos trabalhistas tem passado por transformações importantes:

### Impactos da Reforma Trabalhista de 2017

- **Procedimento específico**: Criação de procedimento próprio para homologação de acordo extrajudicial.
- **Quitação geral**: Possibilidade de quitação geral do contrato de trabalho em alguns casos.
- **Maior flexibilidade**: Ampliação das matérias passíveis de negociação direta.

### Acordos coletivos e a prevalência sobre a lei

A Reforma também estabeleceu que acordos coletivos podem prevalecer sobre a legislação em diversos temas, impactando indiretamente os acordos individuais.

### Mediação e conciliação pré-processual

Os Centros Judiciários de Solução de Conflitos (CEJUSCs) trabalhistas têm sido criados para estimular conciliações pré-processuais, oferecendo nova via para acordos.

## Considerações finais

O acordo trabalhista, quando bem conduzido, representa um instrumento legítimo e eficiente para resolução de conflitos laborais. No entanto, sua celebração deve ser precedida de análise criteriosa e assistência jurídica adequada, garantindo que os direitos fundamentais do trabalhador sejam respeitados e que a empresa obtenha a segurança jurídica desejada.

A opção pelo acordo não deve ser vista como uma concessão unilateral, mas como uma solução negociada em que ambas as partes fazem concessões recíprocas para obter vantagens que compensem essas concessões. O conhecimento profundo da legislação, da jurisprudência e dos direitos envolvidos é fundamental para que o acordo represente uma verdadeira composição justa do conflito.
    `,
    imageUrl: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=800&q=80",
    publishDate: "2025-02-22",
    categoryId: workCategory.id,
    featured: 0
  };
  
  await addArticle(feriasArticle);
  await addArticle(acordoArticle);
  console.log("Artigos de Direito Trabalhista adicionados com sucesso!");
}

// Adicionar artigos faltantes ao Direito Médico
async function addArtigosMedicos() {
  const categories = await getCategories();
  const medicoCategory = categories.find(c => c.slug === 'direito-medico');
  
  if (!medicoCategory) {
    console.error('Categoria de Direito Médico não encontrada');
    return;
  }
  
  // Primeiro artigo: Prontuário Médico
  const prontuarioArticle = {
    title: "Prontuário médico: Acesso, sigilo e direitos do paciente",
    slug: "prontuario-medico-acesso-sigilo-direitos",
    excerpt: "Entenda seus direitos relacionados ao prontuário médico, como obter uma cópia, quem pode ter acesso e o que fazer em caso de negativa ou informações incorretas.",
    content: `
# Prontuário médico: Acesso, sigilo e direitos do paciente

O prontuário médico é um documento essencial na relação entre profissionais de saúde e pacientes, contendo informações confidenciais sobre o histórico de saúde, tratamentos realizados, medicações prescritas e evolução clínica. Apesar de sua importância fundamental, muitos pacientes desconhecem seus direitos relativos ao acesso, sigilo e propriedade das informações ali contidas. Este artigo explora os aspectos jurídicos do prontuário médico, esclarecendo direitos e procedimentos para garantir que todos possam exercer plenamente sua autonomia informacional na área da saúde.

## O que é prontuário médico e sua importância legal

O prontuário médico é um documento único, constituído por um conjunto de informações, sinais e imagens registradas a partir de fatos, acontecimentos e situações sobre a saúde do paciente e a assistência prestada a ele. Sua elaboração é obrigatória para todos os profissionais e instituições de saúde.

### Definição jurídica

De acordo com a Resolução CFM nº 1.638/2002 do Conselho Federal de Medicina, o prontuário médico é um "documento único, constituído de um conjunto de informações, sinais e imagens registradas, geradas a partir de fatos, acontecimentos e situações sobre a saúde do paciente e a assistência a ele prestada, de caráter legal, sigiloso e científico, que possibilita a comunicação entre membros da equipe multiprofissional e a continuidade da assistência prestada ao indivíduo".

### Conteúdo obrigatório

O prontuário deve conter:
- Identificação do paciente (nome, data de nascimento, sexo, etc.)
- História clínica completa
- Exame físico
- Hipóteses diagnósticas
- Diagnóstico definitivo
- Tratamentos efetuados
- Evolução diária
- Relatórios de enfermagem e outros profissionais
- Exames complementares
- Identificação dos profissionais que prestaram o atendimento

### Relevância jurídica

O prontuário possui múltiplas finalidades jurídicas:
- **Prova em processos judiciais**: Elemento fundamental em casos de erro médico e responsabilidade civil
- **Documento fiscal**: Sujeito a fiscalização por órgãos reguladores e planos de saúde
- **Instrumento de pesquisa**: Base para estudos clínicos, sempre respeitando o anonimato
- **Avaliação de qualidade**: Permite auditoria da assistência prestada

## Legislação aplicável aos prontuários médicos

O arcabouço legal que regula os prontuários médicos no Brasil é composto por diversas normas:

### Legislação federal

- **Código Civil (Lei 10.406/2002)**: Estabelece normas gerais sobre documentos e privacidade
- **Código de Defesa do Consumidor (Lei 8.078/1990)**: Garante direito à informação e proteção de dados do consumidor
- **Lei do Acesso à Informação (Lei 12.527/2011)**: Regula o acesso a informações mantidas por órgãos públicos
- **Lei Geral de Proteção de Dados - LGPD (Lei 13.709/2018)**: Regula o tratamento de dados pessoais sensíveis, incluindo informações de saúde
- **Estatuto da Criança e do Adolescente (Lei 8.069/1990)**: Versa sobre o sigilo de informações médicas de menores
- **Estatuto do Idoso (Lei 10.741/2003)**: Garante ao idoso o direito ao acesso às suas informações de saúde

### Resoluções do Conselho Federal de Medicina (CFM)

- **Resolução CFM nº 1.638/2002**: Define prontuário médico e torna obrigatória sua elaboração
- **Resolução CFM nº 1.821/2007**: Estabelece normas para digitalização e uso de sistemas informatizados
- **Resolução CFM nº 2.217/2018 (Código de Ética Médica)**: Dispõe sobre sigilo profissional e registros médicos

### Outras normativas relevantes

- **Resolução nº 553/2017 do Conselho Nacional de Saúde**: Carta dos Direitos e Deveres dos Usuários da Saúde
- **Portaria nº 1.820/2009 do Ministério da Saúde**: Direitos e deveres dos usuários da saúde, incluindo acesso ao prontuário

## Direito de acesso ao prontuário pelo paciente

Um dos aspectos mais importantes relacionados ao prontuário médico é o direito do paciente de acessar suas próprias informações médicas.

### Fundamento legal do acesso

O direito de acesso ao prontuário pelo paciente está fundamentado em diversos dispositivos legais:
- Art. 5º, inciso XXXIV da Constituição Federal (direito de petição e obtenção de certidões)
- Art. 43 do Código de Defesa do Consumidor (acesso a dados pessoais)
- Art. 88 da Resolução CFM nº 2.217/2018 (proibição de negar ao paciente acesso ao seu prontuário)

### Como solicitar uma cópia

O procedimento para solicitar cópia do prontuário inclui:
1. **Requerimento formal**: Solicitação por escrito diretamente à instituição de saúde
2. **Identificação**: Apresentação de documento de identidade do paciente
3. **Custos**: Pode ser cobrado apenas o custo da reprodução (cópias, digitalização)
4. **Prazos**: A entrega deve ocorrer em prazo razoável (geralmente até 15 dias)

### Em caso de pacientes falecidos

O acesso ao prontuário de paciente falecido é regulado de forma específica:
- Somente representantes legais ou familiares com comprovação de parentesco podem solicitar
- É necessário apresentar certidão de óbito e documentos que comprovem o vínculo
- Algumas informações podem ser resguardadas em caso de disposição expressa do falecido antes da morte

### Prontuários eletrônicos

Com a crescente digitalização dos serviços de saúde, os prontuários eletrônicos têm regras específicas:
- Devem garantir a integridade, autenticidade e confidencialidade das informações
- Necessitam de certificação digital para validar os registros
- Devem possibilitar auditoria e rastreabilidade dos acessos
- O direito de acesso do paciente permanece o mesmo que em prontuários físicos

<!-- ADSENSE -->
<div class="adsense-container">
  <p class="adsense-text">Publicidade</p>
  <div class="adsense-placeholder">
    <!-- Código Google AdSense será inserido aqui -->
  </div>
</div>
<!-- FIM ADSENSE -->

## Sigilo das informações e confidencialidade

O sigilo é um dos pilares da relação médico-paciente e está fortemente protegido pelo ordenamento jurídico brasileiro.

### Dever de sigilo profissional

O sigilo médico é uma obrigação legal e ética dos profissionais de saúde:
- Art. 154 do Código Penal: Criminaliza a violação de segredo profissional
- Arts. 73 a 79 do Código de Ética Médica: Estabelecem as regras de sigilo profissional

### Exceções ao sigilo médico

Existem situações específicas onde o sigilo pode ou deve ser quebrado:
- **Dever legal**: Notificação compulsória de doenças, comunicação de crimes
- **Justa causa**: Risco à vida do paciente ou terceiros
- **Autorização do paciente**: Consentimento expresso para revelação da informação
- **Determinação judicial**: Ordem expressa de autoridade judiciária competente

### Compartilhamento entre profissionais

O compartilhamento de informações do prontuário entre profissionais que atuam no caso:
- É permitido para profissionais diretamente envolvidos no atendimento
- Deve ser limitado ao necessário para o tratamento adequado
- Permanece sujeito ao dever de sigilo por todos os envolvidos

### Consequências da violação do sigilo

A quebra indevida de sigilo pode acarretar múltiplas sanções:
- **Responsabilidade civil**: Obrigação de indenizar por danos morais e materiais
- **Responsabilidade penal**: Crime de violação de segredo profissional (Art. 154 do Código Penal)
- **Responsabilidade administrativa**: Sanções disciplinares pelo Conselho de Medicina
- **Responsabilidade contratual**: Quebra de contrato de trabalho ou prestação de serviços

## Tempo de guarda e conservação do prontuário

Um aspecto frequentemente questionado diz respeito ao período pelo qual os prontuários devem ser mantidos pelas instituições de saúde.

### Prazos legais de conservação

Os prontuários devem ser conservados por prazos específicos:
- **Regra geral**: Mínimo de 20 anos a partir do último registro, conforme Resolução CFM nº 1.821/2007
- **Prontuários eletrônicos certificados**: Podem ser preservados permanentemente em meio eletrônico
- **Prontuários de interesse histórico**: Podem ser preservados permanentemente

### Responsabilidade pela guarda

A responsabilidade pela correta conservação dos prontuários é:
- Da instituição de saúde (hospital, clínica, etc.) em atendimentos institucionais
- Do médico, em caso de atendimento em consultório particular
- Do sucessor ou responsável pela guarda, em caso de encerramento de atividades

### Descarte adequado

Após o período obrigatório de conservação, o descarte deve:
- Preservar o sigilo das informações contidas
- Seguir protocolos específicos de destruição segura
- Ser documentado para fins de comprovação

### Digitalização e microfilmagem

A conversão de prontuários físicos para meio digital deve:
- Seguir os requisitos técnicos do Conselho Federal de Medicina
- Garantir a autenticidade e integridade das informações
- Utilizar certificação digital no padrão ICP-Brasil
- Permitir a impressão quando necessário

## Aspectos específicos de grupos vulneráveis

Existem regras especiais para prontuários de pacientes em situações particulares de vulnerabilidade.

### Crianças e adolescentes

Os prontuários de menores de idade têm particularidades:
- Acesso pelos pais ou responsáveis legais é garantido para menores de 18 anos
- Adolescentes têm direito a confidencialidade em alguns aspectos (ex.: saúde sexual e reprodutiva)
- Em caso de conflito de interesses, prevalece o melhor interesse do menor

### Pacientes com transtornos mentais

Para pessoas com transtornos mentais:
- O acesso ao prontuário pode ser feito pelo representante legal ou curador
- Deve-se respeitar a capacidade de discernimento do paciente
- A informação deve ser adaptada à condição do paciente quando possível

### Idosos

No caso de pacientes idosos:
- O Estatuto do Idoso reforça o direito ao acesso às informações de saúde
- Familiares só podem acessar o prontuário com autorização expressa ou representação legal
- Deve-se preservar a autonomia do idoso sempre que possível

## Uso do prontuário em processos judiciais

O prontuário médico é frequentemente utilizado como prova em processos judiciais.

### Como prova em processos de erro médico

Em ações de responsabilidade civil médica:
- O prontuário é considerado prova documental fundamental
- Omissões e rasuras podem ser interpretadas desfavoravelmente ao profissional
- A qualidade do registro pode ser determinante para demonstrar a adequação da conduta

### Requisição judicial

Quando requisitado pela Justiça:
- O médico ou instituição é obrigado a fornecer o prontuário
- A requisição deve ser específica e fundamentada
- O sigilo judicial deve ser mantido para preservar a privacidade do paciente

### Perícia sobre prontuário

Em muitos casos, é necessária perícia técnica:
- O perito judicial analisa os registros para esclarecer questões técnicas
- A completude e legibilidade do prontuário são fatores avaliados
- Contradições e incongruências são identificadas e analisadas

### Valor probatório

O peso do prontuário como prova depende de:
- Completude dos registros
- Contemporaneidade das anotações
- Ausência de rasuras ou alterações posteriores
- Coerência interna dos registros

## Problemas comuns e como resolvê-los

Pacientes frequentemente encontram dificuldades no acesso e manejo de seus prontuários médicos.

### Negativa de acesso ao prontuário

Em caso de recusa em fornecer cópia do prontuário:
1. **Formalizar o pedido**: Solicitação por escrito com protocolo
2. **Reclamação administrativa**: Junto à ouvidoria da instituição
3. **Denúncia ao Conselho de Medicina**: Regional da localidade da instituição
4. **Reclamação ao Procon**: Com base no Código de Defesa do Consumidor
5. **Ação judicial**: Mandado de segurança ou ação de obrigação de fazer

### Prontuário incompleto ou com informações incorretas

Quando há erros ou omissões:
1. **Solicitar retificação**: Pedido formal à instituição de saúde
2. **Documentar a divergência**: Reunir provas da informação correta
3. **Solicitação de adendo**: Requerer inclusão de informação complementar
4. **Medidas judiciais**: Em casos de recusa da retificação necessária

### Alterações indevidas no prontuário

Em caso de suspeita de adulteração:
1. **Perícia técnica**: Solicitar análise especializada
2. **Denúncia ao Conselho de Medicina**: Prática antiética grave
3. **Boletim de ocorrência**: Por se tratar de possível crime de falsidade ideológica
4. **Ação judicial**: Buscar reparação por danos e responsabilização

### Extravio de prontuário

Quando a instituição alega perda:
1. **Notificação formal**: Documentar a comunicação da perda
2. **Reconstrução possível**: Solicitar reunião de outros documentos médicos
3. **Responsabilização**: A perda pode gerar presunção de falha contra a instituição
4. **Ação de reparação**: Em caso de prejuízos decorrentes do extravio

## A LGPD e seu impacto nos prontuários médicos

A Lei Geral de Proteção de Dados trouxe novas perspectivas sobre o tratamento de dados de saúde.

### Dados de saúde como dados sensíveis

A LGPD classifica informações de saúde como dados sensíveis:
- Sujeitos a proteção especial e reforçada
- Com bases legais específicas para tratamento
- Com requisitos adicionais de segurança

### Consentimento e outras bases legais

O tratamento de dados de saúde pode ocorrer:
- Com consentimento específico e destacado do titular
- Para cumprimento de obrigação legal ou regulatória
- Para tutela da saúde, em procedimento realizado por profissionais da área
- Para estudos por órgão de pesquisa, garantido o anonimato

### Direitos do titular sob a LGPD

O paciente tem direitos específicos:
- Acesso facilitado às informações sobre o tratamento
- Correção de dados incompletos ou inexatos
- Portabilidade dos dados a outro fornecedor de serviço
- Revogação do consentimento, quando aplicável

### Medidas de segurança exigidas

As instituições devem implementar:
- Controles de acesso lógico aos sistemas
- Registro de acesso (logs) a dados sensíveis
- Políticas de backup e recuperação
- Criptografia para dados em trânsito e armazenados
- Plano de resposta a incidentes

## Tendências e perspectivas futuras

O campo dos prontuários médicos continua em evolução, com novas tecnologias e abordagens.

### Interoperabilidade entre sistemas

A tendência de integração inclui:
- Padrões nacionais para troca de informações (ex.: TISS/TUSS da ANS)
- Registros Eletrônicos de Saúde (RES) nacionais
- Portais de acesso unificado para o cidadão

### Blockchain e novas tecnologias

Tecnologias emergentes prometem:
- Maior segurança e imutabilidade dos registros
- Controle granular de acesso pelo próprio paciente
- Auditabilidade completa de todas as interações

### Políticas públicas em desenvolvimento

Iniciativas governamentais incluem:
- Conecte SUS: Plataforma de acesso do cidadão a seus dados de saúde
- Estratégia de Saúde Digital para o Brasil (ESD)
- Regulamentações específicas da LGPD para o setor de saúde

## Considerações finais

O prontuário médico, além de instrumento clínico essencial, representa um importante documento jurídico que materializa o direito à informação e à autodeterminação informativa do paciente. Conhecer os direitos relacionados ao acesso, sigilo e correção das informações contidas nesse documento é fundamental para o exercício pleno da cidadania em saúde.

Os desafios relacionados à digitalização, interoperabilidade e proteção de dados sensíveis continuarão a moldar a evolução dos prontuários médicos, exigindo constante atualização por parte de profissionais, instituições e pacientes. O equilíbrio entre acessibilidade, segurança e utilidade clínica permanece como objetivo central nesse campo em transformação.

Para garantir seus direitos relacionados ao prontuário médico, é importante manter-se informado sobre a legislação vigente e buscar orientação jurídica especializada quando necessário, assegurando que esse importante documento cumpra sua função de promover cuidados de saúde seguros, eficazes e centrados no paciente.
    `,
    imageUrl: "https://images.unsplash.com/photo-1602667565484-47581a73947e?auto=format&fit=crop&w=800&q=80",
    publishDate: "2025-02-10",
    categoryId: medicoCategory.id,
    featured: 0
  };
  
  // Segundo artigo: Responsabilidade Civil Médica
  const responsabilidadeArticle = {
    title: "Responsabilidade civil médica: Quando e como processar por erro médico",
    slug: "responsabilidade-civil-medica-erro-medico",
    excerpt: "Entenda os fundamentos jurídicos da responsabilidade médica, como identificar um erro médico indenizável e quais os passos necessários para buscar reparação na Justiça.",
    content: `
# Responsabilidade civil médica: Quando e como processar por erro médico

A responsabilidade civil médica é um tema de grande relevância social e jurídica, situando-se no ponto de interseção entre o Direito e a Medicina. Erros médicos podem ter consequências devastadoras para pacientes e familiares, resultando em danos físicos, psicológicos e até mesmo fatais. Ao mesmo tempo, a natureza da atividade médica, lidando com a imprevisibilidade do organismo humano e os riscos inerentes aos procedimentos, torna esse um campo particularmente complexo do Direito. Este artigo aborda os fundamentos jurídicos, requisitos e procedimentos para a responsabilização civil por erros médicos no Brasil.

## Fundamentos jurídicos da responsabilidade civil médica

A responsabilidade civil médica é regulada por um conjunto de normas constitucionais, legais e infralegais que estabelecem seus fundamentos e parâmetros.

### Base constitucional e legal

A responsabilidade civil médica encontra fundamento em diversos dispositivos:

- **Constituição Federal**: Art. 5º, X (proteção à intimidade, vida privada, honra e imagem) e Art. 196 (direito à saúde)
- **Código Civil**: Art. 186 (ato ilícito) e Art. 927 (obrigação de reparar o dano)
- **Código de Defesa do Consumidor**: Arts. 14 e 951 (responsabilidade do fornecedor de serviços)
- **Código de Ética Médica**: Estabelece deveres profissionais cuja violação pode configurar culpa

### Natureza jurídica da responsabilidade médica

A responsabilidade civil médica possui características específicas:

- **Responsabilidade subjetiva**: Depende da comprovação de culpa do profissional (negligência, imprudência ou imperícia)
- **Obrigação de meio**: O médico não se compromete com a cura ou resultado específico, mas com o emprego diligente dos meios adequados
- **Responsabilidade contratual**: Geralmente decorre de contrato (expresso ou tácito) entre médico e paciente

### Exceções à obrigação de meio

Em alguns casos específicos, a obrigação médica é considerada de resultado:
- Cirurgia estética puramente embelezadora
- Exames laboratoriais
- Radiologia
- Vasectomia e laqueadura tubária
- Implantação de próteses dentárias

Nestes casos, há inversão do ônus da prova, cabendo ao médico demonstrar que o resultado adverso decorreu de causa alheia à sua atuação.

## Erro médico: Conceito e tipos

Compreender o que constitui um erro médico é fundamental para avaliar a viabilidade de uma ação de responsabilidade civil.

### Definição jurídica de erro médico

Erro médico é a conduta profissional inadequada que supõe uma inobservância técnica, capaz de produzir dano à vida ou agravo à saúde de outrem, mediante imperícia, imprudência ou negligência.

### Modalidades de culpa médica

O erro médico culposo pode ser classificado em:

- **Negligência**: Omissão, falta de cuidado ou atenção (ex.: não solicitar exames necessários, abandonar paciente)
- **Imprudência**: Ação precipitada ou sem cautela adequada (ex.: realizar procedimento sem equipamentos adequados)
- **Imperícia**: Falta de habilidade técnica ou conhecimento (ex.: desconhecimento de técnica básica da especialidade)

### Erro de diagnóstico

O erro de diagnóstico é uma das formas mais comuns de erro médico e pode ser:
- **Escusável**: Quando decorre de limitações da medicina ou peculiaridades do caso
- **Inescusável**: Quando o médico deixa de usar meios disponíveis e adequados para o correto diagnóstico

### Erro de tratamento

Ocorre quando há:
- Escolha de terapêutica inadequada
- Execução incorreta de tratamento adequadamente escolhido
- Falta de acompanhamento adequado
- Uso de medicamentos contraindicados

### Erro de comunicação

Relaciona-se ao dever de informação do médico:
- Falha em obter consentimento informado
- Omissão de informações sobre riscos e alternativas
- Linguagem inacessível ao paciente
- Falsas garantias de resultado

<!-- ADSENSE -->
<div class="adsense-container">
  <p class="adsense-text">Publicidade</p>
  <div class="adsense-placeholder">
    <!-- Código Google AdSense será inserido aqui -->
  </div>
</div>
<!-- FIM ADSENSE -->

## Requisitos para a configuração da responsabilidade civil médica

Para que haja o dever de indenizar, é necessário que estejam presentes certos requisitos essenciais.

### Conduta culposa

A responsabilidade médica é subjetiva, exigindo comprovação de culpa:
- Negligência, imprudência ou imperícia
- Violação de normas técnicas ou protocolos médicos
- Descumprimento de deveres previstos no Código de Ética Médica

### Dano efetivo

É necessário comprovar a existência de dano concreto:
- **Dano material**: Despesas médicas adicionais, perda da capacidade laboral, lucros cessantes
- **Dano moral**: Sofrimento, angústia, abalo psicológico
- **Dano estético**: Lesões que alteram a aparência física

### Nexo causal

O elemento mais complexo de comprovar, exige demonstração da relação entre a conduta médica e o dano:
- Deve haver relação direta e imediata entre a ação/omissão e o resultado danoso
- Exclui-se a responsabilidade quando o dano decorrer de causa diversa

### Ausência de excludentes de responsabilidade

A responsabilidade pode ser afastada em caso de:
- **Caso fortuito ou força maior**: Eventos imprevisíveis ou inevitáveis
- **Culpa exclusiva da vítima**: Quando o paciente desrespeita prescrições ou orientações
- **Fato de terceiro**: Dano causado por intervenção de terceira pessoa
- **Estado de necessidade**: Situações emergenciais que justificam risco assumido
- **Iatrogenia**: Dano previsível e inevitável, inerente ao procedimento, desde que o paciente tenha sido devidamente informado

## Responsabilidade de hospitais e clínicas

As instituições de saúde possuem regime jurídico específico de responsabilidade.

### Responsabilidade objetiva dos hospitais

Hospitais, clínicas e planos de saúde respondem objetivamente:
- Independe de culpa da instituição
- Baseada na teoria do risco da atividade
- Fundamentação: Art. 14 do CDC e Art. 932, III, do Código Civil (responsabilidade do empregador)

### Falhas estruturais e organizacionais

Incluem situações como:
- Infecção hospitalar (presunção relativa de responsabilidade)
- Falhas em equipamentos médicos
- Medicação incorreta fornecida pela instituição
- Prontuários mal organizados ou extraviados
- Ausência de equipe adequada ou completa

### Responsabilidade por atos de prepostos

O hospital responde pelos atos de:
- Enfermeiros, técnicos e auxiliares
- Médicos empregados (vínculo empregatício)
- Equipe terceirizada em alguns casos

### Médicos como profissionais autônomos

Quando o médico atua como profissional autônomo (sem vínculo empregatício):
- Hospital responde apenas por falhas estruturais
- Médico responde pessoalmente por seus atos técnicos
- Exceção: aparência de vínculo (quando hospital indica o profissional)

## Danos indenizáveis e valoração

A responsabilidade civil médica pode gerar diferentes tipos de indenização.

### Danos materiais

Abrangem:
- **Danos emergentes**: Despesas efetivamente realizadas (tratamentos adicionais, medicamentos, transporte)
- **Lucros cessantes**: O que a vítima deixou de ganhar (incapacidade temporária ou permanente para o trabalho)
- **Pensionamento**: Em caso de redução da capacidade laboral ou morte

### Danos morais

Relacionados ao sofrimento psíquico e violação de direitos da personalidade:
- Dor, sofrimento, angústia
- Violação da dignidade, privacidade ou autonomia
- Trauma psicológico

### Danos estéticos

Referem-se a alterações permanentes na aparência física:
- Cicatrizes
- Deformidades
- Assimetrias
- Amputações

### Critérios de quantificação da indenização

Os tribunais consideram diversos fatores:
- Gravidade do dano
- Grau de culpa do profissional
- Condições socioeconômicas das partes
- Possibilidade de recuperação
- Razoabilidade e proporcionalidade
- Caráter compensatório e punitivo
- Não enriquecimento sem causa

## Prova do erro médico

A prova é o elemento central e mais desafiador nas ações de responsabilidade médica.

### Ônus da prova

Como regra geral:
- Cabe ao paciente (autor) provar os fatos constitutivos de seu direito
- Inversão do ônus da prova possível em certos casos (CDC art. 6º, VIII)
- Teoria da distribuição dinâmica do ônus da prova (CPC art. 373, §1º)

### Perícia médica

Principal meio de prova nestas ações:
- Realizada por perito nomeado pelo juízo
- Assistentes técnicos podem acompanhar (nomeados pelas partes)
- Quesitos elaborados pelas partes e pelo juízo
- Possibilidade de esclarecimentos e impugnação

### Prontuário médico

Documento fundamental:
- Prova contemporânea aos fatos
- Obrigação legal de registro adequado
- Presunção relativa de veracidade
- Rasuras e omissões podem ser interpretadas desfavoravelmente ao médico

### Outras provas relevantes

Além da perícia e prontuário:
- Depoimento pessoal das partes
- Testemunhas (outros profissionais, acompanhantes)
- Exames e laudos complementares
- Gravações, fotografias ou vídeos (quando legalmente obtidos)
- Literatura médica sobre o tema
- Termo de consentimento informado

## Prazos para ajuizamento da ação

É fundamental observar os prazos prescricionais para evitar a perda do direito de ação.

### Prescrição na responsabilidade civil médica

O prazo para ajuizamento da ação é:
- 5 anos para ações contra profissionais liberais (Art. 27 do CDC)
- 3 anos para ações fundadas apenas no Código Civil (Art. 206, §3º, V)
- Divergência jurisprudencial sobre qual prazo aplicar (predomina o entendimento pelo prazo de 5 anos do CDC)

### Marco inicial da contagem

O prazo começa a correr:
- A partir da ciência do dano e sua extensão
- No caso de tratamentos continuados, a partir do encerramento
- Em caso de invalidez permanente, da data em que se tornou definitiva

### Causas de suspensão e interrupção

Os prazos podem ser suspensos ou interrompidos:
- Menoridade (prazo só começa a correr com a maioridade)
- Apresentação de reclamação administrativa
- Ajuizamento de ação judicial (mesmo que extinta sem resolução de mérito)
- Demais hipóteses legais (arts. 197 a 204 do Código Civil)

## Procedimentos para buscar reparação

O caminho para buscar reparação por erro médico envolve várias etapas.

### Medidas preliminares recomendadas

Antes de ingressar com ação judicial:
1. **Obter cópia do prontuário médico**: Direito garantido por lei
2. **Consultar outro profissional**: Segunda opinião médica sobre o caso
3. **Reunir documentação**: Exames, receitas, comprovantes de despesas
4. **Reportar ao Conselho de Medicina**: Possibilidade de apuração ética
5. **Tentativa de solução extrajudicial**: Mediação ou negociação direta

### Escolha do tipo de ação

Diferentes vias processuais são possíveis:
- **Ação civil ordinária**: Para buscar reparação de danos
- **Tutela antecipada**: Para garantir tratamento urgente
- **Produção antecipada de provas**: Para preservar evidências
- **Ação criminal**: Em casos de lesão corporal culposa ou homicídio culposo (independente da ação civil)

### Legitimidade para propor a ação

Podem ingressar com a ação:
- A própria vítima (paciente)
- Representantes legais (em caso de incapacidade)
- Herdeiros e dependentes (em caso de morte)
- Ministério Público (em casos específicos)

### Competência judicial

A ação deve ser proposta:
- No domicílio do réu (médico ou hospital)
- No local do ato ou fato (onde ocorreu o erro)
- No domicílio do autor (com base no CDC)
- Justiça Estadual (regra geral)
- Justiça Federal (quando envolver hospital público federal)

## Jurisprudência relevante sobre erro médico

Os tribunais brasileiros têm consolidado entendimentos importantes sobre responsabilidade médica.

### Súmulas e teses relevantes

- **STJ - Súmula 387**: "É lícita a cumulação das indenizações de dano estético e dano moral."
- **STJ - REsp 1.180.815/MG**: Estabelece distinção entre obrigação de meio e de resultado
- **STF - RE 1.131.073**: Responsabilidade objetiva de hospitais públicos

### Tendências jurisprudenciais recentes

- Ampliação dos casos de obrigação de resultado
- Aplicação da teoria da perda de uma chance médica
- Maior ênfase no consentimento informado
- Valorização do prontuário como prova
- Inversão do ônus da prova em favor do paciente

### Valoração e quantificação dos danos

- Estabelecimento de parâmetros para valoração do dano moral
- Tendência à fixação de pensionamento em caso de sequelas permanentes
- Reconhecimento da cumulação entre danos morais, materiais e estéticos

### Responsabilidade de equipes médicas

- Solidariedade entre membros da equipe com a mesma especialidade
- Responsabilidade individualizada conforme atribuições específicas
- Chefe de equipe responde por falhas na coordenação

## Prevenção de erros médicos e alternativas à judicialização

Existem medidas preventivas e alternativas à via judicial.

### Importância do consentimento informado

Como mecanismo de prevenção:
- Deve ser claro, acessível e específico
- Informar riscos, benefícios e alternativas
- Não exime de responsabilidade por erro, mas reduz litígios

### Comunicação médico-paciente

A boa comunicação é fundamental:
- Linguagem acessível e adequada
- Esclarecimento de dúvidas
- Disponibilidade para contato
- Registro adequado das orientações

### Mediação e conciliação

Alternativas que têm ganhado espaço:
- Câmaras de mediação especializadas em saúde
- Conciliação pré-processual
- Negociação assistida por advogados

### Comitês de análise de eventos adversos

Iniciativas institucionais:
- Análise sistemática de casos sem atribuição de culpa individual
- Foco na melhoria de processos
- Identificação de fatores estruturais de risco

## Tendências e perspectivas futuras

O campo da responsabilidade médica continua em evolução.

### Impacto da telemedicina

Novos desafios jurídicos:
- Determinação da jurisdição aplicável
- Compartilhamento de responsabilidade entre profissionais
- Segurança e privacidade de dados
- Consentimento informado em ambiente virtual

### Inteligência artificial e responsabilidade

Questões emergentes:
- Responsabilidade por decisões baseadas em IA
- Compartilhamento de responsabilidade entre médico e desenvolvedor
- Necessidade de transparência algorítmica
- Seguros específicos para riscos tecnológicos

### Medicina defensiva e seus efeitos

Práticas adotadas para reduzir risco jurídico:
- Exames e procedimentos excessivos
- Recusa de casos complexos
- Documentação exaustiva
- Impacto nos custos da saúde

### Tendência à resolução extrajudicial

Movimentos recentes:
- Estímulo à mediação especializada
- Seguros de responsabilidade civil com cobertura para acordos
- Plataformas online de resolução de disputas
- Protocolos institucionais de disclosure e oferta precoce

## Considerações finais

A responsabilidade civil médica representa um campo complexo onde se equilibram diversos valores: de um lado, a proteção à saúde e integridade do paciente; de outro, o reconhecimento das limitações e riscos inerentes à atividade médica.

O paciente que sofreu danos decorrentes de erro médico tem direito à reparação, mas é fundamental que o processo seja conduzido com rigor técnico, evitando tanto a impunidade de profissionais negligentes quanto a penalização injusta de médicos que atuaram dentro dos padrões adequados da profissão.

A evolução da medicina, com novas tecnologias e possibilidades terapêuticas, continuará a desafiar o sistema jurídico a encontrar respostas equilibradas, que protejam os pacientes sem inviabilizar o exercício da medicina ou estimular práticas defensivas prejudiciais ao sistema de saúde como um todo.

Para quem enfrenta situações de possível erro médico, é recomendável buscar orientação jurídica especializada, que possa avaliar adequadamente as peculiaridades do caso e indicar o melhor caminho a seguir, seja pela via judicial ou por métodos alternativos de resolução de conflitos.
    `,
    imageUrl: "https://images.unsplash.com/photo-1588421357574-87938a86fa28?auto=format&fit=crop&w=800&q=80",
    publishDate: "2025-03-05",
    categoryId: medicoCategory.id,
    featured: 0
  };
  
  // Terceiro artigo: Direitos dos Pacientes
  const direitosPacientesArticle = {
    title: "Direitos dos pacientes no Brasil: Um guia completo",
    slug: "direitos-pacientes-brasil-guia-completo",
    excerpt: "Conheça todos os direitos garantidos aos pacientes no sistema de saúde brasileiro, tanto público quanto privado, e saiba como exigi-los em caso de descumprimento.",
    content: `
# Direitos dos pacientes no Brasil: Um guia completo

Os direitos dos pacientes constituem um conjunto de garantias fundamentais que visam assegurar o respeito à dignidade humana durante o atendimento à saúde. No Brasil, esses direitos estão ancorados em diversos dispositivos legais e normativos, formando um arcabouço jurídico amplo e complexo. Conhecer esses direitos é essencial para que todo cidadão possa exercer sua autonomia e receber um atendimento humanizado e de qualidade. Este artigo apresenta um panorama completo dos direitos dos pacientes no Brasil, abrangendo tanto o sistema público quanto o privado.

## Fundamentos jurídicos dos direitos dos pacientes

Os direitos dos pacientes no Brasil possuem múltiplos fundamentos normativos, partindo da Constituição Federal até resoluções de conselhos profissionais.

### Base constitucional

A Constituição Federal de 1988 estabelece as bases fundamentais dos direitos dos pacientes:
- **Art. 1º, III**: A dignidade da pessoa humana como fundamento da República
- **Art. 5º**: Direitos fundamentais à vida, liberdade, igualdade, privacidade e informação
- **Art. 196**: A saúde como direito de todos e dever do Estado
- **Art. 197**: Relevância pública das ações e serviços de saúde

### Legislação infraconstitucional

Diversas leis abordam aspectos específicos:
- **Lei 8.080/1990 (Lei Orgânica da Saúde)**: Estabelece os princípios do SUS
- **Lei 8.078/1990 (Código de Defesa do Consumidor)**: Regula relações em serviços privados de saúde
- **Lei 10.741/2003 (Estatuto do Idoso)**: Garante atenção integral à saúde do idoso
- **Lei 8.069/1990 (Estatuto da Criança e do Adolescente)**: Assegura direitos específicos na assistência à saúde de menores
- **Lei 10.216/2001**: Proteção e direitos das pessoas com transtornos mentais
- **Lei 13.146/2015 (Estatuto da Pessoa com Deficiência)**: Garante acessibilidade nos serviços de saúde

### Normas administrativas e resoluções

Complementam o arcabouço legal:
- **Portaria 1.820/2009 do Ministério da Saúde**: Carta dos Direitos dos Usuários da Saúde
- **Resolução CFM nº 2.217/2018**: Código de Ética Médica
- **Resolução 553/2017 do Conselho Nacional de Saúde**: Carta dos Direitos e Deveres da Pessoa Usuária da Saúde
- **Resoluções dos demais conselhos profissionais de saúde**: Enfermagem, Psicologia, etc.

## Direitos fundamentais dos pacientes

Existem direitos básicos comuns a todos os pacientes, independentemente do tipo de atendimento (público ou privado).

### Direito ao atendimento digno e de qualidade

Todo paciente tem direito a:
- Ser atendido com atenção e respeito
- Não sofrer discriminação por qualquer motivo
- Identificação pessoal dos profissionais envolvidos em seu cuidado
- Ambiente limpo, seguro e adequado ao atendimento
- Atendimento acolhedor e livre de preconceitos

### Direito à informação

O paciente deve receber informações claras sobre:
- Seu estado de saúde e diagnóstico
- Objetivos, riscos e benefícios dos procedimentos
- Alternativas de tratamento disponíveis
- Medicamentos prescritos e possíveis efeitos colaterais
- Custos dos procedimentos (no sistema privado)

### Direito ao consentimento informado

Decorrente do princípio da autonomia:
- Nenhum procedimento pode ser realizado sem consentimento (salvo emergências)
- O consentimento deve ser livre, esclarecido e formalizado (especialmente em procedimentos invasivos)
- Direito de recusar tratamentos, respeitadas as previsões legais
- Possibilidade de revogação do consentimento a qualquer momento

### Direito à privacidade e confidencialidade

Proteção à intimidade e dados pessoais:
- Sigilo de todas as informações pessoais, mesmo após a morte
- Privacidade durante consultas e procedimentos
- Proteção da imagem e dados do prontuário
- Escolha de quem pode acompanhá-lo e ter acesso às informações

### Direito de acesso ao prontuário

Garantia de acesso às informações registradas:
- Obtenção de cópia integral do prontuário
- Esclarecimento de termos técnicos
- Correção de informações inexatas
- Proteção contra acesso não autorizado

<!-- ADSENSE -->
<div class="adsense-container">
  <p class="adsense-text">Publicidade</p>
  <div class="adsense-placeholder">
    <!-- Código Google AdSense será inserido aqui -->
  </div>
</div>
<!-- FIM ADSENSE -->

## Direitos específicos no Sistema Único de Saúde (SUS)

O atendimento pelo SUS possui garantias específicas baseadas em seus princípios fundamentais.

### Universalidade do acesso

Todo cidadão tem direito a:
- Acesso a ações e serviços de saúde sem discriminação
- Atendimento em qualquer unidade do SUS no território nacional
- Não exigência de documentos que dificultem ou impeçam o atendimento

### Integralidade da assistência

Garantia de atendimento completo:
- Acesso a todos os níveis de complexidade (atenção básica, média e alta complexidade)
- Ações de promoção, prevenção, tratamento e reabilitação
- Fornecimento de medicamentos constantes na RENAME (Relação Nacional de Medicamentos Essenciais)
- Tratamentos integrais, não fragmentados

### Igualdade da assistência

Equidade no atendimento:
- Não discriminação por qualquer critério
- Prioridade conforme critérios clínicos (não por privilégios)
- Atenção especial a grupos vulneráveis
- Adaptações necessárias para atendimento às particularidades

### Direito de acompanhante

Garantia de acompanhamento:
- Crianças e adolescentes: direito a acompanhante permanente
- Idosos: acompanhante durante internação ou observação
- Parturientes: acompanhante durante pré-parto, parto e pós-parto
- Pessoas com deficiência: acompanhante quando necessário

### Direito à segunda opinião médica

Em casos de dúvida:
- Possibilidade de solicitar avaliação de outro profissional
- Encaminhamento a especialistas quando necessário
- Interconsulta entre especialidades

## Direitos específicos no sistema privado de saúde

Os usuários de planos de saúde e serviços privados possuem garantias adicionais.

### Direitos nas relações com planos de saúde

Regulados pela Lei 9.656/1998:
- Cobertura mínima obrigatória (rol da ANS)
- Vedação a limitações temporais de internação
- Proibição de restrição a doenças preexistentes após 24 meses
- Reajustes apenas conforme regras da ANS
- Portabilidade de carências entre planos

### Prazos máximos de atendimento

Estabelecidos pela ANS:
- Consultas básicas: até 7 dias úteis
- Consultas com especialistas: até 14 dias úteis
- Exames simples: até 3 dias úteis
- Exames complexos: até 10 dias úteis
- Procedimentos de alta complexidade: até 21 dias úteis
- Urgência e emergência: atendimento imediato

### Reembolso

Situações em que é cabível:
- Urgência/emergência quando não há serviço credenciado disponível
- Nos planos com livre escolha de prestadores
- Valores conforme tabela contratual ou judicial

### Transparência nos custos

Direito a:
- Orçamento prévio de procedimentos
- Explicação detalhada dos valores cobrados
- Informação sobre cobertura de planos
- Discriminação de todos os serviços em nota fiscal

## Direitos específicos de grupos vulneráveis

Alguns grupos possuem proteção legal reforçada no âmbito da saúde.

### Crianças e adolescentes

Direitos garantidos pelo ECA:
- Atendimento prioritário em serviços de saúde
- Acompanhamento do crescimento e desenvolvimento
- Vacinação obrigatória
- Acompanhante em tempo integral durante internação
- Alojamento conjunto mãe-filho

### Idosos

Conforme o Estatuto do Idoso:
- Atendimento preferencial imediato em serviços de saúde
- Distribuição gratuita de medicamentos, especialmente de uso continuado
- Próteses e órteses para tratamento e reabilitação
- Proibição de discriminação em planos de saúde por idade
- Direito a acompanhante durante internação

### Gestantes e puérperas

Direitos específicos:
- Vinculação à maternidade desde o pré-natal
- Acompanhante durante pré-parto, parto e pós-parto
- Contato imediato mãe-filho após o parto
- Alojamento conjunto
- Planejamento familiar

### Pessoas com deficiência

Garantias do Estatuto da Pessoa com Deficiência:
- Acessibilidade em todos os serviços de saúde
- Atendimento prioritário
- Tecnologias assistivas quando necessárias
- Capacitação de profissionais para atendimento adequado
- Adaptação na comunicação (intérpretes, material acessível)

### Pessoas com transtornos mentais

Proteções da Lei 10.216/2001:
- Tratamento com humanidade e respeito
- Proteção contra abusos e exploração
- Tratamento em ambiente menos invasivo possível
- Reinserção social como objetivo
- Consentimento informado (exceto em casos específicos)

## Direitos relacionados a situações específicas

Certos contextos de atendimento possuem direitos particularizados.

### Urgência e emergência

Garantias específicas:
- Atendimento imediato e prioritário conforme gravidade
- Obrigatoriedade de atendimento mesmo sem documentos
- Proibição de exigência de caução ou cheque-garantia
- Estabilização antes de transferência
- Transferência apenas se necessária e com segurança

### Internação hospitalar

Durante hospitalização:
- Identificação pelo nome (não por número, patologia ou quarto)
- Conhecimento da identidade dos profissionais
- Visita de familiares conforme regras da instituição
- Recusa a tratamentos dolorosos para prolongar a vida (ortotanásia)
- Alta hospitalar responsável, com orientações claras

### Tratamentos prolongados

Em casos crônicos:
- Continuidade do cuidado sem interrupções
- Fornecimento ininterrupto de medicação
- Acesso a cuidados paliativos quando necessário
- Home care nos casos previstos em lei ou contrato
- Suporte psicossocial

### Transplantes

Direitos específicos:
- Inscrição em lista única de espera
- Critérios técnicos de prioridade
- Sigilo sobre doadores e receptores
- Gratuidade para doadores vivos
- Acompanhamento pós-transplante

## Mecanismos de proteção e reclamação

Existem diversos canais para assegurar o respeito aos direitos dos pacientes.

### Ouvidorias e SAC

Primeiro nível de reclamação:
- Ouvidorias em instituições de saúde
- Ouvidoria do SUS (telefone 136)
- SAC de operadoras de planos de saúde
- Prazo legal para resposta (5 a 10 dias úteis)

### Órgãos reguladores e fiscalizadores

Instâncias oficiais:
- Vigilância Sanitária municipal e estadual
- Agência Nacional de Saúde Suplementar (ANS)
- Agência Nacional de Vigilância Sanitária (ANVISA)
- Secretarias municipais e estaduais de saúde
- Ministério da Saúde

### Conselhos profissionais

Para problemas éticos:
- Conselho Federal e Regionais de Medicina (CFM/CRMs)
- Conselho Federal e Regionais de Enfermagem (COFEN/CORENs)
- Demais conselhos profissionais (Psicologia, Odontologia, etc.)
- Comissões de ética das instituições

### Defesa do consumidor

Para serviços privados:
- PROCON
- Delegacias de Defesa do Consumidor
- Juizados Especiais Cíveis
- Plataforma consumidor.gov.br

### Ministério Público e Defensoria

Em casos mais graves:
- Ministério Público Federal e Estadual
- Defensoria Pública
- Ações civis públicas
- Termos de ajustamento de conduta

## Deveres dos pacientes

Os direitos vêm acompanhados de responsabilidades correlatas.

### Dever de informação

Contribuição para o bom atendimento:
- Fornecer informações precisas sobre sua saúde
- Informar alergias e reações prévias a medicamentos
- Relatar histórico médico com precisão
- Comunicar mudanças percebidas durante o tratamento

### Cumprimento das orientações

Corresponsabilidade no tratamento:
- Seguir as recomendações terapêuticas
- Usar corretamente os medicamentos
- Comparecer às consultas e exames agendados
- Comunicar impossibilidade de comparecimento

### Respeito às normas institucionais

Durante o atendimento:
- Observar regras da instituição de saúde
- Respeitar profissionais de saúde
- Colaborar para o bem-estar coletivo
- Utilizar adequadamente instalações e equipamentos

### Comportamento ético

Condutas esperadas:
- Não utilizar documentos de terceiros
- Não falsear informações para obter atendimento
- Comunicar previamente desistência de procedimentos
- Não utilizar indevidamente serviços de urgência

## Desafios na efetivação dos direitos dos pacientes

Apesar da ampla legislação, existem obstáculos para a efetivação desses direitos.

### Desconhecimento

Tanto por profissionais quanto pacientes:
- Falta de divulgação adequada dos direitos
- Linguagem técnica e jurídica de difícil compreensão
- Ausência de educação em saúde nas escolas
- Insuficiente capacitação dos profissionais

### Dificuldades estruturais

Problemas do sistema de saúde:
- Subfinanciamento do SUS
- Falta de profissionais em algumas regiões
- Infraestrutura precária em certas unidades
- Sobrecarga dos serviços

### Assimetria de informação

Desequilíbrio na relação:
- Dificuldade de compreensão de termos técnicos
- Vulnerabilidade do paciente em situação de doença
- Resistência à democratização do conhecimento médico
- Paternalismo ainda presente

### Judicialização da saúde

Crescimento de processos judiciais:
- Acesso a medicamentos e tratamentos não disponibilizados
- Impacto orçamentário das decisões judiciais
- Distorções no sistema de saúde
- Individualização de direitos coletivos

## Tendências e perspectivas

O campo dos direitos dos pacientes continua em evolução constante.

### Telemedicina e direitos digitais

Novas questões emergentes:
- Proteção de dados em consultas remotas
- Consentimento em ambiente virtual
- Segurança e confidencialidade das plataformas
- Regulamentação adequada

### Participação e empoderamento

Tendência crescente:
- Movimentos de pacientes e associações
- Participação em conselhos de saúde
- Decisão compartilhada no tratamento
- Letramento em saúde

### Humanização do atendimento

Políticas em desenvolvimento:
- Política Nacional de Humanização (HumanizaSUS)
- Foco na experiência do paciente
- Valorização de aspectos subjetivos
- Abordagem centrada na pessoa, não na doença

### Diretivas antecipadas de vontade

Crescente reconhecimento:
- Testamento vital e mandato duradouro
- Cuidados paliativos e ortotanásia
- Respeito à autonomia em fim de vida
- Regulamentação em desenvolvimento

## Considerações finais

Os direitos dos pacientes representam uma conquista histórica na humanização da assistência à saúde e no reconhecimento da autonomia e dignidade de cada pessoa. No Brasil, apesar do vasto conjunto de normas existentes, a efetivação desses direitos ainda enfrenta desafios significativos, que demandam esforços conjuntos de pacientes, profissionais, gestores e sociedade.

Conhecer seus direitos é o primeiro passo para exercê-los e reivindicá-los adequadamente. Para o paciente, isso significa não apenas a possibilidade de receber um atendimento mais digno e humanizado, mas também participar ativamente das decisões sobre sua saúde, exercendo plenamente sua cidadania.

Para os profissionais e instituições de saúde, respeitar os direitos dos pacientes não deve ser visto como mera obrigação legal, mas como parte integral da boa prática e da ética do cuidado, resultando em relações mais transparentes, horizontais e satisfatórias para todos os envolvidos.

Em um cenário ideal, o conhecimento e respeito aos direitos dos pacientes contribui para um sistema de saúde mais justo, eficiente e centrado na pessoa, onde a dimensão técnica da assistência é complementada pela dimensão humana e ética do cuidado.
    `,
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    publishDate: "2025-01-25",
    categoryId: medicoCategory.id,
    featured: 0
  };
  
  await addArticle(prontuarioArticle);
  await addArticle(responsabilidadeArticle);
  await addArticle(direitosPacientesArticle);
  console.log("Artigos de Direito Médico adicionados com sucesso!");
}

async function main() {
  try {
    console.log('Contagem de artigos por categoria antes das adições:');
    console.log(await countArticlesByCategory());
    
    // Adicionar artigos faltantes para cada categoria
    await addArtigosTrabalhistas();
    await addArtigosMedicos();
    
    console.log('\nContagem de artigos por categoria após as adições:');
    console.log(await countArticlesByCategory());
    
    console.log('\nArtigos adicionados com sucesso!');
  } catch (error) {
    console.error('Erro na execução:', error);
  }
}

// Executar o script principal
main();