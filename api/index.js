// API para Vercel - versão simplificada
export default async function handler(req, res) {
  // Health check básico
  if (req.method === 'GET' && req.url === '/api/health') {
    return res.status(200).json({ 
      status: 'OK', 
      message: 'Desenrola Direito API funcionando!',
      timestamp: new Date().toISOString()
    });
  }
  
  // Se chegou aqui, a rota não existe
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.url 
  });
}
