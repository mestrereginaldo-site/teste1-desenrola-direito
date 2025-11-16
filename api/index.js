import express, { type Request, Response, NextFunction } from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Apenas middleware essencial para API
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Em produção na Vercel, servimos apenas APIs
// O frontend React é servido estaticamente pela Vercel

// Rota de health check para Vercel
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Export para Vercel
export default app;
