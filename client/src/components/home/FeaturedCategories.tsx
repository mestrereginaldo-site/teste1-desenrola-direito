import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { categoryFallbackImages, processImageUrl } from "@/lib/imageUtils";
import { Category } from "@shared/schema";

// Define a interface que será usada nas categorias
interface CategoryWithImage {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  iconName: string | null;
  imageUrl: string | null;
}

export default function FeaturedCategories() {
  const { data: categories = [], isLoading } = useQuery<CategoryWithImage[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section id="categorias" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-primary mb-8">Áreas do Direito</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Função para obter a imagem correta da categoria
  const getCategoryImage = (category: CategoryWithImage) => {
    // Usar a imagem da categoria se existir
    if (category.imageUrl) {
      return processImageUrl(category.imageUrl);
    }
    
    // Caso contrário, usar imagem de fallback baseada no slug
    return categoryFallbackImages[category.slug as keyof typeof categoryFallbackImages] || 
      'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=800&q=80';
  };

  return (
    <section id="categorias" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-primary mb-8">Áreas do Direito</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-gradient-to-r from-primary to-[#00A3B4] rounded-lg overflow-hidden shadow-lg text-white">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-8">
                  <h3 className="text-3xl font-bold mb-4">{category.name}</h3>
                  <p className="mb-6">{category.description}</p>
                  <Link href={`/categorias/${category.slug}`} className="inline-flex items-center text-white font-medium">
                    Saiba mais
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
                <div className="md:w-1/2 h-56 md:h-auto bg-blue-800 overflow-hidden">
                  <div className="w-full h-full bg-blue-900/50 flex items-center justify-center">
                    <img 
                      src={getCategoryImage(category)} 
                      alt={category.name} 
                      className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                      onError={(e) => {
                        // Fallback em caso de erro de carregamento
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
