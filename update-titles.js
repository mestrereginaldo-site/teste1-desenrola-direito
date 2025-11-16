/**
 * Script para atualizar os títulos e slugs dos artigos no banco de dados
 * para corresponder aos que estavam sendo servidos pelo MemStorage
 */
import pg from 'pg';
const { Pool } = pg;

// Obter conexão com banco de dados
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Arrays com os artigos melhores
const articlesToUpdate = [
  {
    id: 1,
    title: "Golpes online: Como identificar e evitar fraudes ao consumidor",
    slug: "golpes-online-fraudes-consumidor",
    excerpt: "Aprenda a identificar e evitar os principais golpes online, conheça seus direitos como consumidor digital e saiba como proceder caso seja vítima de fraudes."
  },
  {
    id: 6,
    title: "Demissão sem justa causa: O que você precisa saber",
    slug: "demissao-sem-justa-causa",
    excerpt: "Entenda seus direitos durante uma demissão sem justa causa, quais verbas rescisórias você tem direito e como calcular."
  },
  {
    id: 7,
    title: "Assédio moral no trabalho: Como identificar e agir",
    slug: "assedio-moral-trabalho",
    excerpt: "Aprenda a identificar situações de assédio moral, seus direitos como trabalhador e as medidas legais para se proteger."
  },
  {
    id: 8,
    title: "Jornada de trabalho: Horas extras, banco de horas e direitos do trabalhador",
    slug: "jornada-trabalho-horas-extras",
    excerpt: "Um guia completo sobre jornada de trabalho, pagamento de horas extras, funcionamento do banco de horas e os direitos dos trabalhadores após a reforma trabalhista."
  },
  {
    id: 26,
    title: "Legítima defesa: Quando é permitido se defender?",
    slug: "legitima-defesa-direito-penal",
    excerpt: "Entenda quando a lei brasileira permite o uso da legítima defesa, quais são seus requisitos e limites legais."
  },
  {
    id: 11,
    title: "Compra de imóvel: Cuidados essenciais antes de fechar negócio",
    slug: "compra-imovel-cuidados-essenciais",
    excerpt: "Conheça os principais cuidados ao adquirir um imóvel, documentação necessária e como evitar problemas futuros."
  },
  {
    id: 16,
    title: "Guarda compartilhada: O que é e como funciona na prática",
    slug: "guarda-compartilhada-o-que-e",
    excerpt: "Saiba o que é guarda compartilhada, como funciona, seus benefícios e como é determinada pela justiça."
  },
  {
    id: 17,
    title: "Alienação parental: Como identificar e o que fazer juridicamente",
    slug: "alienacao-parental-como-identificar",
    excerpt: "Aprenda a reconhecer sinais de alienação parental, os impactos nas crianças e as medidas legais disponíveis."
  },
  {
    id: 21,
    title: "Auxílio-doença: Como solicitar, requisitos e documentos necessários",
    slug: "auxilio-doenca-como-solicitar",
    excerpt: "Guia completo sobre como solicitar o auxílio-doença, quem tem direito, documentação necessária e prazos de concessão."
  },
  {
    id: 22,
    title: "Aposentadoria por tempo de contribuição: Regras e cálculos após a reforma",
    slug: "aposentadoria-tempo-contribuicao",
    excerpt: "Entenda as novas regras para aposentadoria por tempo de contribuição após a reforma da previdência."
  }
];

async function updateArticles() {
  const client = await pool.connect();
  
  try {
    console.log('Iniciando atualização dos títulos e slugs dos artigos...');
    
    for (const article of articlesToUpdate) {
      console.log(`Atualizando artigo ID ${article.id}: "${article.title}"`);
      
      await client.query(`
        UPDATE articles 
        SET title = $1, slug = $2, excerpt = $3
        WHERE id = $4
      `, [article.title, article.slug, article.excerpt, article.id]);
    }
    
    console.log('\nAtualização concluída com sucesso!');
    console.log(`${articlesToUpdate.length} artigos foram atualizados.`);
    
  } catch (error) {
    console.error('Erro durante a atualização:', error);
  } finally {
    client.release();
  }
}

// Executar a atualização
updateArticles()
  .catch(err => {
    console.error('Erro fatal na execução do script:', err);
  })
  .finally(() => {
    console.log('Script finalizado.');
    process.exit(0);
  });