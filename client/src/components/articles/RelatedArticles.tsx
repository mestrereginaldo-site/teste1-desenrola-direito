import { useQuery } from "@tanstack/react-query";
import ArticleCard from "./ArticleCard";

interface RelatedArticlesProps {
  categoryId: number;
  currentArticleId: number;
}

export default function RelatedArticles({ categoryId, currentArticleId }: RelatedArticlesProps) {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["/api/articles"],
  });

  // Filter articles from the same category, excluding the current article
  const relatedArticles = articles
    .filter((article: any) => 
      article.categoryId === categoryId && article.id !== currentArticleId
    )
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Artigos Relacionados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-72 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Artigos Relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedArticles.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
