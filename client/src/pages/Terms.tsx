import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Termos de Uso</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          
          <h2>1. Aceitação dos Termos</h2>
          <p>
            Bem-vindo ao Desenrola Direito. Ao acessar ou utilizar nosso website, você concorda em cumprir e ficar 
            vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, 
            por favor, não utilize nosso site.
          </p>
          
          <h2>2. Alterações nos Termos</h2>
          <p>
            Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor 
            imediatamente após a publicação dos termos atualizados. O uso continuado do site após tais modificações 
            constitui sua aceitação dos novos termos.
          </p>
          
          <h2>3. Uso do Conteúdo</h2>
          <p>
            Todo o conteúdo disponibilizado no Desenrola Direito, incluindo textos, artigos, imagens, gráficos, 
            vídeos, logotipos, ícones e quaisquer outros materiais, é protegido por leis de direitos autorais 
            e é propriedade do Desenrola Direito ou de seus licenciadores.
          </p>
          <p>
            Você pode acessar, visualizar e utilizar o conteúdo apenas para seu uso pessoal e não comercial. 
            Não é permitido reproduzir, distribuir, modificar, criar obras derivadas, exibir publicamente, 
            vender, licenciar ou explorar comercialmente qualquer conteúdo do site sem autorização prévia 
            por escrito.
          </p>
          
          <h2>4. Propriedade Intelectual</h2>
          <p>
            As marcas, nomes, logotipos, nomes de domínio e outros sinais distintivos, bem como todo o conteúdo 
            do site, incluindo, mas não se limitando a textos, gráficos, códigos de programação, software e bancos 
            de dados, são de propriedade exclusiva do Desenrola Direito ou foram devidamente licenciados, e estão 
            protegidos pelas leis de propriedade intelectual aplicáveis.
          </p>
          
          <h2>5. Limitação de Responsabilidade</h2>
          <p>
            O conteúdo do Desenrola Direito é fornecido apenas para fins informativos e educacionais. Não constitui 
            aconselhamento jurídico e não deve ser considerado como tal. A consulta com um advogado é recomendada para 
            orientação específica sobre sua situação individual.
          </p>
          <p>
            O Desenrola Direito não se responsabiliza por quaisquer danos, diretos ou indiretos, que possam resultar 
            do uso ou da incapacidade de usar as informações disponíveis no site, mesmo se tivermos sido avisados sobre 
            a possibilidade de tais danos.
          </p>
          
          <h2>6. Precisão do Conteúdo</h2>
          <p>
            Embora nos esforcemos para fornecer informações precisas e atualizadas, não garantimos a exatidão, 
            integridade ou atualidade de qualquer conteúdo. As informações podem conter erros técnicos, factuais 
            ou tipográficos, e podem estar sujeitas a alterações sem aviso prévio.
          </p>
          
          <h2>7. Links para Sites de Terceiros</h2>
          <p>
            O Desenrola Direito pode conter links para sites de terceiros que não são de propriedade ou controlados 
            por nós. Não temos controle sobre, e não assumimos responsabilidade pelo conteúdo, políticas de privacidade 
            ou práticas de quaisquer sites de terceiros. A inclusão de qualquer link não implica endosso por parte do 
            Desenrola Direito.
          </p>
          
          <h2>8. Calculadoras e Ferramentas</h2>
          <p>
            As calculadoras e outras ferramentas interativas disponíveis no Desenrola Direito são fornecidas apenas 
            para fins informativos e educacionais. Os resultados gerados são aproximados e baseados nos dados fornecidos 
            pelo usuário e em fórmulas simplificadas. Não garantimos a precisão dos resultados para casos específicos.
          </p>
          <p>
            Estas ferramentas não substituem a análise profissional e não devem ser utilizadas como base única para 
            tomadas de decisão.
          </p>
          
          <h2>9. Publicidade</h2>
          <p>
            O Desenrola Direito pode exibir anúncios e outras informações fornecidas por terceiros, incluindo o Google AdSense. 
            Sua interação com esses anunciantes está sujeita às políticas de privacidade desses terceiros.
          </p>
          
          <h2>10. Lei Aplicável</h2>
          <p>
            Estes Termos de Uso são regidos e interpretados de acordo com as leis brasileiras. Qualquer disputa decorrente 
            destes termos será submetida à jurisdição exclusiva dos tribunais brasileiros.
          </p>
          
          <h2>11. Contato</h2>
          <p>
            Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através do e-mail: 
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