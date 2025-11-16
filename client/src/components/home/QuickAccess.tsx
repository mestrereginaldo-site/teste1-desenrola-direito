import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  FaGavel, 
  FaBriefcase, 
  FaHome, 
  FaUsers, 
  FaShieldAlt 
} from "react-icons/fa";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  "fa-gavel": <FaGavel className="text-4xl" />,
  "fa-briefcase": <FaBriefcase className="text-4xl" />,
  "fa-home": <FaHome className="text-4xl" />,
  "fa-users": <FaUsers className="text-4xl" />,
  "fa-shield-alt": <FaShieldAlt className="text-4xl" />
};

export default function QuickAccess() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-primary mb-8">Acesso Rápido</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-36 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="acesso-rapido" className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-primary mb-8">Acesso Rápido</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category: any) => (
            <Link key={category.id} href={`/categorias/${category.slug}`}>
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition duration-300 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                <div className="text-primary mb-4">
                  {iconMap[category.iconName] || <FaGavel className="text-4xl" />}
                </div>
                <h4 className="font-medium text-lg">{category.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
