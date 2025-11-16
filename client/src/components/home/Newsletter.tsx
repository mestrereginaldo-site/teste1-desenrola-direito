import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Você receberá nossas atualizações no email fornecido.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-12 bg-gradient-to-r from-primary to-[#00A3B4] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Receba Conteúdo Jurídico Gratuito
          </h3>
          <p className="text-lg opacity-90 mb-8">
            Assine nossa newsletter e receba artigos, dicas e novidades sobre direitos do cidadão diretamente no seu email.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 justify-center">
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="py-3 px-4 rounded-lg flex-grow max-w-md focus:outline-none focus:ring-2 focus:ring-white bg-white text-gray-800"
            />
            <Button 
              type="submit" 
              variant="secondary" 
              size="lg" 
              disabled={isSubmitting || !email}
            >
              {isSubmitting ? "Inscrevendo..." : "Assinar Newsletter"}
            </Button>
          </form>
          <p className="text-sm mt-4 opacity-75">
            Nunca enviaremos spam. Você pode cancelar a inscrição a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
}
