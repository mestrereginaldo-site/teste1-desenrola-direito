/**
 * Script para verificar artigos por categoria
 */
import pg from 'pg';
const { Pool } = pg;

// Obter conexão com banco de dados
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function checkArticlesByCategory(categoryId) {
  const client = await pool.connect();
  
  try {
    console.log(`\nVerificando artigos da categoria ID ${categoryId}...`);
    
    // Obter nome da categoria
    const categoryResult = await client.query(
      `SELECT name FROM categories WHERE id = $1`, 
      [categoryId]
    );
    
    if (categoryResult.rows.length === 0) {
      console.log(`Categoria ID ${categoryId} não encontrada.`);
      return;
    }
    
    const categoryName = categoryResult.rows[0].name;
    console.log(`\nCategoria: ${categoryName} (ID: ${categoryId})`);
    
    // Obter artigos da categoria
    const articlesResult = await client.query(`
      SELECT id, title, slug, LENGTH(content) as content_length
      FROM articles 
      WHERE category_id = $1
      ORDER BY id
    `, [categoryId]);
    
    if (articlesResult.rows.length === 0) {
      console.log(`Nenhum artigo encontrado para a categoria ${categoryName}.`);
      return;
    }
    
    console.log(`\n${articlesResult.rows.length} artigos encontrados:`);
    articlesResult.rows.forEach(article => {
      console.log(`ID: ${article.id}, Slug: ${article.slug}, Título: ${article.title}, Tamanho: ${article.content_length} caracteres`);
    });
    
    // Encontrar slug da categoria para verificar a API
    const catSlugResult = await client.query(
      `SELECT slug FROM categories WHERE id = $1`, 
      [categoryId]
    );
    
    if (catSlugResult.rows.length > 0) {
      const categorySlug = catSlugResult.rows[0].slug;
      console.log(`\nVerificando artigos via API para categoria ${categorySlug}...`);
      
      const response = await fetch(`http://localhost:5000/api/articles/category/${categorySlug}`);
      const apiArticles = await response.json();
      
      if (Array.isArray(apiArticles)) {
        console.log(`API retornou ${apiArticles.length} artigos para a categoria ${categorySlug}.`);
        if (apiArticles.length !== articlesResult.rows.length) {
          console.log(`⚠️ Discrepância no número de artigos: ${articlesResult.rows.length} no banco vs ${apiArticles.length} na API`);
        }
        
        apiArticles.forEach(article => {
          console.log(`- API: ${article.id}, Slug: ${article.slug}, Título: ${article.title}`);
        });
      } else {
        console.log(`❌ API não retornou uma lista para categoria ${categorySlug}`);
      }
    }
  } catch (error) {
    console.error('Erro durante a verificação:', error);
  } finally {
    client.release();
  }
}

// Verificar categorias relevantes
const categoryIds = [6]; // Direito Penal (ID 6)

async function main() {
  for (const categoryId of categoryIds) {
    await checkArticlesByCategory(categoryId);
  }
}

main()
  .catch(err => {
    console.error('Erro fatal na execução do script:', err);
  })
  .finally(() => {
    console.log('\nScript finalizado.');
    process.exit(0);
  });