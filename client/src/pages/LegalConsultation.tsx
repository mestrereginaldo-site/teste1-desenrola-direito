import LegalConsultationForm from "@/components/home/LegalConsultation";
import AdPlaceholder from "@/components/shared/AdPlaceholder";

export default function LegalConsultation() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Consulta Jurídica Especializada</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conectamos você aos melhores advogados do Brasil. Nossa rede de profissionais cobre todas as áreas do Direito para encontrar a solução ideal para seu caso.
          </p>
        </div>
        
        {/* Banner de anúncio no topo */}
        <div className="mb-12">
          <AdPlaceholder format="horizontal" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <LegalConsultationForm />
          </div>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-primary">Por que buscar ajuda profissional?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Orientação jurídica específica para seu caso</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Avaliação de riscos e possibilidades</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Proteção de seus direitos e interesses</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Economize tempo e evite erros comuns</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-primary">Áreas de Atuação</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 p-3 rounded text-sm">Direito Civil</div>
                <div className="bg-gray-50 p-3 rounded text-sm">Direito do Trabalho</div>
                <div className="bg-gray-50 p-3 rounded text-sm">Direito do Consumidor</div>
                <div className="bg-gray-50 p-3 rounded text-sm">Direito Tributário</div>
                <div className="bg-gray-50 p-3 rounded text-sm">Direito Previdenciário</div>
                <div className="bg-gray-50 p-3 rounded text-sm">Direito Imobiliário</div>
                <div className="bg-gray-50 p-3 rounded text-sm">Direito de Família</div>
                <div className="bg-gray-50 p-3 rounded text-sm">Direito Penal</div>
              </div>
            </div>
            
            {/* Removido anúncio vertical */}
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-6 text-center text-primary">Como Funciona</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-2xl">1</span>
              </div>
              <h4 className="font-semibold mb-2">Preencha o Formulário</h4>
              <p className="text-gray-600 text-sm">Descreva seu caso e forneça seus dados de contato</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-2xl">2</span>
              </div>
              <h4 className="font-semibold mb-2">Análise do Caso</h4>
              <p className="text-gray-600 text-sm">Um profissional especializado analisará sua situação</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-2xl">3</span>
              </div>
              <h4 className="font-semibold mb-2">Contato Personalizado</h4>
              <p className="text-gray-600 text-sm">O advogado entrará em contato para orientações específicas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}