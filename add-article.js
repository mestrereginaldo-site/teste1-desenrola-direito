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

// Adicionar artigo sobre Divórcio
async function addDivorcioArticle() {
  const categories = await getCategories();
  const familyCategory = categories.find(c => c.slug === 'direito-familia');
  
  if (!familyCategory) {
    console.error('Categoria de Direito de Família não encontrada');
    return;
  }
  
  const divorcioArticle = {
    title: "Divórcio no Brasil: Processos, custos e impactos jurídicos",
    slug: "divorcio-processos-custos-impactos",
    excerpt: "Um guia completo sobre o processo de divórcio no Brasil, incluindo tipos de divórcio, procedimentos, custos, divisão de bens e os impactos jurídicos na vida familiar.",
    content: `
# Divórcio no Brasil: Processos, custos e impactos jurídicos

O divórcio é o processo legal que dissolve oficialmente o vínculo matrimonial, permitindo que os ex-cônjuges sigam caminhos separados, inclusive com a possibilidade de novos casamentos. No Brasil, desde a Emenda Constitucional nº 66/2010, o processo de divórcio foi significativamente simplificado, eliminando a exigência de separação judicial prévia. Este artigo apresenta informações completas sobre os tipos de divórcio, procedimentos, custos e impactos jurídicos para quem enfrenta esta situação.

## Tipos de divórcio no Brasil

### 1. Divórcio Consensual

O divórcio consensual ocorre quando ambos os cônjuges concordam com o término do casamento e com todas as questões relacionadas, como:

- Partilha de bens
- Guarda dos filhos
- Regime de visitas
- Pensão alimentícia
- Uso do nome de casado

**Procedimentos disponíveis:**

- **Divórcio em Cartório (Extrajudicial)**: Quando não há filhos menores ou incapazes, o divórcio pode ser realizado diretamente em cartório, através de escritura pública, com a assistência de um advogado ou defensor público.
  
- **Divórcio Judicial Consensual**: Necessário quando há filhos menores ou incapazes, mas ainda assim com acordo entre as partes sobre todas as questões.

### 2. Divórcio Litigioso

Quando não há acordo entre os cônjuges sobre o divórcio em si ou sobre questões relacionadas (como divisão de bens, guarda de filhos, pensão alimentícia), o processo tramita pela via judicial litigiosa.

- É necessariamente judicial
- Geralmente mais demorado (pode durar anos)
- Mais custoso financeira e emocionalmente
- Pode incluir perícias, avaliações e audiências múltiplas

### 3. Divórcio Unilateral

Com as mudanças trazidas pela EC 66/2010, tornou-se possível o divórcio a pedido de apenas um dos cônjuges, sem necessidade de justificativa ou concordância do outro. No entanto, questões como divisão de bens e guarda dos filhos ainda precisarão ser resolvidas no processo.

## Procedimentos para cada tipo de divórcio

### Divórcio Extrajudicial (em Cartório)

**Requisitos:**
- Consenso entre as partes
- Ausência de filhos menores ou incapazes
- Ambas as partes assistidas por advogado (pode ser o mesmo para o casal)

**Documentos necessários:**
- Certidão de casamento atualizada
- Documentos pessoais (RG e CPF)
- Documentos que comprovem a propriedade dos bens
- Pacto antenupcial (se houver)
- Procuração do advogado

**Etapas:**
1. Elaboração de minuta da escritura pelo advogado
2. Agendamento no cartório
3. Assinatura da escritura pública
4. Registro da escritura no Cartório de Registro Civil

**Prazo médio:** 15 a 30 dias

### Divórcio Judicial Consensual

**Requisitos:**
- Acordo entre as partes
- Pode haver filhos menores ou incapazes

**Etapas:**
1. Petição inicial elaborada pelo advogado
2. Protocolo no fórum competente
3. Análise pelo Ministério Público (quando há menores)
4. Homologação pelo juiz
5. Expedição do mandado de averbação

**Prazo médio:** 2 a 6 meses

### Divórcio Litigioso

**Etapas:**
1. Petição inicial
2. Citação do cônjuge
3. Contestação
4. Audiência de conciliação
5. Fase de produção de provas (se necessário)
6. Alegações finais
7. Sentença
8. Eventuais recursos
9. Averbação do divórcio

**Prazo médio:** 1 a 3 anos (pode ser mais longo dependendo da complexidade e do volume de processos na comarca)

<!-- ADSENSE -->
<div class="adsense-container">
  <p class="adsense-text">Publicidade</p>
  <div class="adsense-placeholder">
    <!-- Código Google AdSense será inserido aqui -->
  </div>
</div>
<!-- FIM ADSENSE -->

## Custos envolvidos no processo de divórcio

### Divórcio em Cartório (Extrajudicial)

- **Honorários advocatícios**: Entre R$ 2.000 e R$ 5.000 (valor pode variar conforme a complexidade)
- **Custas cartorárias**: Entre R$ 500 e R$ 2.000 (varia conforme o estado e o valor do patrimônio)
- **Averbação na certidão**: Aproximadamente R$ 150 a R$ 300

### Divórcio Judicial Consensual

- **Honorários advocatícios**: Entre R$ 3.000 e R$ 7.000
- **Custas judiciais**: Entre R$ 200 e R$ 2.000 (varia conforme o estado e o valor da causa)
- **Averbação na certidão**: Aproximadamente R$ 150 a R$ 300

### Divórcio Litigioso

- **Honorários advocatícios**: A partir de R$ 5.000, podendo chegar a dezenas de milhares de reais em casos complexos
- **Custas judiciais**: Entre R$ 300 e R$ 5.000 (varia conforme o estado e o valor da causa)
- **Custos com perícias**: Entre R$ 1.500 e R$ 10.000 (se necessário)
- **Averbação na certidão**: Aproximadamente R$ 150 a R$ 300

### Fatores que influenciam os custos:

- **Complexidade patrimonial**: Quanto maior e mais complexo o patrimônio, maiores os custos
- **Nível de litígio**: Quanto maior o conflito, mais custoso o processo
- **Região geográfica**: Capitais e grandes centros costumam ter custos mais elevados
- **Experiência do advogado**: Profissionais mais experientes geralmente cobram honorários mais altos

## Regime de bens e sua influência no divórcio

A partilha de bens no divórcio depende diretamente do regime de bens escolhido no momento do casamento:

### Comunhão Parcial de Bens (regime legal padrão)

- Bens adquiridos durante o casamento são divididos igualmente (50% para cada)
- Bens anteriores ao casamento permanecem como propriedade exclusiva de cada cônjuge
- Bens recebidos por herança ou doação individual não são compartilhados

### Comunhão Universal de Bens

- Todos os bens, inclusive os adquiridos antes do casamento, são divididos igualmente
- Exceção: bens listados no art. 1.668 do Código Civil (como proventos do trabalho pessoal, pensões, etc.)

### Separação Total de Bens

- Cada cônjuge mantém a propriedade exclusiva de seus bens, não havendo partilha
- Em casos especiais, a jurisprudência pode reconhecer direito à partilha de bens adquiridos pelo esforço comum (Súmula 377 do STF)

### Participação Final nos Aquestos

- Durante o casamento, funciona como separação de bens
- No divórcio, há compensação dos bens adquiridos onerosamente durante o casamento

### Separação Obrigatória de Bens

- Imposta por lei em situações específicas (casamento de maiores de 70 anos, por exemplo)
- Semelhante à separação convencional, porém obrigatória

## Questões relacionadas a filhos

### Guarda dos filhos

A definição da guarda pode ser:

- **Compartilhada**: Ambos os pais têm responsabilidades legais e rotina de convivência com os filhos (modelo preferencial pela lei)
- **Unilateral**: Apenas um dos pais detém a guarda, com direito de visita ao outro

O juiz leva em consideração o melhor interesse da criança, analisando:

- Vínculo afetivo com os pais
- Condições dos genitores
- Opinião da criança (conforme sua idade e maturidade)
- Laudo psicossocial (quando solicitado)

### Pensão alimentícia

A pensão é estabelecida com base no trinômio:

- **Necessidade do alimentando** (filho)
- **Possibilidade do alimentante** (genitor pagador)
- **Proporcionalidade** entre necessidade e possibilidade

O valor pode ser definido como:

- Percentual do salário do alimentante (comum: 15% a 30% por filho)
- Valor fixo com correção monetária
- Combinação de ambos

### Direito de visitas

Quando não há guarda compartilhada, estabelece-se um regime de convivência, que pode ser:

- Fins de semana alternados
- Compartilhamento de férias escolares
- Divisão de feriados e datas comemorativas
- Visitas durante a semana
- Arranjos flexíveis conforme acordo entre os pais

## Questões específicas no divórcio

### Uso do nome de casado

Após o divórcio, cada cônjuge pode:

- Voltar a usar o nome de solteiro
- Manter o nome de casado

O cônjuge não pode impor a alteração do nome do outro, sendo uma escolha pessoal.

### Pensão alimentícia entre ex-cônjuges

A pensão entre ex-cônjuges:

- Não é automática
- Tem caráter excepcional e temporário
- Depende da comprovação de necessidade
- Visa a recolocação profissional e readaptação financeira
- Termina com novo casamento ou união estável do beneficiário

### Planos de saúde e previdência

- **Planos de saúde**: O ex-cônjuge pode manter-se como dependente apenas se previsto nas regras do plano e mediante pagamento integral da mensalidade
- **Previdência privada**: Os valores acumulados durante o casamento podem ser objeto de partilha, dependendo do regime de bens
- **Previdência social**: Possibilidade de pensão por morte mesmo após o divórcio, se comprovada dependência econômica

## Impactos jurídicos do divórcio

### Efeitos civis

- Dissolução definitiva do vínculo matrimonial
- Possibilidade de novo casamento
- Modificação do estado civil
- Cessação dos deveres conjugais
- Fim do regime de bens

### Efeitos patrimoniais

- Partilha dos bens comuns
- Divisão de dívidas contraídas durante o casamento
- Pagamento de pensão alimentícia (se aplicável)
- Destino do imóvel que servia de residência ao casal

### Efeitos sucessórios

- Ex-cônjuge perde a qualidade de herdeiro
- Testamentos beneficiando o ex-cônjuge podem ser revisados
- Seguros de vida com o ex-cônjuge como beneficiário permanecem válidos, salvo alteração

## Alternativas ao processo tradicional de divórcio

### Mediação familiar

- Processo voluntário com mediador neutro
- Foco em soluções consensuais
- Ambiente menos hostil
- Pode reduzir custos e tempo do processo
- Menor impacto emocional para os envolvidos

### Divórcio colaborativo

- Modelo onde cada parte tem seu advogado
- Compromisso conjunto de resolver sem litígio
- Participação de outros profissionais (psicólogos, contadores)
- Processos geralmente mais rápidos e menos traumáticos

## Jurisprudência relevante sobre divórcio

- **STF - RE 878.694/MG**: Equiparou união estável e casamento para fins sucessórios
- **STJ - REsp 1.454.138/RJ**: Reconheceu a validade do testamento vital em casos de divórcio
- **STJ - REsp 1.663.137/MG**: Estabeleceu a possibilidade de indenização por danos morais em casos de abandono afetivo
- **STJ - REsp 1.454.138/RJ**: Firmou entendimento sobre a utilização da data da separação de fato como marco para o fim da comunhão de bens

## Orientações práticas para quem vai se divorciar

### Antes de iniciar o processo

1. **Busque aconselhamento jurídico**: Consulte um advogado especializado antes de tomar qualquer decisão
2. **Organize documentos**: Reúna documentos pessoais, certidões, comprovantes de propriedade
3. **Levante o patrimônio**: Liste todos os bens e dívidas do casal
4. **Planeje questões práticas**: Moradia, educação dos filhos, orçamento individual

### Durante o processo

1. **Mantenha comunicação civilizada**: Evite conflitos desnecessários
2. **Priorize os filhos**: Não os envolva em disputas dos adultos
3. **Seja transparente**: Não oculte bens ou informações
4. **Documente tudo**: Mantenha registros de comunicações, acordos verbais, gastos com filhos

### Após o divórcio

1. **Cumpra os acordos**: Honre pensões, visitas e demais obrigações
2. **Atualize documentos**: RG, CPF, cadastros bancários, planos de saúde
3. **Revise testamentos e beneficiários**: Atualize documentos de sucessão e seguros
4. **Mantenha a coparentalidade**: Continue cooperando na criação dos filhos

## Considerações finais

O divórcio, embora represente o fim do vínculo matrimonial, não encerra as responsabilidades parentais quando há filhos envolvidos. A forma como o processo é conduzido pode ter impacto significativo na saúde emocional de todos os envolvidos, especialmente dos filhos.

A escolha da modalidade de divórcio mais adequada deve considerar não apenas aspectos financeiros, mas também emocionais e práticos. Quando possível, optar por soluções consensuais costuma trazer benefícios a longo prazo para toda a família.

A assistência jurídica adequada é fundamental para garantir que direitos sejam preservados e que o processo ocorra da forma mais tranquila possível, permitindo que todos os envolvidos possam seguir adiante com suas vidas após esta importante transição.
    `,
    imageUrl: "https://images.unsplash.com/photo-1585908286456-991b5d0e52cc?auto=format&fit=crop&w=800&q=80",
    publishDate: "2025-03-15",
    categoryId: familyCategory.id,
    featured: 0
  };
  
  await addArticle(divorcioArticle);
}

// Adicionar artigo sobre Direito Trabalhista - Assédio Moral
async function addAssedioMoralArticle() {
  const categories = await getCategories();
  const workCategory = categories.find(c => c.slug === 'direito-trabalhista');
  
  if (!workCategory) {
    console.error('Categoria de Direito Trabalhista não encontrada');
    return;
  }
  
  const assedioArticle = {
    title: "Assédio moral no trabalho: Como identificar e quais medidas tomar",
    slug: "assedio-moral-trabalho-como-identificar",
    excerpt: "Aprenda a identificar o assédio moral no ambiente de trabalho, conheça seus direitos e saiba quais medidas legais tomar para proteger sua saúde mental e obter reparação.",
    content: `
# Assédio moral no trabalho: Como identificar e quais medidas tomar

O assédio moral no ambiente de trabalho é uma forma de violência psicológica que afeta milhões de trabalhadores brasileiros, causando danos à saúde mental e física das vítimas. Essa prática abusiva, embora muitas vezes sutil e difícil de provar, é considerada uma violação aos direitos fundamentais do trabalhador. Este artigo aborda como identificar o assédio moral, seus impactos, direitos das vítimas e medidas legais disponíveis.

## O que é assédio moral no trabalho?

O assédio moral no trabalho é caracterizado por condutas abusivas e repetitivas (gestos, palavras, comportamentos, atitudes) que atentam contra a dignidade ou integridade psíquica ou física de uma pessoa, ameaçando seu emprego ou degradando o clima de trabalho.

Diferentemente de um conflito pontual ou uma bronca isolada, o assédio moral se caracteriza pela:

- **Repetição**: Comportamentos que se repetem ao longo do tempo
- **Intencionalidade**: Ações deliberadas para desestabilizar a vítima
- **Direcionalidade**: Foco em pessoas específicas
- **Desigualdade de poder**: Geralmente envolve relação assimétrica (embora possa ocorrer entre pares)
- **Degradação das condições de trabalho**: Tornando o ambiente hostil ou insuportável

## Principais formas de assédio moral

### 1. Assédio moral vertical descendente

É a forma mais comum, praticada por um superior hierárquico contra seus subordinados. Exemplos incluem:

- Atribuir tarefas impossíveis ou prazos irrealizáveis
- Criticar constantemente o trabalho de forma injusta
- Restringir o uso de banheiro ou pausas
- Isolar o funcionário dos demais colegas
- Monitorar excessivamente o trabalho

### 2. Assédio moral horizontal

Ocorre entre colegas de mesmo nível hierárquico. Manifestações comuns:

- Boicote ao trabalho da vítima
- Espalhar rumores ou fazer piadas ofensivas
- Excluir a pessoa de eventos sociais do grupo
- Zombar de características pessoais ou competências profissionais
- Esconder informações necessárias para o trabalho

### 3. Assédio moral vertical ascendente

Menos comum, ocorre quando um ou mais subordinados assediam um superior hierárquico. Pode acontecer em situações como:

- Sabotagem ao trabalho do superior
- Desobediência sistemática às ordens legítimas
- Propagação de boatos para desacreditar a liderança
- Resistência organizada para minar a autoridade

### 4. Assédio moral organizacional

É uma prática institucionalizada como "método de gestão", afetando coletivamente os trabalhadores:

- Política de metas inatingíveis com punições públicas
- Ranqueamento de funcionários com exposição dos "piores"
- Premiações humilhantes para quem não atinge metas
- Fiscalização excessiva e controle opressivo

<!-- ADSENSE -->
<div class="adsense-container">
  <p class="adsense-text">Publicidade</p>
  <div class="adsense-placeholder">
    <!-- Código Google AdSense será inserido aqui -->
  </div>
</div>
<!-- FIM ADSENSE -->

## Como identificar o assédio moral no trabalho

### Comportamentos que podem caracterizar assédio

1. **Desqualificação**:
   - Criticar persistentemente o trabalho de forma injusta
   - Atribuir erros inexistentes
   - Questionar decisões injustificadamente
   - Ignorar contribuições e ideias

2. **Isolamento**:
   - Excluir a pessoa de reuniões importantes
   - Transferir para posições isoladas
   - Não convidar para eventos sociais
   - Ignorar a presença física da vítima

3. **Humilhação pública**:
   - Ridicularizar a pessoa na frente de colegas
   - Expor resultados negativos para todos
   - Fazer piadas sobre características pessoais
   - Gritar ou usar termos depreciativos

4. **Sobrecarga ou esvaziamento de funções**:
   - Atribuir trabalhos impossíveis de serem concluídos
   - Retirar funções gradativamente
   - Dar prazos irrazoáveis
   - Atribuir tarefas muito abaixo da qualificação

5. **Controle excessivo**:
   - Monitorar tempos de banheiro
   - Questionar atestados médicos
   - Verificar constantemente o trabalho sem justificativa
   - Solicitar justificativas para qualquer pausa

### Sinais de que você pode estar sendo vítima

Se você identifica alguns destes sintomas recorrentes relacionados ao trabalho, pode estar sofrendo assédio moral:

- **Sintomas físicos**: Distúrbios do sono, dores de cabeça frequentes, alterações no apetite, problemas gastrointestinais, taquicardia, tremores
  
- **Sintomas psicológicos**: Ansiedade constante, medo de ir trabalhar, insegurança, queda na autoestima, irritabilidade, sensação de incompetência, depressão, pensamentos autodestrutivos

- **Comportamentais**: Isolamento social, absenteísmo, diminuição da produtividade, perda do sentido do trabalho, uso de substâncias como álcool ou ansiolíticos para suportar o dia de trabalho

## Impactos do assédio moral

### Na saúde do trabalhador

- **Saúde física**: Desenvolvimento ou agravamento de doenças como hipertensão, distúrbios digestivos, alterações hormonais, doenças dermatológicas, distúrbios do sono

- **Saúde mental**: Transtornos de ansiedade, síndrome do pânico, depressão, síndrome de burnout, transtorno de estresse pós-traumático (TEPT), ideação suicida

### Na empresa

- Aumento do absenteísmo e rotatividade de pessoal
- Queda na produtividade e qualidade do trabalho
- Degradação do clima organizacional
- Aumento de custos com licenças médicas e substituições
- Impacto na reputação da empresa
- Riscos de processos trabalhistas e indenizações

### Na sociedade

- Sobrecarga do sistema de saúde pública
- Aumento de gastos previdenciários com afastamentos
- Redução da capacidade produtiva da força de trabalho
- Impactos nas famílias das vítimas

## Direitos do trabalhador vítima de assédio moral

### Base legal

Embora o Brasil não tenha uma lei federal específica sobre assédio moral (exceto para servidores públicos federais), a proteção jurídica é construída a partir de:

- **Constituição Federal**: Art. 1º, III (dignidade da pessoa humana); Art. 5º, V e X (direito à indenização por dano moral); Art. 7º (direitos dos trabalhadores)

- **CLT (Consolidação das Leis do Trabalho)**: Art. 483 (rescisão indireta do contrato por falta grave do empregador); Art. 223-A a 223-G (incluídos pela Reforma Trabalhista, tratam do dano extrapatrimonial)

- **Código Civil**: Art. 186 e 927 (responsabilidade civil por danos)

- **Leis Estaduais e Municipais**: Diversos estados e municípios possuem legislação específica sobre assédio moral no serviço público

### Direito à rescisão indireta

O trabalhador vítima de assédio moral pode solicitar a rescisão indireta do contrato de trabalho (equivalente a uma "demissão sem justa causa" por culpa do empregador), garantindo:

- Aviso prévio indenizado
- 13º salário proporcional
- Férias proporcionais + 1/3
- Saque do FGTS
- Multa de 40% sobre o FGTS
- Seguro-desemprego

### Direito à indenização por danos morais e materiais

A vítima pode pleitear indenização por:

- **Danos morais**: Compensação pelo sofrimento psíquico
- **Danos materiais**: Ressarcimento por despesas médicas, tratamentos psicológicos
- **Danos existenciais**: Prejuízos ao projeto de vida ou relações sociais

## Medidas a tomar caso seja vítima de assédio moral

### 1. Documentação e provas

É fundamental reunir evidências do assédio:

- **Registre por escrito**: Mantenha um diário detalhando datas, horários, locais, pessoas presentes, frases exatas e comportamentos
- **Guarde e-mails, mensagens**: Preserve comunicações que evidenciem o tratamento hostil
- **Identificar testemunhas**: Anote nomes de colegas que presenciaram as situações
- **Comunicações formais**: Se possível, formalize reclamações ao RH e guarde protocolos
- **Documentos médicos**: Guarde receitas, atestados e relatórios médicos relacionados aos impactos na saúde

### 2. Canais internos de denúncia

Antes de judicializar, considere os canais internos da empresa:

- Reportar ao superior imediato (exceto se for o assediador)
- Procurar o departamento de Recursos Humanos
- Acionar ouvidoria ou canal de denúncias
- Contatar a CIPA (Comissão Interna de Prevenção de Acidentes)
- Buscar apoio no sindicato da categoria

### 3. Órgãos externos para denúncia

Se os canais internos não funcionarem, procure:

- **Ministério Público do Trabalho**: Realiza investigações e pode propor Termos de Ajuste de Conduta
- **Sindicato da categoria**: Pode intermediar a situação e oferecer apoio jurídico
- **Superintendência Regional do Trabalho**: Fiscalização do ambiente de trabalho
- **Delegacia do Trabalho**: Em casos extremos que envolvam violência

### 4. Ação judicial

O processo judicial pode ocorrer por diferentes vias:

- **Justiça do Trabalho**: Para pleitear rescisão indireta e indenizações
- **Justiça Comum**: Em casos graves que configurem crimes como injúria, difamação, ameaça

### 5. Cuidados com a saúde

Paralelamente às medidas legais, é essencial:

- Buscar ajuda psicológica ou psiquiátrica
- Solicitar afastamento médico se necessário
- Estabelecer rede de apoio com familiares e amigos
- Praticar autocuidado e atividades que promovam bem-estar

## Processo trabalhista por assédio moral

### Prazos

- **Prazo prescricional**: O trabalhador tem até 2 anos após o término do contrato para ingressar com ação trabalhista, podendo reclamar direitos dos últimos 5 anos

### Provas aceitas na Justiça do Trabalho

- Depoimentos de testemunhas
- E-mails, mensagens de texto, gravações (com algumas restrições)
- Documentos internos da empresa
- Laudos médicos e psicológicos
- Atas de reuniões
- Avaliações de desempenho contraditórias

### Estimativa de valores de indenização

A Reforma Trabalhista (Lei 13.467/2017) estabeleceu parâmetros para indenização por danos morais, baseados no salário do ofendido:

- Ofensa leve: até 3 vezes o último salário
- Ofensa média: até 5 vezes o último salário
- Ofensa grave: até 20 vezes o último salário
- Ofensa gravíssima: até 50 vezes o último salário

Na prática, entretanto, o STF já sinalizou que esses limites podem ser inconstitucionais, e muitos juízes consideram outros fatores como:

- Gravidade do assédio
- Duração da conduta
- Intensidade do sofrimento
- Capacidade econômica do empregador
- Grau de culpa do agressor
- Possíveis sequelas permanentes

## Jurisprudência relevante sobre assédio moral

### Decisões importantes dos tribunais

- **TST-RR-1292-45.2012.5.15.0002**: Reconheceu a configuração de assédio moral organizacional em caso de política agressiva de metas com exposição dos funcionários
  
- **TST-RR-114500-92.2013.5.13.0007**: Estabeleceu que o assédio moral horizontal também é responsabilidade da empresa quando não toma providências
  
- **TST-RR-1034-74.2014.5.20.0004**: Reconheceu que a prática de "lista negra" de empregados com problemas de saúde configura assédio moral
  
- **TST-ARR-1081-60.2012.5.03.0042**: Determinou que o nexo causal entre assédio e doenças psicológicas justifica reconhecimento de doença ocupacional

### Entendimentos consolidados

- A exigência normal de metas, sem constrangimentos, não caracteriza assédio
- Um episódio isolado geralmente não configura assédio moral, mas pode caracterizar dano moral
- A pessoa jurídica responde objetivamente pelos atos de seus prepostos
- A reversão de justa causa não presume assédio moral

## Prevenção do assédio moral nas empresas

### Medidas preventivas recomendadas

- Implementação de códigos de ética e conduta claros
- Treinamento de líderes em gestão de pessoas
- Criação de canais de denúncia anônimos e efetivos
- Política de tolerância zero ao assédio
- Investigação imparcial das denúncias
- Programas de qualidade de vida e saúde mental
- Avaliações periódicas do clima organizacional
- Metas razoáveis e estabelecidas com transparência

### Benefícios da prevenção

- Ambiente de trabalho saudável e produtivo
- Redução de rotatividade e absenteísmo
- Maior engajamento e motivação dos colaboradores
- Melhoria da imagem institucional
- Diminuição de riscos jurídicos e financeiros
- Cumprimento da função social da empresa

## Considerações finais

O assédio moral no trabalho é uma violação à dignidade humana e traz consequências graves não apenas para as vítimas, mas também para as organizações e a sociedade como um todo. Reconhecer os sinais, documentar as ocorrências e buscar ajuda são passos fundamentais para enfrentar esta situação.

Embora a comprovação do assédio moral seja frequentemente desafiadora, o sistema jurídico brasileiro tem avançado no reconhecimento deste problema e na proteção das vítimas. Paralelamente às medidas legais, é essencial que as empresas desenvolvam culturas organizacionais que não tolerem comportamentos abusivos e promovam relações de trabalho baseadas no respeito mútuo.

Todo trabalhador tem direito a um ambiente de trabalho digno e saudável, e a luta contra o assédio moral é parte fundamental da promoção da saúde ocupacional e dos direitos humanos no contexto laboral.
    `,
    imageUrl: "https://images.unsplash.com/photo-1520809227329-2f94844a9635?auto=format&fit=crop&w=800&q=80",
    publishDate: "2025-02-08",
    categoryId: workCategory.id,
    featured: 0
  };
  
  await addArticle(assedioArticle);
}

// Função principal de execução
async function main() {
  try {
    console.log('Contagem de artigos por categoria antes das adições:');
    console.log(await countArticlesByCategory());
    
    // Adicionar artigos
    await addDivorcioArticle();
    await addAssedioMoralArticle();
    
    console.log('\nContagem de artigos por categoria após as adições:');
    console.log(await countArticlesByCategory());
    
    console.log('\nArtigos adicionados com sucesso!');
  } catch (error) {
    console.error('Erro na execução:', error);
  }
}

// Exportar as funções para uso externo
export {
  addArticle,
  getCategories,
  countArticlesByCategory,
  addDivorcioArticle,
  addAssedioMoralArticle,
  main
};