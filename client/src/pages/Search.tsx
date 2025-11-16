import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ArticleCard from "@/components/articles/ArticleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function Search() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    if (query) {
      setSearchTerm(query);
    }
  }, []);
  
  const { 
    data: articles = [], 
    isLoading,
    refetch
  } = useQuery({
    queryKey: [`/api/articles/search?q=${searchTerm}`],
    enabled: searchTerm.length > 0,
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchTerm.trim())}`);
      refetch();
    }
  };
  
  if (searchTerm.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            Pesquisar Artigos
          </h1>
          <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-8">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Digite um termo para pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">Pesquisar</Button>
            </div>
          </form>
          <p className="text-gray-600">
            Digite um termo para encontrar artigos relacionados.
          </p>
        </header>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Resultados para "{searchTerm}"
          </h1>
          <form onSubmit={handleSearch} className="max-w-lg mb-8">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Digite um termo para pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">Pesquisar</Button>
            </div>
          </form>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
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
          Resultados para "{searchTerm}"
        </h1>
        <form onSubmit={handleSearch} className="max-w-lg mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Digite um termo para pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Pesquisar</Button>
          </div>
        </form>
      </header>
      
      {articles.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">
            Nenhum resultado encontrado para "{searchTerm}"
          </h2>
          <p className="text-gray-600 mb-8">
            Tente utilizar termos diferentes ou mais gerais.
          </p>
          <Button asChild>
            <Link href="/">Voltar para o Início</Link>
          </Button>
        </div>
      ) : (
        <>
          <p className="mb-6 text-gray-600">
            Encontramos {articles.length} {articles.length === 1 ? 'artigo' : 'artigos'} para sua pesquisa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article: any) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
