import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import RankingFunnel from "@/components/RankingFunnel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for rankings - replace with real data later
const mockRankingData = (names: string[]) => 
  names.map((name, index) => ({
    position: index + 1,
    name,
    value: Math.floor(Math.random() * 10000) + 1000,
    percentage: Math.floor(Math.random() * 30) + 5,
  })).sort((a, b) => b.value - a.value).map((item, index) => ({ ...item, position: index + 1 }));

const veiculosPopulares = [
  "Toyota Corolla", "Fiat Strada", "Chevrolet Onix", "Hyundai HB20", 
  "Volkswagen Gol", "Jeep Compass", "Volkswagen T-Cross", "Fiat Argo",
  "Chevrolet Tracker", "Honda HR-V"
];

const Ranking = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  // Generate years from 2015 to current year
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => (2015 + i).toString());
  
  const months = [
    { value: "all", label: "Todos os meses" },
    { value: "1", label: "Janeiro" },
    { value: "2", label: "Fevereiro" },
    { value: "3", label: "Março" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Maio" },
    { value: "6", label: "Junho" },
    { value: "7", label: "Julho" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];

  return (
    <PageLayout
      title="Rankings"
      description="Visualize os rankings de veículos por diferentes categorias"
    >
      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="vendidos-brasil" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos mais vendidos no Brasil</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 space-y-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Ano
                  </label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o ano" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedYear === currentYear.toString() && (
                  <div className="flex-1">
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Mês
                    </label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o mês" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos Mais Vendidos no Brasil"
                unit="unidades"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="segurados-brasil" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos mais segurados no Brasil</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos Mais Segurados no Brasil"
                unit="seguros"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="vendidos-parana" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos mais vendidos no Paraná</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos Mais Vendidos no Paraná"
                unit="unidades"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="segurados-parana" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos mais segurados no Paraná</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos Mais Segurados no Paraná"
                unit="seguros"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="vendidos-pj" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos mais vendidos Pessoa Jurídica</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos Mais Vendidos PJ"
                unit="unidades"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="vendidos-pf" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos mais vendidos Pessoa Física</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos Mais Vendidos PF"
                unit="unidades"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="manutencao" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos com mais manutenção</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos com Mais Manutenção"
                unit="ocorrências"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="valor-manutencao" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos com maior valor de manutenção</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos com Maior Valor de Manutenção"
                unit="R$"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="recall" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos com mais Recall</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos com Mais Recall"
                unit="recalls"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="roubados" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos mais roubados e furtados</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos Mais Roubados e Furtados"
                unit="ocorrências"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="leilao" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos que mais foram para leilão</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos Mais Leiloados"
                unit="leilões"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="genero" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos mais vendidos por gênero</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos Mais Vendidos por Gênero"
                unit="unidades"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faixa-etaria" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos mais vendidos por faixa etária</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos Mais Vendidos por Faixa Etária"
                unit="unidades"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faixa-social" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos mais vendidos por faixa social</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos Mais Vendidos por Faixa Social"
                unit="unidades"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="imovel" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <span className="text-lg font-semibold">Veículos mais vendidos com imóvel no nome</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <RankingFunnel 
                data={mockRankingData(veiculosPopulares)}
                title="Top 10 Veículos Mais Vendidos com Imóvel no Nome"
                unit="unidades"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </PageLayout>
  );
};

export default Ranking;
