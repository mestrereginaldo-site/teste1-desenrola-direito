import { useState } from "react";
import { Link, useLocation } from "wouter";
import { FaBalanceScale, FaBars, FaTimes, FaPhone } from "react-icons/fa";
import SearchBar from "../shared/SearchBar";
import { cn } from "@/lib/utils";

interface NavLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

const navLinks: NavLink[] = [
  { name: "Início", href: "/" },
  { name: "Artigos", href: "/artigos" },
  { name: "Calculadoras", href: "/calculadoras" },
  { name: "Baixar Modelos", href: "/modelos-documentos" },
  { name: "Consulta Jurídica", href: "/consulta-juridica" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <div className="flex w-full md:w-auto items-center justify-between mb-4 md:mb-0">
          <Link href="/" className="flex items-center">
            <FaBalanceScale className="text-4xl text-primary mr-3" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">
                Desenrola Direito
              </h1>
              <p className="text-sm text-gray-600">Simplificando o Direito</p>
            </div>
          </Link>
          <button
            className="ml-4 md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
        <nav className="flex flex-col md:flex-row items-center w-full md:w-auto">
          <div
            className={cn(
              "flex flex-col md:flex-row md:space-x-6 mr-0 md:mr-6 w-full md:w-auto",
              isMenuOpen ? "flex" : "hidden md:flex"
            )}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-gray-700 hover:text-primary font-medium transition py-2 md:py-0 text-center",
                  location === link.href && "text-primary"
                )}
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }
                  }
                }}
              >
                {link.icon && link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
