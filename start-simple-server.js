/**
 * Script para iniciar o servidor simples após o servidor principal já ter inicializado
 */
import { setTimeout } from 'timers/promises';
import { exec } from 'child_process';

async function main() {
  try {
    // Aguardar para garantir que o servidor principal tenha iniciado
    await setTimeout(5000);
    
    // Matar qualquer instância anterior do servidor simples
    exec('pkill -f "node simple-server.cjs" || true', (error) => {
      if (error) {
        console.log('Não havia instâncias anteriores do servidor simples rodando.');
      } else {
        console.log('Instâncias anteriores do servidor simples foram encerradas.');
      }
      
      // Reiniciar o fluxo de trabalho principal
      console.log('Reiniciando o workflow principal...');
      exec('touch .replit.restart');
      
      // Aguardar mais um pouco para garantir que o workflow foi reiniciado
      setTimeout(() => {
        // Agora iniciar o servidor simples na porta 3001
        exec('node simple-server.cjs &', (error, stdout, stderr) => {
          if (error) {
            console.error(`Erro ao iniciar o servidor simples: ${error}`);
            return;
          }
          console.log('Servidor simples iniciado com sucesso!');
          console.log(stdout);
        });
      }, 2000);
    });
  } catch (error) {
    console.error('Erro:', error);
  }
}

main();