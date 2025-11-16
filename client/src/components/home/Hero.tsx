import { Link } from "wouter";
import { FaBookOpen, FaClock } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-[#00A3B4] text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Entenda Seus Direitos de Forma Clara e Descomplicada
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Aprenda a defender seus direitos e solucionar problemas do dia a dia sem precisar de advogado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/artigos">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                <FaBookOpen />
                Ver Artigos
              </Button>
            </Link>
            <Link href="/artigos">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <FaClock />
                Publicações Recentes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
