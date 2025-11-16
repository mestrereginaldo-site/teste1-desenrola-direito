import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface Solution {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  link: string;
  linkText: string;
}

// Função para mapear títulos para as rotas corretas
function getCorrectLink(title: string, defaultLink: string): string {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes("consultoria") || titleLower.includes("jurídica online")) {
    return "/consulta-juridica";
  } else if (titleLower.includes("modelos de documentos")) {
    return "/modelos-documentos";
  } else if (titleLower.includes("calculadoras") || titleLower.includes("jurídicas")) {
    return "/calculadoras";
  } else if (titleLower.includes("comunidade") || titleLower.includes("apoio")) {
    return "/comunidade";
  }
  
  return defaultLink || "/";
}

export default function Solutions() {
  const { data: solutions = [] as Solution[], isLoading } = useQuery<Solution[]>({
    queryKey: ["/api/solutions"],
  });

  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => 
      prev === Math.max(0, Math.ceil(solutions.length / 4) - 1) 
        ? prev 
        : prev + 1
    );
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-primary mb-8">Soluções para todos os momentos</h3>
          <div className="flex space-x-6 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg w-64 h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-primary mb-8">Soluções para todos os momentos</h3>
        
        <div className="relative">
          <div className="overflow-x-auto pb-6 no-scrollbar">
            <div 
              className="flex transition-transform duration-300 ease-in-out" 
              style={{ 
                transform: `translateX(-${activeSlide * 100}%)`,
                width: `${Math.ceil(solutions.length / 4) * 100}%`
              }}
            >
              <div className="flex space-x-6 flex-wrap w-full">
                {solutions.map((solution: Solution) => (
                  <div key={solution.id} className="bg-white rounded-lg shadow-md p-6 w-64 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg mb-4">
                    <div className="h-40 mb-4 rounded-lg overflow-hidden bg-gray-200">
                      {solution.imageUrl && (
                        <img 
                          src={solution.imageUrl} 
                          alt={solution.title} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <h4 className="font-medium text-lg mb-2">{solution.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{solution.description}</p>
                    <Link 
                      href={getCorrectLink(solution.title, solution.link)}
                      className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer inline-block text-center">
                      {solution.linkText}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-white rounded-full shadow-md p-3 hidden md:flex"
            onClick={handlePrevSlide}
            disabled={activeSlide === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-white rounded-full shadow-md p-3 hidden md:flex"
            onClick={handleNextSlide}
            disabled={activeSlide === Math.max(0, Math.ceil(solutions.length / 4) - 1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
        
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(Math.ceil(solutions.length / 4))].map((_, i) => (
            <button
              key={i}
              className={cn(
                "w-3 h-3 rounded-full",
                activeSlide === i ? "bg-primary" : "bg-gray-300"
              )}
              onClick={() => setActiveSlide(i)}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
