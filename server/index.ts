// Servidor simplificado para Vercel
import express from 'express';

const app = express();

// Middleware básico
app.use(express.json());

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando',
    environment: process.env.NODE_ENV 
  });
});

// Export para build
export default app;
