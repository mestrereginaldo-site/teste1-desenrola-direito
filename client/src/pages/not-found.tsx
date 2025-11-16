import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-12">
      <Card className="w-full max-w-lg mx-4 shadow-lg">
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center mb-6">
            <AlertCircle className="h-16 w-16 text-primary mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">Página não encontrada</h1>
          </div>

          <p className="my-6 text-gray-600">
            Desculpe, a página que você estava procurando não foi encontrada ou pode ter sido movida.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full md:w-auto">
                Voltar para a página inicial
              </Button>
            </Link>
            
            <Link href="/artigos">
              <Button variant="outline" size="lg" className="w-full md:w-auto">
                Explorar artigos
              </Button>
            </Link>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Sugestões úteis</h2>
            <ul className="text-left list-disc list-inside text-gray-600">
              <li>Verifique se o endereço foi digitado corretamente</li>
              <li>Utilize a barra de busca no topo do site</li>
              <li>Explore as categorias jurídicas disponíveis</li>
              <li>Entre em contato conosco se precisar de ajuda</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
