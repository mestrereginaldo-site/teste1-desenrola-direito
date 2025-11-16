// Servidor simplificado na porta 80
import express from 'express';

const app = express();
const port = 80;

app.get('/', (req, res) => {
  res.send('Servidor Desenrola Direito funcionando na porta 80!');
});

// Iniciar o servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor iniciado na porta ${port}`);
});