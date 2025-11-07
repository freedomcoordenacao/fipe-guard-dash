import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Car, Shield, AlertTriangle, Plus } from "lucide-react";
import KPICard from "@/components/KPICard";
import VeiculosProtegidosChart from "@/components/VeiculosProtegidosChart";
import { useToast } from "@/hooks/use-toast";

const sampleData = [
  { placa: "ABC-1234", marca: "Honda", modelo: "Civic", ano: "2020", fipe: "R$ 85.000", associado: "João Silva", status: "Ativo" },
  { placa: "DEF-5678", marca: "Toyota", modelo: "Corolla", ano: "2021", fipe: "R$ 92.000", associado: "Maria Santos", status: "Ativo" },
  { placa: "GHI-9012", marca: "Volkswagen", modelo: "Gol", ano: "2019", fipe: "R$ 45.000", associado: "Pedro Costa", status: "Pendente" },
];

const Veiculos = () => {
  const { toast } = useToast();

  const handleNovoVeiculo = () => {
    toast({
      title: "Novo Veículo",
      description: "Funcionalidade de cadastro será implementada",
    });
  };

  const handleVerDetalhes = (placa: string) => {
    toast({
      title: "Detalhes do Veículo",
      description: `Visualizando detalhes do veículo ${placa}`,
    });
  };

  return (
    <PageLayout
      title="Veículos"
      description="Gestão de veículos protegidos"
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={handleNovoVeiculo} className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Veículo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            icon={Car}
            value="358"
            label="Total de Veículos"
            trend="+12% este mês"
            iconBgColor="bg-chart-2/10"
            iconColor="text-chart-2"
          />
          <KPICard
            icon={Shield}
            value="335"
            label="Veículos Ativos"
            iconBgColor="bg-success/10"
            iconColor="text-success"
          />
          <KPICard
            icon={AlertTriangle}
            value="23"
            label="Pendentes"
            iconBgColor="bg-warning/10"
            iconColor="text-warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VeiculosProtegidosChart />
          <Card className="shadow-card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Distribuição por Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <span className="text-sm text-muted-foreground">Ativos</span>
                  </div>
                  <span className="text-sm font-semibold">93.6%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-warning"></div>
                    <span className="text-sm text-muted-foreground">Pendentes</span>
                  </div>
                  <span className="text-sm font-semibold">6.4%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="shadow-card">
          <div className="p-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por placa, marca, modelo..." 
                  className="pl-10"
                />
              </div>
            </div>

            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Placa</TableHead>
                    <TableHead className="font-semibold">Marca</TableHead>
                    <TableHead className="font-semibold">Modelo</TableHead>
                    <TableHead className="font-semibold">Ano</TableHead>
                    <TableHead className="font-semibold">Valor FIPE</TableHead>
                    <TableHead className="font-semibold">Associado</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleData.map((row) => (
                    <TableRow key={row.placa} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{row.placa}</TableCell>
                      <TableCell>{row.marca}</TableCell>
                      <TableCell>{row.modelo}</TableCell>
                      <TableCell>{row.ano}</TableCell>
                      <TableCell className="text-primary font-semibold">{row.fipe}</TableCell>
                      <TableCell>{row.associado}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={row.status === "Ativo" ? "default" : "secondary"}
                          className={row.status === "Ativo" ? "bg-success/10 text-success hover:bg-success/20" : ""}
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleVerDetalhes(row.placa)}
                        >
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Veiculos;
