import { Link } from "wouter";
import { FaBalanceScale, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";

export default function Footer() {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-xl mb-4 flex items-center">
              <FaBalanceScale className="mr-2" />
              Desenrola Direito
            </h4>
            <p className="text-gray-300 mb-6">
              Simplificando o Direito para todos. Informação jurídica clara, acessível e prática.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300 transition">
                <FaFacebookF className="text-lg" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition">
                <FaInstagram className="text-lg" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition">
                <FaYoutube className="text-lg" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition">
                <FaLinkedinIn className="text-lg" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-4">Categorias</h5>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/categorias/${category.slug}`} className="text-gray-300 hover:text-white transition">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4">Links Úteis</h5>
            <ul className="space-y-3">
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white transition">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-gray-300 hover:text-white transition">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-300 hover:text-white transition">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-white transition">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-4">Contato</h5>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-gray-300" />
                <span className="text-gray-300">
                  Av. Marechal Deodoro da Fonseca, 1188 - 4º Andar - Centro - Jaraguá do Sul/SC
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3 text-gray-300" />
                <span className="text-gray-300">(11) 4000-0000</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-gray-300" />
                <span className="text-gray-300">contato@desenroladireito.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p className="mb-2">&copy; {new Date().getFullYear()} Desenrola Direito. Todos os direitos reservados.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/sobre" className="text-gray-300 hover:text-white transition">
              Sobre Nós
            </Link>
            <span>•</span>
            <Link href="/privacidade" className="text-gray-300 hover:text-white transition">
              Política de Privacidade
            </Link>
            <span>•</span>
            <Link href="/termos" className="text-gray-300 hover:text-white transition">
              Termos de Uso
            </Link>
            <span>•</span>
            <Link href="/calculadoras" className="text-gray-300 hover:text-white transition">
              Calculadoras Jurídicas
            </Link>
          </div>
          <p className="mt-4 text-xs">
            Este site pode incluir anúncios personalizados do Google AdSense. <Link href="/privacidade" className="underline hover:text-white">Saiba mais</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
