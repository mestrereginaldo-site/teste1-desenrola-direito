import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdPlaceholder from "@/components/shared/AdPlaceholder";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Calculators() {
  const { toast } = useToast();
  const [activeCalculator, setActiveCalculator] = useState("rescisao");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Calculadoras Jurídicas</h1>
          <p className="text-lg text-gray-600 mb-8">
            Utilize nossas calculadoras para estimar valores relacionados a diversas situações jurídicas.
            Estas calculadoras servem apenas como referência e não substituem a consulta com um profissional.
          </p>

          {/* Ad banner horizontal */}
          <div className="mb-8">
            <AdPlaceholder format="horizontal" className="mx-auto" />
          </div>

          <Tabs defaultValue="rescisao" className="w-full" onValueChange={setActiveCalculator}>
            <TabsList className="flex flex-col md:grid md:grid-cols-4 gap-2 md:gap-0 mb-8">
              <TabsTrigger value="rescisao" className="px-2 py-2 text-sm md:text-base">Rescisão Trabalhista</TabsTrigger>
              <TabsTrigger value="multa-transito" className="px-2 py-2 text-sm md:text-base">Multas de Trânsito</TabsTrigger>
              <TabsTrigger value="indenizacao" className="px-2 py-2 text-sm md:text-base">Indenização Moral</TabsTrigger>
              <TabsTrigger value="pensao" className="px-2 py-2 text-sm md:text-base">Pensão Alimentícia</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rescisao">
              <RescisaoCalculator />
            </TabsContent>
            
            <TabsContent value="multa-transito">
              <MultaTransitoCalculator />
            </TabsContent>
            
            <TabsContent value="indenizacao">
              <IndenizacaoCalculator />
            </TabsContent>
            
            <TabsContent value="pensao">
              <PensaoAlimenticiaCalculator />
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Aviso Importante</h3>
            <p className="text-gray-600 mb-2">
              As calculadoras fornecidas nesta página têm propósito meramente informativo e educacional. 
              Os valores apresentados são estimativas e podem não refletir com precisão o resultado de um caso real.
            </p>
            <p className="text-gray-600">
              Recomendamos sempre consultar um advogado especializado para análise detalhada da sua situação específica.
            </p>
          </div>
          
          {/* Ad banner horizontal */}
          <div className="mt-8">
            <AdPlaceholder format="horizontal" className="mx-auto" />
          </div>
        </div>
        
        {/* Coluna lateral com anúncios */}
        <div className="md:w-[300px] space-y-8 mt-8 md:mt-0">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Consulta Jurídica</h3>
            <p className="text-sm text-gray-600 mb-4">
              Precisa de assistência profissional para sua situação específica?
            </p>
            <Button 
              className="w-full" 
              onClick={() => window.location.href = "/consulta-juridica"}
            >
              Encontre um Advogado
            </Button>
          </div>
          
          <AdPlaceholder format="horizontal" />
          
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Dicas Jurídicas</h3>
            <ul className="text-sm space-y-2">
              <li>✓ Mantenha todos os documentos relevantes</li>
              <li>✓ Busque orientação especializada</li>
              <li>✓ Conheça seus direitos e deveres</li>
              <li>✓ Atenção aos prazos legais</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function RescisaoCalculator() {
  const { toast } = useToast();
  const [salario, setSalario] = useState("");
  const [tempoServicoAnos, setTempoServicoAnos] = useState("");
  const [tempoServicoMeses, setTempoServicoMeses] = useState("");
  const [avisoPrevio, setAvisoPrevio] = useState("sim");
  const [feriasVencidas, setFeriasVencidas] = useState("nao");
  const [resultado, setResultado] = useState<number | null>(null);

  const calcular = () => {
    if (!salario || !tempoServicoAnos) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const salarioNum = parseFloat(salario.replace(/[^\d,.]/g, '').replace(',', '.'));
    const anosNum = parseInt(tempoServicoAnos);
    const mesesNum = parseInt(tempoServicoMeses) || 0;
    
    // Cálculo simplificado para fins educacionais
    let total = 0;
    
    // Saldo de salário (proporcional a 15 dias)
    total += salarioNum * 0.5;
    
    // Férias proporcionais
    const mesesTotais = anosNum * 12 + mesesNum;
    total += (salarioNum / 12) * mesesTotais;
    
    // 13º proporcional
    total += (salarioNum / 12) * (new Date().getMonth() + 1);
    
    // FGTS + multa de 40%
    total += salarioNum * mesesTotais * 0.08 * 1.4;
    
    // Aviso prévio
    if (avisoPrevio === "sim") {
      total += salarioNum;
    }
    
    // Férias vencidas
    if (feriasVencidas === "sim") {
      total += salarioNum * 4/3; // Férias + 1/3
    }
    
    setResultado(total);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de Rescisão Trabalhista</CardTitle>
        <CardDescription>
          Estime o valor aproximado da sua rescisão de contrato de trabalho
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="salario">Salário Bruto Mensal (R$)</Label>
          <Input 
            id="salario" 
            placeholder="Ex: 2500,00" 
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="anos">Tempo de Serviço (Anos)</Label>
            <Input 
              id="anos" 
              placeholder="Ex: 2" 
              value={tempoServicoAnos}
              onChange={(e) => setTempoServicoAnos(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meses">Tempo de Serviço (Meses)</Label>
            <Input 
              id="meses" 
              placeholder="Ex: 6" 
              value={tempoServicoMeses}
              onChange={(e) => setTempoServicoMeses(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="aviso-previo">Cumprirá Aviso Prévio?</Label>
          <Select value={avisoPrevio} onValueChange={setAvisoPrevio}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sim">Sim</SelectItem>
              <SelectItem value="nao">Não</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ferias-vencidas">Possui Férias Vencidas?</Label>
          <Select value={feriasVencidas} onValueChange={setFeriasVencidas}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sim">Sim</SelectItem>
              <SelectItem value="nao">Não</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {resultado !== null && (
          <div className="bg-primary/10 p-4 rounded-md mt-4">
            <h4 className="font-bold text-primary mb-2">Resultado Estimado:</h4>
            <p className="text-2xl font-bold">
              R$ {resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Este é um valor aproximado. O cálculo real pode variar conforme situações específicas e legislação vigente.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={calcular} className="w-full">Calcular Rescisão</Button>
      </CardFooter>
    </Card>
  );
}

function MultaTransitoCalculator() {
  const { toast } = useToast();
  const [tipoInfracao, setTipoInfracao] = useState("");
  const [pontosCarteira, setPontosCarteira] = useState("0");
  const [reincidente, setReincidente] = useState("nao");
  const [resultado, setResultado] = useState<{valor: number, pontos: number} | null>(null);

  const calcular = () => {
    if (!tipoInfracao) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, selecione o tipo de infração.",
        variant: "destructive"
      });
      return;
    }

    let valor = 0;
    let pontos = 0;

    // Valores baseados no CTB para fins educacionais
    switch (tipoInfracao) {
      case "leve":
        valor = 88.38;
        pontos = 3;
        break;
      case "media":
        valor = 130.16;
        pontos = 4;
        break;
      case "grave":
        valor = 195.23;
        pontos = 5;
        break;
      case "gravissima":
        valor = 293.47;
        pontos = 7;
        break;
    }

    // Aumento para reincidentes
    if (reincidente === "sim") {
      valor *= 1.10; // 10% a mais
    }

    const pontosAtuais = parseInt(pontosCarteira);
    
    setResultado({
      valor,
      pontos: pontosAtuais + pontos
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de Multas de Trânsito</CardTitle>
        <CardDescription>
          Calcule o valor aproximado de multas e pontuação na CNH
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="tipo-infracao">Tipo de Infração</Label>
          <Select value={tipoInfracao} onValueChange={setTipoInfracao}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar tipo de infração..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="leve">Leve</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="grave">Grave</SelectItem>
              <SelectItem value="gravissima">Gravíssima</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pontos">Pontos Atuais na Carteira</Label>
          <Select value={pontosCarteira} onValueChange={setPontosCarteira}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar pontuação atual..." />
            </SelectTrigger>
            <SelectContent>
              {[...Array(21)].map((_, i) => (
                <SelectItem key={i} value={i.toString()}>{i} pontos</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="reincidente">Reincidente na mesma infração?</Label>
          <Select value={reincidente} onValueChange={setReincidente}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sim">Sim</SelectItem>
              <SelectItem value="nao">Não</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {resultado !== null && (
          <div className="bg-primary/10 p-4 rounded-md mt-4">
            <h4 className="font-bold text-primary mb-2">Resultado Estimado:</h4>
            <p className="text-xl font-bold">
              Valor da Multa: R$ {resultado.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="mt-2 font-semibold">
              Pontuação na CNH após infração: {resultado.pontos} pontos
            </p>
            {resultado.pontos >= 20 && (
              <p className="text-red-500 mt-2 text-sm">
                Atenção: A pontuação se aproxima ou ultrapassa o limite para suspensão da CNH (20 pontos).
              </p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              As multas podem ser reduzidas em 20% se o pagamento for realizado até a data de vencimento.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={calcular} className="w-full">Calcular Multa</Button>
      </CardFooter>
    </Card>
  );
}

function IndenizacaoCalculator() {
  const { toast } = useToast();
  const [tipoSituacao, setTipoSituacao] = useState("");
  const [gravidadeDano, setGravidadeDano] = useState(5);
  const [duracaoDano, setDuracaoDano] = useState("temporario");
  const [resultado, setResultado] = useState<{min: number, max: number} | null>(null);

  const calcular = () => {
    if (!tipoSituacao) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, selecione o tipo de situação.",
        variant: "destructive"
      });
      return;
    }

    // Valores base para cada tipo de situação (para fins educacionais)
    const valoresBase: Record<string, {min: number, max: number}> = {
      "negativacao-indevida": {min: 5000, max: 15000},
      "acidente-transito": {min: 10000, max: 50000},
      "falha-produto": {min: 3000, max: 20000},
      "demissao-injusta": {min: 5000, max: 30000},
      "erro-medico": {min: 20000, max: 100000},
    };

    let { min, max } = valoresBase[tipoSituacao];
    
    // Ajustes conforme a gravidade (1-10)
    const fatorGravidade = gravidadeDano / 5; // normaliza para que 5 seja neutro
    min *= fatorGravidade;
    max *= fatorGravidade;
    
    // Ajustes conforme duração
    if (duracaoDano === "permanente") {
      min *= 1.5;
      max *= 1.5;
    }
    
    setResultado({
      min: Math.round(min),
      max: Math.round(max)
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de Indenização por Dano Moral</CardTitle>
        <CardDescription>
          Estime valores de referência para indenizações por danos morais
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="tipo-situacao">Tipo de Situação</Label>
          <Select value={tipoSituacao} onValueChange={setTipoSituacao}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar situação..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="negativacao-indevida">Negativação indevida</SelectItem>
              <SelectItem value="acidente-transito">Acidente de trânsito</SelectItem>
              <SelectItem value="falha-produto">Falha de produto/serviço</SelectItem>
              <SelectItem value="demissao-injusta">Demissão injusta</SelectItem>
              <SelectItem value="erro-medico">Erro médico</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="gravidade">Gravidade do Dano (1-10)</Label>
            <span className="text-sm font-medium">{gravidadeDano}</span>
          </div>
          <Slider
            id="gravidade"
            min={1}
            max={10}
            step={1}
            value={[gravidadeDano]}
            onValueChange={(value) => setGravidadeDano(value[0])}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Leve</span>
            <span>Moderado</span>
            <span>Grave</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duracao">Duração do Dano</Label>
          <Select value={duracaoDano} onValueChange={setDuracaoDano}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar duração..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="temporario">Temporário</SelectItem>
              <SelectItem value="permanente">Permanente</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {resultado !== null && (
          <div className="bg-primary/10 p-4 rounded-md mt-4">
            <h4 className="font-bold text-primary mb-2">Faixa de Valores Estimados:</h4>
            <p className="text-xl font-bold">
              R$ {resultado.min.toLocaleString('pt-BR')} a R$ {resultado.max.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Esta é uma estimativa com base em jurisprudência e casos similares. 
              O valor real pode variar conforme as circunstâncias específicas e entendimento do juiz.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={calcular} className="w-full">Estimar Indenização</Button>
      </CardFooter>
    </Card>
  );
}

function PensaoAlimenticiaCalculator() {
  const { toast } = useToast();
  const [rendaMensal, setRendaMensal] = useState("");
  const [numeroFilhos, setNumeroFilhos] = useState("1");
  const [idadeFilhos, setIdadeFilhos] = useState("crianca");
  const [gastosExtraordinarios, setGastosExtraordinarios] = useState("");
  const [resultado, setResultado] = useState<{
    valor: number;
    percentual: number;
  } | null>(null);

  const calcular = () => {
    if (!rendaMensal) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, informe a renda mensal.",
        variant: "destructive"
      });
      return;
    }

    const renda = parseFloat(rendaMensal.replace(/[^\d,.]/g, '').replace(',', '.'));
    const filhos = parseInt(numeroFilhos);
    const gastos = gastosExtraordinarios ? parseFloat(gastosExtraordinarios.replace(/[^\d,.]/g, '').replace(',', '.')) : 0;
    
    // Percentual base por filho (para fins educacionais)
    let percentualBase = 15;
    
    // Ajuste por número de filhos
    if (filhos > 1) {
      // Redução do percentual individual com mais filhos
      percentualBase = Math.max(10, 30 / filhos);
    }
    
    // Ajuste por idade
    let multiplicador = 1;
    switch (idadeFilhos) {
      case "bebe":
        multiplicador = 1.2; // Bebês têm mais gastos com fraldas, etc.
        break;
      case "crianca":
        multiplicador = 1;
        break;
      case "adolescente":
        multiplicador = 1.1; // Adolescentes têm mais gastos com educação, etc.
        break;
      case "universitario":
        multiplicador = 1.3; // Universitários têm mais gastos com material, etc.
        break;
    }
    
    const percentualFinal = percentualBase * multiplicador * filhos;
    const percentualLimitado = Math.min(percentualFinal, 60); // Limite de 60%
    
    let valorPensao = (renda * percentualLimitado / 100) + (gastos / 2); // Metade dos gastos extraordinários
    
    setResultado({
      valor: valorPensao,
      percentual: percentualLimitado
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de Pensão Alimentícia</CardTitle>
        <CardDescription>
          Estime o valor de referência para pensão alimentícia
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="renda">Renda Mensal do Pagador (R$)</Label>
          <Input 
            id="renda" 
            placeholder="Ex: 3500,00" 
            value={rendaMensal}
            onChange={(e) => setRendaMensal(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="filhos">Número de Filhos</Label>
          <Select value={numeroFilhos} onValueChange={setNumeroFilhos}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar quantidade..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 filho</SelectItem>
              <SelectItem value="2">2 filhos</SelectItem>
              <SelectItem value="3">3 filhos</SelectItem>
              <SelectItem value="4">4 filhos</SelectItem>
              <SelectItem value="5">5 ou mais filhos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="idade">Faixa Etária dos Filhos</Label>
          <Select value={idadeFilhos} onValueChange={setIdadeFilhos}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar faixa etária..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bebe">Bebê (0-2 anos)</SelectItem>
              <SelectItem value="crianca">Criança (3-12 anos)</SelectItem>
              <SelectItem value="adolescente">Adolescente (13-17 anos)</SelectItem>
              <SelectItem value="universitario">Universitário (18+ anos)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gastos-extra">Gastos Extraordinários Mensais (R$)</Label>
          <Input 
            id="gastos-extra" 
            placeholder="Ex: escola particular, plano de saúde..." 
            value={gastosExtraordinarios}
            onChange={(e) => setGastosExtraordinarios(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Despesas especiais como escola particular, plano de saúde, atividades extracurriculares, etc.
          </p>
        </div>
        
        {resultado !== null && (
          <div className="bg-primary/10 p-4 rounded-md mt-4">
            <h4 className="font-bold text-primary mb-2">Valor Estimado:</h4>
            <p className="text-xl font-bold">
              R$ {resultado.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="mt-1">
              Equivalente a aproximadamente {resultado.percentual.toFixed(1)}% da renda informada.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Este cálculo é apenas uma referência baseada na jurisprudência comum. 
              O valor efetivo da pensão é determinado pelo juiz considerando as necessidades dos 
              filhos e as possibilidades do pagador.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={calcular} className="w-full">Calcular Pensão</Button>
      </CardFooter>
    </Card>
  );
}