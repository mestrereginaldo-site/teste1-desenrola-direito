import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdPlaceholder from "@/components/shared/AdPlaceholder";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface DocumentModel {
  id: number;
  title: string;
  category: string;
  description: string;
  format: string;
  pages: number;
  downloadUrl: string;
  filename: string;
}

// Dados simulados para modelos de documentos
const documentModels: DocumentModel[] = [
  {
    id: 1,
    title: "Petição Inicial - Ação de Indenização por Danos Morais",
    category: "civil",
    description: "Modelo de petição inicial para processos de indenização por danos morais no âmbito civil.",
    format: "TXT",
    pages: 5,
    downloadUrl: "/api/download/peticao-danos-morais.txt",
    filename: "peticao-danos-morais.txt"
  },
  {
    id: 2,
    title: "Contrato de Aluguel Residencial",
    category: "civil",
    description: "Modelo completo de contrato de locação residencial com todas as cláusulas necessárias.",
    format: "TXT",
    pages: 8,
    downloadUrl: "/api/download/contrato-aluguel-residencial.txt",
    filename: "contrato-aluguel-residencial.txt"
  },
  {
    id: 3,
    title: "Recurso de Multa de Trânsito",
    category: "administrativo",
    description: "Modelo para recurso administrativo contra multas de trânsito.",
    format: "TXT",
    pages: 3,
    downloadUrl: "/api/download/recurso-multa-transito.txt",
    filename: "recurso-multa-transito.txt"
  },
  {
    id: 4,
    title: "Contrato de Prestação de Serviços",
    category: "civil",
    description: "Modelo para contratos de prestação de serviços diversos com todas as proteções legais.",
    format: "TXT",
    pages: 6,
    downloadUrl: "/api/download/contrato-prestacao-servicos.txt",
    filename: "contrato-prestacao-servicos.txt"
  },
  {
    id: 5,
    title: "Acordo de Pensão Alimentícia",
    category: "familia",
    description: "Modelo de acordo extrajudicial para definição de pensão alimentícia.",
    format: "TXT",
    pages: 4,
    downloadUrl: "/api/download/acordo-pensao-alimenticia.txt",
    filename: "acordo-pensao-alimenticia.txt"
  },
  {
    id: 6,
    title: "Reclamação Trabalhista",
    category: "trabalhista",
    description: "Modelo de petição inicial para reclamação trabalhista com pedidos comuns.",
    format: "TXT",
    pages: 7,
    downloadUrl: "/api/download/reclamacao-trabalhista.txt",
    filename: "reclamacao-trabalhista.txt"
  },
  {
    id: 7,
    title: "Notificação Extrajudicial",
    category: "civil",
    description: "Modelo de notificação extrajudicial para diversos fins.",
    format: "TXT",
    pages: 2,
    downloadUrl: "/api/download/notificacao-extrajudicial.txt",
    filename: "notificacao-extrajudicial.txt"
  },
  {
    id: 8,
    title: "Reclamação ao PROCON",
    category: "consumidor",
    description: "Modelo de carta para reclamação formal ao PROCON sobre problemas de consumo.",
    format: "TXT",
    pages: 3,
    downloadUrl: "/api/download/reclamacao-procon.txt",
    filename: "reclamacao-procon.txt"
  },
  {
    id: 9,
    title: "Termo de Quitação de Dívida",
    category: "civil",
    description: "Modelo de documento para quitação de dívidas e obrigações financeiras.",
    format: "TXT",
    pages: 2,
    downloadUrl: "/api/download/termo-quitacao-divida.txt",
    filename: "termo-quitacao-divida.txt"
  },
  {
    id: 10,
    title: "Procuração Ad Judicia",
    category: "processual",
    description: "Modelo de procuração para representação em processos judiciais.",
    format: "TXT",
    pages: 1,
    downloadUrl: "/api/download/procuracao-ad-judicia.txt",
    filename: "procuracao-ad-judicia.txt"
  },
  {
    id: 11,
    title: "Contrato de Compra e Venda",
    category: "civil",
    description: "Modelo de contrato para compra e venda de bens móveis ou imóveis.",
    format: "TXT",
    pages: 5,
    downloadUrl: "/api/download/contrato-compra-venda.txt",
    filename: "contrato-compra-venda.txt"
  },
  {
    id: 12,
    title: "Declaração de Testemunha",
    category: "processual",
    description: "Modelo de declaração formal de testemunha para uso em processos.",
    format: "TXT",
    pages: 2,
    downloadUrl: "/api/download/declaracao-testemunha.txt",
    filename: "declaracao-testemunha.txt"
  }
];

export default function DocumentModels() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredDocuments = documentModels.filter(doc => {
    // Filtro por categoria
    const categoryMatch = activeCategory === "todos" || doc.category === activeCategory;
    
    // Filtro por busca
    const searchMatch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const handleDownload = (document: DocumentModel) => {
    if (document.downloadUrl === "#") {
      toast({
        title: "Em breve",
        description: `Este modelo estará disponível em breve. Por favor, tente novamente mais tarde.`,
      });
      return;
    }
    
    // Criar um link de download usando atributo download do HTML5
    try {
      const a = window.document.createElement('a');
      a.href = document.downloadUrl;
      // Forçar download com o atributo download
      a.setAttribute('download', document.filename);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      
      toast({
        title: "Download iniciado",
        description: `O modelo "${document.title}" está sendo baixado.`,
      });
    } catch (error) {
      console.error("Erro ao baixar documento:", error);
      toast({
        title: "Erro no download",
        description: "Ocorreu um erro ao tentar baixar o documento. Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Modelos de Documentos Jurídicos</h1>
          <p className="text-lg text-gray-600 mb-8">
            Acesse nossa biblioteca de modelos profissionais prontos para uso. Todos os documentos foram 
            revisados por advogados especialistas e estão atualizados conforme a legislação vigente.
          </p>

          {/* Ad banner horizontal */}
          <div className="mb-8">
            <AdPlaceholder format="horizontal" className="mx-auto" />
          </div>

          {/* Barra de busca e filtros */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            <div className="flex-grow">
              <Label htmlFor="document-search" className="sr-only">Buscar documento</Label>
              <Input
                id="document-search"
                placeholder="Buscar modelo de documento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Tabs para categorias */}
          <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveCategory}>
            <TabsList className="flex flex-wrap mb-6 bg-transparent justify-start">
              <TabsTrigger value="todos" className="px-4 py-2 text-sm md:text-base">Todos</TabsTrigger>
              <TabsTrigger value="civil" className="px-4 py-2 text-sm md:text-base">Civil</TabsTrigger>
              <TabsTrigger value="trabalhista" className="px-4 py-2 text-sm md:text-base">Trabalhista</TabsTrigger>
              <TabsTrigger value="familia" className="px-4 py-2 text-sm md:text-base">Família</TabsTrigger>
              <TabsTrigger value="consumidor" className="px-4 py-2 text-sm md:text-base">Consumidor</TabsTrigger>
              <TabsTrigger value="administrativo" className="px-4 py-2 text-sm md:text-base">Administrativo</TabsTrigger>
              <TabsTrigger value="processual" className="px-4 py-2 text-sm md:text-base">Processual</TabsTrigger>
            </TabsList>
            
            <TabsContent value="todos" className="mt-0">
              <DocumentGrid documents={filteredDocuments} onDownload={handleDownload} />
            </TabsContent>
            
            <TabsContent value="civil" className="mt-0">
              <DocumentGrid documents={filteredDocuments} onDownload={handleDownload} />
            </TabsContent>
            
            <TabsContent value="trabalhista" className="mt-0">
              <DocumentGrid documents={filteredDocuments} onDownload={handleDownload} />
            </TabsContent>
            
            <TabsContent value="familia" className="mt-0">
              <DocumentGrid documents={filteredDocuments} onDownload={handleDownload} />
            </TabsContent>
            
            <TabsContent value="consumidor" className="mt-0">
              <DocumentGrid documents={filteredDocuments} onDownload={handleDownload} />
            </TabsContent>
            
            <TabsContent value="administrativo" className="mt-0">
              <DocumentGrid documents={filteredDocuments} onDownload={handleDownload} />
            </TabsContent>
            
            <TabsContent value="processual" className="mt-0">
              <DocumentGrid documents={filteredDocuments} onDownload={handleDownload} />
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Aviso de Isenção de Responsabilidade</h3>
            <p className="text-gray-600 mb-2">
              Os modelos de documentos disponibilizados são fornecidos apenas como referência geral. 
              Cada situação jurídica é única e pode exigir adaptações específicas.
            </p>
            <p className="text-gray-600 mb-2">
              Recomendamos a revisão por um profissional qualificado antes do uso efetivo em situações reais.
              O Desenrola Direito não se responsabiliza por consequências advindas do uso inadequado destes modelos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentGrid({ 
  documents, 
  onDownload 
}: { 
  documents: DocumentModel[], 
  onDownload: (document: DocumentModel) => void 
}) {
  const { toast } = useToast();
  if (documents.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Nenhum documento encontrado com os filtros atuais.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((document) => (
        <Card key={document.id} className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{document.title}</CardTitle>
            <CardDescription className="text-sm">{document.format} | {document.pages} páginas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">{document.description}</p>
          </CardContent>
          <CardFooter className="pt-0">
            {document.downloadUrl === "#" ? (
              <Button 
                onClick={() => onDownload(document)}
                className="w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Baixar Modelo
              </Button>
            ) : (
              <Button 
                className="w-full"
                onClick={() => {
                  // Redirecionar para o endpoint de download
                  window.location.href = document.downloadUrl;
                  // Mostrar notificação de download
                  toast({
                    title: "Download iniciado",
                    description: `O modelo "${document.title}" está sendo baixado.`
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Baixar Modelo
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}