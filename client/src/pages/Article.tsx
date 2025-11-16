import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import ArticleContent from "@/components/articles/ArticleContent";
import RelatedArticles from "@/components/articles/RelatedArticles";
import { Skeleton } from "@/components/ui/skeleton";
import Newsletter from "@/components/home/Newsletter";
import AdPlaceholder from "@/components/shared/AdPlaceholder";
import { ArticleWithCategory } from "@shared/schema";

export default function Article() {
  const { slug } = useParams();
  const [, navigate] = useLocation();
  
  const { 
    data: article, 
    isLoading, 
    error 
  } = useQuery<ArticleWithCategory>({
    queryKey: [`/api/articles/${slug}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-24 mb-3" />
          <Skeleton className="h-12 w-full mb-4" />
          <div className="flex items-center space-x-4 mb-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-96 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    // Usamos useEffect para navegação após a renderização
    useEffect(() => {
      navigate("/not-found");
    }, [navigate]);
    return null;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:flex-1">
            <ArticleContent article={article} />
            
            {/* Ad banner no meio do conteúdo */}
            <div className="my-8 flex justify-center">
              <AdPlaceholder format="horizontal" />
            </div>
            
            <RelatedArticles 
              categoryId={article.category.id} 
              currentArticleId={article.id}
            />
          </div>
          
          {/* Coluna lateral com anúncios */}
          <div className="md:w-[300px] space-y-8 mt-8 md:mt-0">
            <AdPlaceholder format="square" />
            <AdPlaceholder format="square" />
          </div>
        </div>
      </div>
      
      {/* Ad banner antes da newsletter */}
      <div className="container mx-auto px-4 py-4">
        <AdPlaceholder format="horizontal" className="mx-auto" />
      </div>
      
      <Newsletter />
    </>
  );
}
