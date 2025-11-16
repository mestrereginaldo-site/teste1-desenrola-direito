import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Política de Privacidade</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          
          <h2>1. Introdução</h2>
          <p>
            Bem-vindo à Política de Privacidade do Desenrola Direito. Esta política descreve como coletamos, usamos, 
            processamos e compartilhamos suas informações, incluindo dados pessoais, quando você utiliza nosso site.
          </p>
          <p>
            Ao acessar ou utilizar o Desenrola Direito, você concorda com os termos desta Política de Privacidade. 
            Se você não concordar com qualquer aspecto desta política, por favor, não utilize nossos serviços.
          </p>
          
          <h2>2. Informações que Coletamos</h2>
          <p>
            <strong>2.1. Informações fornecidas por você:</strong> Podemos coletar dados pessoais que você fornece 
            diretamente ao se cadastrar, utilizar nossos serviços, preencher formulários ou interagir com nosso site:
          </p>
          <ul>
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
            <li>Informações para contato</li>
            <li>Outras informações que você optar por fornecer</li>
          </ul>
          
          <p>
            <strong>2.2. Informações coletadas automaticamente:</strong> Quando você acessa ou utiliza nosso site, 
            podemos coletar automaticamente:
          </p>
          <ul>
            <li>Informações sobre o dispositivo (tipo, sistema operacional, navegador)</li>
            <li>Endereço IP</li>
            <li>Dados de navegação e comportamento no site</li>
            <li>Cookies e tecnologias similares</li>
            <li>Informações de registro (log data)</li>
          </ul>
          
          <h2>3. Como Utilizamos suas Informações</h2>
          <p>Utilizamos as informações coletadas para os seguintes propósitos:</p>
          <ul>
            <li>Fornecer, manter e melhorar nossos serviços</li>
            <li>Processar e responder às suas solicitações</li>
            <li>Enviar comunicações sobre nossos serviços, atualizações e promoções</li>
            <li>Personalizar sua experiência no site</li>
            <li>Detectar, prevenir e solucionar problemas técnicos e de segurança</li>
            <li>Cumprir obrigações legais</li>
          </ul>
          
          <h2>4. Compartilhamento de Informações</h2>
          <p>Podemos compartilhar suas informações nas seguintes circunstâncias:</p>
          <ul>
            <li>Com prestadores de serviços que nos auxiliam a operar o site</li>
            <li>Para cumprir obrigações legais, como ordens judiciais</li>
            <li>Em caso de fusão, venda ou transferência de ativos</li>
            <li>Com seu consentimento ou mediante suas instruções</li>
          </ul>
          <p>
            Não vendemos seus dados pessoais a terceiros.
          </p>
          
          <h2>5. Cookies e Tecnologias Similares</h2>
          <p>
            Utilizamos cookies e tecnologias similares para coletar e armazenar informações quando você visita nosso site. 
            Isso nos ajuda a reconhecer seu navegador, personalizar sua experiência e analisar como nosso site é utilizado.
          </p>
          <p>
            Você pode gerenciar as preferências de cookies através das configurações do seu navegador. No entanto, 
            desabilitar cookies pode afetar certas funcionalidades do site.
          </p>
          
          <h2>6. Publicidade e Google AdSense</h2>
          <p>
            Nosso site utiliza o Google AdSense, um serviço de publicidade fornecido pelo Google. O Google AdSense utiliza 
            cookies e outras tecnologias para exibir anúncios relevantes aos visitantes com base nos seus interesses e 
            comportamento de navegação.
          </p>
          <p>
            O Google pode utilizar as informações coletadas para contextualizar e personalizar os anúncios exibidos em sua 
            rede de publicidade. Você pode saber mais sobre como o Google utiliza suas informações e como gerenciar suas 
            preferências de privacidade visitando a 
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"> Política de Privacidade do Google</a>.
          </p>
          
          <h2>7. Segurança das Informações</h2>
          <p>
            Implementamos medidas técnicas e organizacionais para proteger suas informações contra perda, roubo, uso indevido, 
            acesso não autorizado, divulgação, alteração e destruição. No entanto, nenhum método de transmissão pela Internet 
            ou armazenamento eletrônico é 100% seguro.
          </p>
          
          <h2>8. Seus Direitos</h2>
          <p>Dependendo da legislação aplicável, você pode ter direito a:</p>
          <ul>
            <li>Acessar, corrigir ou excluir seus dados pessoais</li>
            <li>Restringir ou se opor ao processamento de seus dados</li>
            <li>Portar seus dados para outro serviço</li>
            <li>Retirar seu consentimento a qualquer momento</li>
          </ul>
          <p>
            Para exercer qualquer desses direitos, entre em contato conosco através dos canais indicados abaixo.
          </p>
          
          <h2>9. Alterações na Política de Privacidade</h2>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise esta página 
            regularmente para se manter informado sobre possíveis alterações. Alterações significativas serão comunicadas 
            através de aviso em nosso site.
          </p>
          
          <h2>10. Contato</h2>
          <p>
            Se você tiver dúvidas, comentários ou solicitações relacionadas a esta Política de Privacidade ou ao 
            processamento de seus dados pessoais, entre em contato conosco pelo e-mail: 
            <a href="mailto:contato@desenroladireito.com.br"> contato@desenroladireito.com.br</a>
          </p>
        </div>
        
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Voltar para a página inicial</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}