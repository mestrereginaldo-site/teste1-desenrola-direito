import * as http from 'http';

// Verificar a conexão na porta 5000
function checkServerConnection() {
  console.log('Tentando verificar conexão com o servidor na porta 5000...');
  
  // Opções da requisição
  const options = {
    hostname: '0.0.0.0',
    port: 5000,
    path: '/',
    method: 'GET',
    timeout: 5000 // 5 segundos de timeout
  };
  
  // Realizar a requisição
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    
    res.setEncoding('utf8');
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
      console.log(`BODY: Recebeu ${chunk.length} bytes`);
    });
    
    res.on('end', () => {
      console.log('RESPOSTA COMPLETA RECEBIDA');
      console.log(`✅ Servidor está funcionando corretamente na porta 5000!`);
    });
  });
  
  req.on('error', (e) => {
    console.error(`❌ ERRO DE CONEXÃO: ${e.message}`);
    console.log('🔍 Verifique se:');
    console.log('  1. O servidor está realmente rodando na porta 5000');
    console.log('  2. A aplicação está ouvindo no endereço 0.0.0.0 e não apenas em localhost');
    console.log('  3. Não há firewalls ou outras restrições bloqueando a conexão');
  });
  
  req.on('timeout', () => {
    console.error('❌ TIMEOUT: A conexão demorou demais para responder');
    req.destroy();
  });
  
  req.end();
}

// Executar a verificação
checkServerConnection();