/**
 * Script para forçar atualização dos artigos e tornar visíveis as mudanças
 */
import pg from 'pg';
const { Pool } = pg;

// Obter conexão com banco de dados
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function forceUpdate() {
  const client = await pool.connect();
  
  try {
    console.log('Iniciando atualização forçada dos artigos...');
    
    // 1. Verificar artigos expandidos em Direito Penal
    const direitoPenal = await client.query(`
      SELECT id, title, LENGTH(content) as tamanho, LENGTH(content)/6 as palavras_aprox 
      FROM articles 
      WHERE category_id = 6
      ORDER BY id
    `);
    
    console.log('Artigos de Direito Penal:');
    direitoPenal.rows.forEach(row => {
      console.log(`ID: ${row.id}, Título: ${row.title}, Palavras: ${row.palavras_aprox}`);
    });
    
    // 2. Verificar artigos expandidos em Direito Familiar
    const direitoFamiliar = await client.query(`
      SELECT id, title, LENGTH(content) as tamanho, LENGTH(content)/6 as palavras_aprox 
      FROM articles 
      WHERE category_id = 4
      ORDER BY id
    `);
    
    console.log('\nArtigos de Direito Familiar:');
    direitoFamiliar.rows.forEach(row => {
      console.log(`ID: ${row.id}, Título: ${row.title}, Palavras: ${row.palavras_aprox}`);
    });
    
    // 3. Verificar artigos expandidos em Direito do Consumidor
    const direitoConsumidor = await client.query(`
      SELECT id, title, LENGTH(content) as tamanho, LENGTH(content)/6 as palavras_aprox 
      FROM articles 
      WHERE category_id = 1
      ORDER BY id
    `);
    
    console.log('\nArtigos de Direito do Consumidor:');
    direitoConsumidor.rows.forEach(row => {
      console.log(`ID: ${row.id}, Título: ${row.title}, Palavras: ${row.palavras_aprox}`);
    });
    
    // Forçar uma pequena atualização para renovar cache
    await client.query(`
      UPDATE articles SET publish_date = publish_date WHERE id > 0;
    `);
    
    console.log('\nAtualização simbólica concluída para forçar renovação de cache.');
    
    console.log('\nScript concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante a execução do script:', error);
  } finally {
    client.release();
  }
}

// Executar função principal
forceUpdate()
  .catch(err => {
    console.error('Erro fatal na execução do script:', err);
  })
  .finally(() => {
    console.log('Script finalizado.');
    process.exit(0);
  });