import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  format: "horizontal" | "vertical" | "square";
  className?: string;
}

/**
 * Componente de espaço reservado para anúncios que pode ser substituído por anúncios reais do Google AdSense
 */
export default function AdPlaceholder({ format, className }: AdPlaceholderProps) {
  // Definindo dimensões baseadas no formato para simular tamanhos comuns de anúncios
  const dimensions = {
    horizontal: "h-[90px] w-full", // Formato 728x90 ou responsivo
    vertical: "h-[600px] w-[160px]", // Formato 160x600
    square: "h-[250px] w-[300px]", // Formato 300x250
  };

  return (
    <div 
      className={cn(
        "border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400 text-xs",
        dimensions[format],
        className
      )}
    >
      <div className="text-center px-2">
        <p>Espaço reservado para anúncio</p>
        <p className="mt-1 text-gray-500">Este espaço será substituído por anúncios do Google AdSense</p>
      </div>
    </div>
  );
}