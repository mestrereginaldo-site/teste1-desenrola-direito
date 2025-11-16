import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { FaBalanceScale, FaUsers, FaBookOpen, FaLightbulb, FaHandshake } from "react-icons/fa";

export default function About() {
  return (
    <>
      <Helmet>
        <title>Sobre Nós | Desenrola Direito</title>
        <meta name="description" content="Conheça a missão, visão e valores do Desenrola Direito, uma plataforma dedicada a facilitar o acesso à informação jurídica para todos os brasileiros." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Sobre o Desenrola Direito</h1>
          
          {/* Seção de Missão e Visão */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6 shadow-md border-t-4 border-primary">
                <div className="flex items-center mb-4">
                  <FaLightbulb className="text-3xl text-primary mr-4" />
                  <h2 className="text-2xl font-bold">Nossa Missão</h2>
                </div>
                <p className="text-gray-700">
                  Democratizar o acesso à informação jurídica, tornando o conhecimento legal acessível, compreensível 
                  e aplicável para todos os cidadãos brasileiros, independentemente de sua formação ou condição socioeconômica.
                </p>
              </Card>
              
              <Card className="p-6 shadow-md border-t-4 border-primary">
                <div className="flex items-center mb-4">
                  <FaBookOpen className="text-3xl text-primary mr-4" />
                  <h2 className="text-2xl font-bold">Nossa Visão</h2>
                </div>
                <p className="text-gray-700">
                  Ser a principal referência nacional em educação jurídica acessível e prática, contribuindo para uma 
                  sociedade mais justa onde os cidadãos conheçam e exerçam seus direitos com autonomia e segurança.
                </p>
              </Card>
            </div>
          </section>
          
          {/* Nossos Valores */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <FaBalanceScale className="text-3xl text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Acessibilidade</h3>
                <p className="text-gray-600">
                  Comprometimento em tornar o conhecimento jurídico acessível a todos, usando linguagem clara e recursos didáticos.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <FaUsers className="text-3xl text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Inclusão</h3>
                <p className="text-gray-600">
                  Respeito à diversidade e compromisso em atender às necessidades de todos os grupos sociais.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <FaHandshake className="text-3xl text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Confiabilidade</h3>
                <p className="text-gray-600">
                  Compromisso com a precisão e atualização constante das informações jurídicas disponibilizadas.
                </p>
              </div>
            </div>
          </section>
          
          {/* Nossa História */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Nossa História</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                O Desenrola Direito nasceu em janeiro de 2025 a partir da identificação de uma lacuna significativa: 
                a dificuldade dos cidadãos comuns em compreender seus direitos e obrigações legais. Um grupo de advogados, 
                professores de direito e especialistas em tecnologia educacional se uniu com o propósito de criar uma 
                plataforma que traduzisse a complexidade jurídica para uma linguagem acessível e prática.
              </p>
              <p className="text-gray-700 mb-4">
                Desde seu lançamento, a plataforma tem crescido constantemente, expandindo seu conteúdo para abranger 
                diversas áreas do direito e desenvolvendo ferramentas práticas como calculadoras jurídicas, modelos 
                de documentos e sistemas de consulta simplificada.
              </p>
              <p className="text-gray-700">
                Hoje, o Desenrola Direito se orgulha de atender milhares de brasileiros mensalmente, ajudando-os 
                a navegar pelo sistema jurídico com mais confiança e conhecimento, contribuindo para uma cidadania 
                mais plena e consciente.
              </p>
            </div>
          </section>
          
          {/* Equipe */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Nossa Equipe</h2>
            <p className="text-gray-700 mb-6">
              O Desenrola Direito conta com uma equipe multidisciplinar de profissionais dedicados à missão de 
              democratizar o conhecimento jurídico:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-primary">Especialistas Jurídicos</h3>
                <p className="text-gray-600">
                  Advogados e professores de direito com experiência em diversas áreas, responsáveis por garantir 
                  a precisão e relevância do conteúdo.
                </p>
              </Card>
              
              <Card className="p-4 shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-primary">Educadores e Comunicadores</h3>
                <p className="text-gray-600">
                  Profissionais especializados em traduzir conceitos jurídicos complexos para uma linguagem acessível 
                  e contextualizada.
                </p>
              </Card>
              
              <Card className="p-4 shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-primary">Desenvolvedores e Designers</h3>
                <p className="text-gray-600">
                  Equipe técnica responsável por criar e manter uma plataforma intuitiva, acessível e em constante evolução.
                </p>
              </Card>
              
              <Card className="p-4 shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-primary">Suporte e Comunidade</h3>
                <p className="text-gray-600">
                  Profissionais dedicados a atender os usuários, gerenciar a comunidade e incorporar feedback para 
                  melhoria contínua da plataforma.
                </p>
              </Card>
            </div>
          </section>
          
          {/* CTA */}
          <section>
            <div className="bg-primary/10 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Junte-se à Nossa Missão</h2>
              <p className="text-gray-700 mb-6">
                Acreditamos que o conhecimento jurídico é um direito de todos. Se você compartilha dessa visão, 
                junte-se a nós nessa jornada para tornar o direito mais acessível para todos os brasileiros.
              </p>
              <div className="flex justify-center">
                <a 
                  href="/contato" 
                  className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition"
                >
                  Entre em Contato
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}