// Servidor de teste extremamente simples para verificar se o Replit consegue detectar
import express from 'express';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Servidor de teste funcionando! Desenrola Direito');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor de teste rodando na porta ${port}`);
});