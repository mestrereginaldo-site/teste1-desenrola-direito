/**
 * Função para ajudar no carregamento de imagens externas
 * Garante que URLs corrompidas ou falhas no carregamento são tratadas
 */

export function processImageUrl(url: string | null | undefined): string {
  // Se não houver URL, use uma imagem de fallback
  if (!url) {
    return 'https://images.unsplash.com/photo-1598618356794-eb1720430eb4?auto=format&fit=crop&w=800&q=80';
  }

  // Força a imagem para o artigo de legítima defesa
  if (url.includes('photo-1589216996730-15c1486d8590')) {
    return 'https://images.unsplash.com/photo-1583148513633-f6363a0922dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
  }
  
  // Se estamos na página de legítima defesa, mesmo que a URL seja diferente
  if (typeof window !== 'undefined' && 
      window.location.pathname && 
      window.location.pathname.includes('legitima-defesa-limites-legais')) {
    return 'https://images.unsplash.com/photo-1583148513633-f6363a0922dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
  }

  // Se a URL não tiver parâmetros de qualidade/dimensões, adicione
  if (url.includes('unsplash.com') && !url.includes('?')) {
    return `${url}?auto=format&fit=crop&w=800&q=80`;
  }

  // Retorne a URL original se já estiver formatada
  return url;
}

// Lista de fallbacks por categoria para garantir que sempre haverá uma imagem
export const categoryFallbackImages = {
  'direito-consumidor': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
  'direito-trabalhista': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80', 
  'direito-medico': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
  'direito-penal': 'https://images.unsplash.com/photo-1583148513633-f6363a0922dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  'direito-familia': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
  'direito-previdenciario': 'https://images.unsplash.com/photo-1494961104209-3c223057bd26?auto=format&fit=crop&w=800&q=80'
};