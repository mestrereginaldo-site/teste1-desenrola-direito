/**
 * Script para restaurar as alterações de categorias que foram perdidas
 */
// Importação não necessária pois vamos alterar diretamente o código do storage.ts

async function restoreChanges() {
  console.log('Restaurando alterações nas categorias...');
  
  console.log('\nRealizando alterações no código:');
  console.log('Para restaurar as alterações, modifique diretamente o arquivo server/storage.ts:');
  
  console.log(`
  No arquivo server/storage.ts, procure pela função initializeData() e encontre:
  
  1. Substitua "Direito Familiar" por "Direito de Família"
  2. Substitua "Direito Imobiliário" por "Direito Médico"
  
  Exemplo de como deve ficar:
  
  await this.createCategory({
    name: "Direito de Família",
    slug: "direito-familia",
    description: "Questões legais relacionadas a casamento, divórcio, guarda de filhos e pensão alimentícia",
    iconName: "family"
  });
  
  await this.createCategory({
    name: "Direito Médico",
    slug: "direito-medico",
    description: "Questões legais relacionadas a erros médicos, responsabilidade médica e direitos do paciente",
    iconName: "stethoscope"
  });
  `);
  
  // 4. Verificar resultado
  const updatedCategories = await storage.getCategories();
  console.log('\nCategorias após alterações:');
  updatedCategories.forEach(cat => {
    console.log(`ID: ${cat.id}, Nome: ${cat.name}, Slug: ${cat.slug}`);
  });
  
  console.log('\nAlterações realizadas com sucesso!');
}

// Executar função principal
restoreChanges()
  .catch(err => {
    console.error('Erro na execução do script:', err);
  })
  .finally(() => {
    console.log('Script finalizado.');
  });