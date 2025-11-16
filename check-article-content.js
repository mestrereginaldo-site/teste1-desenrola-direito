/**
 * Script para verificar o conteúdo de artigos específicos
 */
import pg from 'pg';
const { Pool } = pg;

// Obter conexão com banco de dados
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function checkArticleContent(id) {
  const client = await pool.connect();
  
  try {
    console.log(`Verificando artigo ID ${id}...`);
    
    const result = await client.query(`
      SELECT id, title, slug, category_id, 
             LENGTH(content) as content_length, 
             LEFT(content, 100) as content_preview
      FROM articles 
      WHERE id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      console.log(`Artigo ID ${id} não encontrado.`);
      return;
    }
    
    const article = result.rows[0];
    console.log(`ID: ${article.id}`);
    console.log(`Título: ${article.title}`);
    console.log(`Slug: ${article.slug}`);
    console.log(`Categoria ID: ${article.category_id}`);
    console.log(`Tamanho do conteúdo: ${article.content_length} caracteres`);
    console.log(`Prévia do conteúdo: ${article.content_preview}...`);
    
    console.log('\nVerificando o conteúdo no endpoint da API...');
    const response = await fetch(`http://localhost:5000/api/articles/${article.slug}`);
    const apiArticle = await response.json();
    
    if (apiArticle && apiArticle.content) {
      console.log(`Tamanho do conteúdo na API: ${apiArticle.content.length} caracteres`);
      console.log(`Prévia do conteúdo na API: ${apiArticle.content.substring(0, 100)}...`);
      
      if (apiArticle.content.length === article.content_length) {
        console.log('✅ O conteúdo no banco de dados e na API têm o mesmo tamanho!');
      } else {
        console.log('❌ Discrepância no tamanho do conteúdo entre banco de dados e API!');
        console.log(`   Banco: ${article.content_length}, API: ${apiArticle.content.length}`);
      }
    } else {
      console.log('❌ Erro ao obter artigo da API ou conteúdo ausente');
    }
  } catch (error) {
    console.error('Erro durante a verificação:', error);
  } finally {
    client.release();
  }
}

// Artigo a ser verificado (ID 26 - Artigo 1 sobre Direito Penal)
const articleId = process.argv[2] ? parseInt(process.argv[2]) : 26;
checkArticleContent(articleId)
  .catch(err => {
    console.error('Erro fatal na execução do script:', err);
  })
  .finally(() => {
    console.log('Script finalizado.');
    process.exit(0);
  });