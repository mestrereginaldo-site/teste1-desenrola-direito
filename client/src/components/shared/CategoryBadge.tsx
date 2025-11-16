import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface CategoryBadgeProps {
  category: {
    name: string;
    slug: string;
  };
  className?: string;
}

export default function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <Link href={`/categorias/${category.slug}`}>
      <span 
        className={cn(
          "bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium inline-block",
          className
        )}
      >
        {category.name}
      </span>
    </Link>
  );
}
