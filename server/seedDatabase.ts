import { categories, articles, solutions } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Função principal para verificar e popular o banco
export async function seedDatabase() {
  console.log("Verificando se o banco de dados precisa ser populado...");
  
  // Verificar se o banco de dados está vazio
  const existingCategories = await db.select().from(categories);
  
  if (existingCategories.length > 0) {
    console.log("Banco de dados já populado. Ignorando seed.");
    return;
  }
  
  console.log("Banco de dados vazio. Iniciando população com dados iniciais...");
  
  try {
    // Criar categorias
    console.log("Criando categorias...");
    const consumerCategory = await createCategory("Direito do Consumidor", "direito-consumidor", 
      "Saiba como resolver problemas com empresas, garantir seus direitos nas compras e obter ressarcimento por produtos defeituosos.", 
      "fa-gavel");
    
    const laborCategory = await createCategory("Direito Trabalhista", "direito-trabalhista", 
      "Conheça seus direitos no ambiente de trabalho, rescisão, horas extras, assédio e mais. Saiba quando você pode reivindicar.", 
      "fa-briefcase");
    
    const realEstateCategory = await createCategory("Direito Imobiliário", "direito-imobiliario", 
      "Tudo sobre contratos de aluguel, compra e venda de imóveis, financiamentos e como evitar armadilhas neste setor.", 
      "fa-home");
    
    const familyCategory = await createCategory("Direito Familiar", "direito-familiar", 
      "Orientações sobre divórcio, pensão alimentícia, guarda de filhos, inventário e outros assuntos relacionados à família.", 
      "fa-users");
    
    const socialSecurityCategory = await createCategory("Direito Previdenciário", "direito-previdenciario", 
      "Informações sobre aposentadoria, benefícios, auxílios e como garantir seus direitos junto ao INSS.", 
      "fa-shield-alt");

    const criminalCategory = await createCategory("Direito Penal", "direito-penal",
      "Informações sobre crimes, processos penais, defesa criminal e direitos do acusado.", 
      "fa-balance-scale");
    
    // Criar artigos para cada categoria
    console.log("Criando artigos para cada categoria...");

    // Artigos de Direito do Consumidor
    for (let i = 1; i <= 5; i++) {
      await createArticle(
        `Artigo ${i} de Direito do Consumidor`,
        `artigo-${i}-direito-consumidor`,
        `Este é um resumo do artigo ${i} sobre direito do consumidor.`,
        `# Artigo ${i} - Direito do Consumidor

Este é o conteúdo completo do artigo ${i} sobre direito do consumidor. 
Aqui seriam explicados vários aspectos importantes sobre os direitos do consumidor.

## Seção 1

Conteúdo detalhado explicando aspectos importantes.

## Seção 2

Mais informações relevantes para o consumidor.

## Conclusão

Resumo dos pontos principais apresentados no artigo.`,
        `https://example.com/images/consumer-${i}.jpg`,
        new Date(),
        consumerCategory.id,
        i === 1 ? 1 : 0
      );
      console.log(`Artigo ${i} criado para categoria Direito do Consumidor`);
    }

    // Artigos de Direito Trabalhista
    for (let i = 1; i <= 5; i++) {
      await createArticle(
        `Artigo ${i} de Direito Trabalhista`,
        `artigo-${i}-direito-trabalhista`,
        `Este é um resumo do artigo ${i} sobre direito trabalhista.`,
        `# Artigo ${i} - Direito Trabalhista

Este é o conteúdo completo do artigo ${i} sobre direito trabalhista.
Aqui seriam explicados vários aspectos importantes sobre os direitos do trabalhador.

## Seção 1

Conteúdo detalhado explicando aspectos importantes.

## Seção 2

Mais informações relevantes para o trabalhador.

## Conclusão

Resumo dos pontos principais apresentados no artigo.`,
        `https://example.com/images/labor-${i}.jpg`,
        new Date(),
        laborCategory.id,
        i === 1 ? 1 : 0
      );
      console.log(`Artigo ${i} criado para categoria Direito Trabalhista`);
    }

    // Artigos de Direito Imobiliário
    for (let i = 1; i <= 5; i++) {
      await createArticle(
        `Artigo ${i} de Direito Imobiliário`,
        `artigo-${i}-direito-imobiliario`,
        `Este é um resumo do artigo ${i} sobre direito imobiliário.`,
        `# Artigo ${i} - Direito Imobiliário

Este é o conteúdo completo do artigo ${i} sobre direito imobiliário.
Aqui seriam explicados vários aspectos importantes sobre os direitos relacionados a imóveis.

## Seção 1

Conteúdo detalhado explicando aspectos importantes.

## Seção 2

Mais informações relevantes para proprietários e inquilinos.

## Conclusão

Resumo dos pontos principais apresentados no artigo.`,
        `https://example.com/images/realestate-${i}.jpg`,
        new Date(),
        realEstateCategory.id,
        i === 1 ? 1 : 0
      );
      console.log(`Artigo ${i} criado para categoria Direito Imobiliário`);
    }

    // Artigos de Direito Familiar
    for (let i = 1; i <= 5; i++) {
      await createArticle(
        `Artigo ${i} de Direito Familiar`,
        `artigo-${i}-direito-familiar`,
        `Este é um resumo do artigo ${i} sobre direito familiar.`,
        `# Artigo ${i} - Direito Familiar

Este é o conteúdo completo do artigo ${i} sobre direito familiar.
Aqui seriam explicados vários aspectos importantes sobre os direitos da família.

## Seção 1

Conteúdo detalhado explicando aspectos importantes.

## Seção 2

Mais informações relevantes para assuntos familiares.

## Conclusão

Resumo dos pontos principais apresentados no artigo.`,
        `https://example.com/images/family-${i}.jpg`,
        new Date(),
        familyCategory.id,
        i === 1 ? 1 : 0
      );
      console.log(`Artigo ${i} criado para categoria Direito Familiar`);
    }

    // Artigos de Direito Previdenciário
    for (let i = 1; i <= 5; i++) {
      await createArticle(
        `Artigo ${i} de Direito Previdenciário`,
        `artigo-${i}-direito-previdenciario`,
        `Este é um resumo do artigo ${i} sobre direito previdenciário.`,
        `# Artigo ${i} - Direito Previdenciário

Este é o conteúdo completo do artigo ${i} sobre direito previdenciário.
Aqui seriam explicados vários aspectos importantes sobre os direitos previdenciários.

## Seção 1

Conteúdo detalhado explicando aspectos importantes.

## Seção 2

Mais informações relevantes para aposentados e beneficiários.

## Conclusão

Resumo dos pontos principais apresentados no artigo.`,
        `https://example.com/images/socialsecurity-${i}.jpg`,
        new Date(),
        socialSecurityCategory.id,
        i === 1 ? 1 : 0
      );
      console.log(`Artigo ${i} criado para categoria Direito Previdenciário`);
    }

    // Artigos de Direito Penal
    for (let i = 1; i <= 5; i++) {
      await createArticle(
        `Artigo ${i} de Direito Penal`,
        `artigo-${i}-direito-penal`,
        `Este é um resumo do artigo ${i} sobre direito penal.`,
        `# Artigo ${i} - Direito Penal

Este é o conteúdo completo do artigo ${i} sobre direito penal.
Aqui seriam explicados vários aspectos importantes sobre processos criminais.

## Seção 1

Conteúdo detalhado explicando aspectos importantes.

## Seção 2

Mais informações relevantes sobre procedimentos penais.

## Conclusão

Resumo dos pontos principais apresentados no artigo.`,
        `https://example.com/images/criminal-${i}.jpg`,
        new Date(),
        criminalCategory.id,
        i === 1 ? 1 : 0
      );
      console.log(`Artigo ${i} criado para categoria Direito Penal`);
    }
    
    // Criar soluções
    console.log("Criando soluções...");
    await createSolution(
      "Consultoria Jurídica Online",
      "Atendimento com advogados especializados por videoconferência, chat ou WhatsApp.",
      "https://example.com/images/consultoria.jpg",
      "/consultoria",
      "Agendar Consulta"
    );
    
    await createSolution(
      "Revisão de Contratos",
      "Analise seus contratos antes de assinar e evite problemas futuros.",
      "https://example.com/images/contratos.jpg",
      "/revisao-contratos",
      "Solicitar Revisão"
    );
    
    await createSolution(
      "Calculadora de Direitos",
      "Ferramenta para calcular rescisões, aposentadorias, pensões e mais.",
      "https://example.com/images/calculadora.jpg",
      "/calculadoras",
      "Usar Calculadoras"
    );

    console.log("População do banco de dados concluída com sucesso!");
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
    throw error;
  }
}

// Função auxiliar para criar categorias
async function createCategory(name: string, slug: string, description: string, iconName: string) {
  const [category] = await db.insert(categories)
    .values({ name, slug, description, iconName })
    .returning();
  
  console.log(`Categoria criada: ${name}`);
  return category;
}

// Função auxiliar para criar artigos
async function createArticle(
  title: string, 
  slug: string, 
  excerpt: string, 
  content: string, 
  imageUrl: string, 
  publishDate: Date, 
  categoryId: number,
  featured: number
) {
  const [article] = await db.insert(articles)
    .values({ 
      title, 
      slug, 
      excerpt, 
      content, 
      imageUrl, 
      publishDate, 
      categoryId,
      featured
    })
    .returning();
  
  return article;
}

// Função auxiliar para criar soluções
async function createSolution(
  title: string,
  description: string,
  imageUrl: string,
  link: string,
  linkText: string
) {
  const [solution] = await db.insert(solutions)
    .values({ title, description, imageUrl, link, linkText })
    .returning();
  
  console.log(`Solução criada: ${title}`);
  return solution;
}