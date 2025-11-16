import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useLocation } from "wouter";
import ArticleCard from "@/components/articles/ArticleCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryArticles() {
  const { slug } = useParams();
  const [, navigate] = useLocation();
  
  const { 
    data: category,
    isLoading: isCategoryLoading,
    error: categoryError
  } = useQuery({
    queryKey: [`/api/categories/${slug}`],
  });

  const { 
    data: articles = [],
    isLoading: isArticlesLoading,
    error: articlesError
  } = useQuery({
    queryKey: [`/api/articles/category/${slug}`],
  });

  const isLoading = isCategoryLoading || isArticlesLoading;
  const error = categoryError || articlesError;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-12 w-1/3 mb-2" />
        <Skeleton className="h-6 w-2/3 mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg h-96 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !category) {
    navigate("/not-found");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">
          {category.name}
        </h1>
        <p className="text-lg text-gray-600">{category.description}</p>
      </header>
      
      {articles.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">
            Não encontramos artigos nesta categoria.
          </h2>
          <p className="text-gray-600 mb-8">
            Estamos trabalhando para adicionar mais conteúdo em breve.
          </p>
          <Button asChild>
            <Link href="/">Voltar para o Início</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article: any) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
