import { Link } from "wouter";
import { formatDate } from "@/lib/utils";
import CategoryBadge from "../shared/CategoryBadge";
import { processImageUrl, categoryFallbackImages } from "@/lib/imageUtils";

interface ArticleCardProps {
  article: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    imageUrl?: string;
    publishDate: string | Date;
    category: {
      id: number;
      name: string;
      slug: string;
    };
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const getFallbackImage = () => {
    // Use a imagem da categoria como fallback ou a imagem padrão
    return categoryFallbackImages[article.category.slug as keyof typeof categoryFallbackImages] || 
      'https://images.unsplash.com/photo-1598618356794-eb1720430eb4?auto=format&fit=crop&w=800&q=80';
  };
  
  // Usa o processador de imagem para garantir que a URL seja válida
  // Para o artigo de legítima defesa, usamos uma imagem específica
  let imageUrl = processImageUrl(article.imageUrl) || getFallbackImage();
  
  // Regras específicas para artigos específicos
  if (article.slug === 'legitima-defesa-limites-legais') {
    imageUrl = 'https://images.unsplash.com/photo-1583148513633-f6363a0922dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
  } else if (article.slug === 'alienacao-parental-como-identificar') {
    // Usar a imagem específica para alienação parental
    imageUrl = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=800&q=80';
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
      <div className="h-48 bg-gray-200">
        <img 
          src={imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback em caso de erro de carregamento
            e.currentTarget.src = getFallbackImage();
          }}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <CategoryBadge category={article.category} />
          <span className="ml-3">{formatDate(new Date(article.publishDate))}</span>
        </div>
        <h4 className="font-bold text-xl mb-3">{article.title}</h4>
        <p className="text-gray-600 mb-4">{article.excerpt}</p>
        <Link href={`/artigos/${article.slug}`} className="text-primary font-medium hover:underline flex items-center">
          Ler artigo
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
