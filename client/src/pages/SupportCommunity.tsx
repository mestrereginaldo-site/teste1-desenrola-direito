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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorImage?: string;
  date: string;
  category: string;
  replies: number;
  views: number;
  isLiked?: boolean;
}

// Dados simulados para os posts da comunidade
const communityPosts: Post[] = [
  {
    id: 1,
    title: "Como proceder após acidente de trânsito sem vítimas?",
    content: "Tive um pequeno acidente de trânsito ontem, apenas danos materiais. O outro motorista se recusa a me passar os dados do seguro. O que devo fazer?",
    author: "Maria S.",
    authorImage: "https://i.pravatar.cc/150?img=5", // Imagem feminina
    date: "22 de Abril, 2025",
    category: "Direito Civil",
    replies: 8,
    views: 156
  },
  {
    id: 2,
    title: "Meu vizinho está fazendo obra fora do horário permitido",
    content: "Meu vizinho começou uma reforma e está fazendo barulho desde as 7h até as 22h, inclusive nos finais de semana. Já conversei com ele, mas não adianta. O que posso fazer legalmente?",
    author: "Carlos R.",
    authorImage: "https://i.pravatar.cc/150?img=8", // Imagem masculina
    date: "18 de Abril, 2025",
    category: "Direito Civil",
    replies: 12,
    views: 203
  },
  {
    id: 3,
    title: "Problemas com entrega de produto pela internet",
    content: "Comprei um celular pela internet há 30 dias, e até agora não recebi. A empresa não responde meus emails. Como devo proceder?",
    author: "Ana M.",
    authorImage: "https://i.pravatar.cc/150?img=9", // Imagem feminina
    date: "15 de Abril, 2025",
    category: "Direito do Consumidor",
    replies: 15,
    views: 278
  },
  {
    id: 4,
    title: "Fui demitido sem justa causa. Quais são meus direitos?",
    content: "Trabalhei por 3 anos e 7 meses numa empresa e fui demitido sem justa causa. Além das verbas rescisórias, tenho direito a mais alguma coisa?",
    author: "Pedro A.",
    authorImage: "https://i.pravatar.cc/150?img=12", // Imagem masculina
    date: "10 de Abril, 2025",
    category: "Direito do Trabalho",
    replies: 21,
    views: 412
  },
  {
    id: 5,
    title: "Contrato de aluguel com problemas estruturais no imóvel",
    content: "Aluguei um apartamento e após 2 semanas comecei a notar infiltrações graves. O proprietário diz que não vai consertar. Posso quebrar o contrato?",
    author: "Luciana T.",
    authorImage: "https://i.pravatar.cc/150?img=25", // Imagem feminina
    date: "5 de Abril, 2025",
    category: "Direito Civil",
    replies: 18,
    views: 320
  },
  {
    id: 6,
    title: "Como funciona o processo de pensão alimentícia?",
    content: "Estou me separando e tenho duas filhas pequenas. Como funciona o cálculo da pensão alimentícia? Existe um valor fixo ou porcentagem?",
    author: "Roberto C.",
    authorImage: "https://i.pravatar.cc/150?img=53", // Imagem masculina
    date: "29 de Março, 2025",
    category: "Direito de Família",
    replies: 25,
    views: 489
  }
];

const postSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres" }),
  category: z.string().min(1, { message: "Selecione uma categoria" }),
  content: z.string().min(20, { message: "O conteúdo deve ter pelo menos 20 caracteres" }),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function SupportCommunity() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  });

  const filteredPosts = communityPosts.filter(post => {
    // Filtro por categoria
    const categoryMatch = activeCategory === "todos" || post.category.toLowerCase().includes(activeCategory);
    
    // Filtro por busca
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const onSubmit = (data: PostFormValues) => {
    toast({
      title: "Post enviado com sucesso!",
      description: "Seu post foi publicado na comunidade.",
    });
    setShowNewPostForm(false);
    form.reset();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Comunidade de Apoio Jurídico</h1>
          <p className="text-lg text-gray-600 mb-8">
            Compartilhe suas dúvidas e experiências com outras pessoas. Nossa comunidade oferece um espaço seguro para discussões sobre temas jurídicos e apoio mútuo em situações desafiadoras.
          </p>

          {/* Ad banner horizontal */}
          <div className="mb-8">
            <AdPlaceholder format="horizontal" className="mx-auto" />
          </div>

          {/* Barra de busca e botão novo post */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            <div className="flex-grow">
              <Label htmlFor="post-search" className="sr-only">Buscar post</Label>
              <Input
                id="post-search"
                placeholder="Buscar na comunidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button 
              onClick={() => setShowNewPostForm(!showNewPostForm)}
              className="whitespace-nowrap"
            >
              {showNewPostForm ? "Cancelar" : "Novo Post"}
            </Button>
          </div>

          {/* Formulário para novo post */}
          {showNewPostForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Crie uma nova publicação</CardTitle>
                <CardDescription>
                  Compartilhe sua dúvida ou experiência com a comunidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título</FormLabel>
                          <FormControl>
                            <Input placeholder="Título da sua publicação" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="">Selecione uma categoria</option>
                              <option value="Direito Civil">Direito Civil</option>
                              <option value="Direito do Consumidor">Direito do Consumidor</option>
                              <option value="Direito do Trabalho">Direito do Trabalho</option>
                              <option value="Direito de Família">Direito de Família</option>
                              <option value="Direito Penal">Direito Penal</option>
                              <option value="Direito Tributário">Direito Tributário</option>
                              <option value="Direito Previdenciário">Direito Previdenciário</option>
                              <option value="Outros">Outros</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Conteúdo</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descreva sua situação ou dúvida em detalhes..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Seja claro e forneça detalhes relevantes para receber melhores respostas.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowNewPostForm(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit">Publicar</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Tabs para categorias */}
          <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveCategory}>
            <TabsList className="flex flex-wrap mb-6 bg-transparent justify-start">
              <TabsTrigger value="todos" className="px-4 py-2 text-sm md:text-base">Todos</TabsTrigger>
              <TabsTrigger value="civil" className="px-4 py-2 text-sm md:text-base">Civil</TabsTrigger>
              <TabsTrigger value="consumidor" className="px-4 py-2 text-sm md:text-base">Consumidor</TabsTrigger>
              <TabsTrigger value="trabalho" className="px-4 py-2 text-sm md:text-base">Trabalho</TabsTrigger>
              <TabsTrigger value="família" className="px-4 py-2 text-sm md:text-base">Família</TabsTrigger>
              <TabsTrigger value="penal" className="px-4 py-2 text-sm md:text-base">Penal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="todos" className="mt-0">
              <CommunityPosts posts={filteredPosts} />
            </TabsContent>
            
            <TabsContent value="civil" className="mt-0">
              <CommunityPosts posts={filteredPosts} />
            </TabsContent>
            
            <TabsContent value="consumidor" className="mt-0">
              <CommunityPosts posts={filteredPosts} />
            </TabsContent>
            
            <TabsContent value="trabalho" className="mt-0">
              <CommunityPosts posts={filteredPosts} />
            </TabsContent>
            
            <TabsContent value="família" className="mt-0">
              <CommunityPosts posts={filteredPosts} />
            </TabsContent>
            
            <TabsContent value="penal" className="mt-0">
              <CommunityPosts posts={filteredPosts} />
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Diretrizes da Comunidade</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Seja respeitoso com todos os membros da comunidade</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Não compartilhe informações pessoais sensíveis</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>As orientações recebidas não substituem consulta jurídica profissional</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Relate conteúdo inapropriado para moderação</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityPosts({ posts }: { posts: Post[] }) {
  const { toast } = useToast();

  const handleLike = (postId: number) => {
    toast({
      title: "Post curtido",
      description: "Obrigado pelo seu feedback!",
    });
  };

  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = (postId: number) => {
    // Toggle para exibir/esconder o formulário de resposta para este post
    setActivePostId(activePostId === postId ? null : postId);
    setReplyContent("");
  };
  
  const submitReply = (postId: number) => {
    if (replyContent.trim().length < 5) {
      toast({
        title: "Resposta muito curta",
        description: "Por favor, forneça mais detalhes na sua resposta.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Resposta enviada com sucesso!",
      description: "Sua resposta foi publicada na comunidade.",
    });
    
    // Limpa o formulário e fecha
    setReplyContent("");
    setActivePostId(null);
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Nenhum post encontrado com os filtros atuais.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{post.title}</CardTitle>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                {post.category}
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.authorImage} />
                <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">{post.author}</span> • {post.date}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{post.content}</p>
          </CardContent>
          
          {activePostId === post.id && (
            <div className="px-6 pb-3">
              <div className="border-t pt-4 pb-2">
                <Label htmlFor={`reply-${post.id}`} className="text-sm font-medium mb-1 block">
                  Sua resposta
                </Label>
                <Textarea 
                  id={`reply-${post.id}`}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Compartilhe sua opinião ou sugestão..."
                  className="w-full mb-3 min-h-[100px]"
                />
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActivePostId(null)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => submitReply(post.id)}
                  >
                    Enviar Resposta
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="flex space-x-3 text-sm text-gray-500">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                {post.replies} respostas
              </span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views} visualizações
              </span>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-primary"
                onClick={() => handleLike(post.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                Curtir
              </Button>
              <Button 
                variant={activePostId === post.id ? "secondary" : "ghost"}
                size="sm"
                className={activePostId === post.id ? "text-primary" : "text-gray-500 hover:text-primary"}
                onClick={() => handleReply(post.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                Responder
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}