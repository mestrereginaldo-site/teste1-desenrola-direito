import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ArticleCard from "@/components/articles/ArticleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function AllArticles() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { 
    data: articles = [], 
    isLoading: isArticlesLoading 
  } = useQuery({
    queryKey: ["/api/articles"],
  });

  const { 
    data: categories = [], 
    isLoading: isCategoriesLoading 
  } = useQuery({
    queryKey: ["/api/categories"],
  });

  const isLoading = isArticlesLoading || isCategoriesLoading;

  // Filter articles based on search term
  const filteredArticles = articles.filter((article: any) => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Todos os Artigos
          </h1>
          <Skeleton className="h-10 w-full max-w-md mb-6" />
          <Skeleton className="h-12 w-full mb-8" />
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg h-96 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          Todos os Artigos
        </h1>
        
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Pesquisar artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            {categories.map((category: any) => (
              <TabsTrigger key={category.id} value={category.slug}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="todos">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium mb-2">
                  Nenhum artigo encontrado
                </h2>
                <p className="text-gray-600 mb-4">
                  Tente refinar sua pesquisa ou limpar o filtro.
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm("")}
                  >
                    Limpar pesquisa
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredArticles.map((article: any) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </TabsContent>
          
          {categories.map((category: any) => (
            <TabsContent key={category.id} value={category.slug}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredArticles
                  .filter((article: any) => article.category.slug === category.slug)
                  .map((article: any) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </header>
    </div>
  );
}
