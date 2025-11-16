import express from 'express';
import { storage } from './server/storage.js';

const app = express();
const PORT = 5001;

// Middleware para parsear JSON
app.use(express.json({ limit: '50mb' }));

// Rota para adicionar um novo artigo
app.post('/api/add-article', async (req, res) => {
  try {
    const articleData = req.body;
    
    // Converter string de data para objeto Date
    if (articleData.publishDate) {
      articleData.publishDate = new Date(articleData.publishDate);
    }
    
    const article = await storage.createArticle(articleData);
    res.status(201).json({ success: true, article });
  } catch (error) {
    console.error('Erro ao adicionar artigo:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor temporário rodando na porta ${PORT}`);
});