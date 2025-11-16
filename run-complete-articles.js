/**
 * Script para executar a adição dos artigos complementares
 * Este script importa e executa as funções do complete-articles.js
 */

import { main } from './complete-articles.js';

// Executar o script principal
console.log('Iniciando adição dos artigos complementares...');
main()
  .then(() => {
    console.log('Todos os artigos foram adicionados com sucesso!');
  })
  .catch(error => {
    console.error('Erro ao adicionar artigos:', error);
  });