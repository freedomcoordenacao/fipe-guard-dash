import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Plus, Eye, AlertTriangle, CheckCircle, FileText } from "lucide-react";
import KPICard from "@/components/KPICard";
import SinistrosStatusChart from "@/components/SinistrosStatusChart";
import SinistrosTipoChart from "@/components/SinistrosTipoChart";
import { useToast } from "@/hooks/use-toast";

const sampleData = [
  { numero: "SIN-2024-001", associado: "João Silva", veiculo: "Honda Civic 2020", tipo: "Colisão", valor: "R$ 5.500,00", status: "Em Análise", data: "10/06/2024" },
  { numero: "SIN-2024-002", associado: "Maria Santos", veiculo: "Toyota Corolla 2021", tipo: "Roubo", valor: "R$ 92.000,00", status: "Aprovado", data: "05/06/2024" },
  { numero: "SIN-2024-003", associado: "Carlos Souza", veiculo: "Fiat Argo 2020", tipo: "Danos Terceiros", valor: "R$ 3.200,00", status: "Pendente", data: "12/06/2024" },
];

const Sinistros = () => {
  const { toast } = useToast();

  const handleNewSinistro = () => {
    toast({
      title: "Novo Sinistro",
      description: "Funcionalidade será implementada",
    });
  };

  const handleViewDetails = (numero: string) => {
    toast({
      title: "Detalhes do Sinistro",
      description: `Visualizando detalhes do sinistro ${numero}`,
    });
  };

  const handleImportData = (data: any[]) => {
    console.log("Dados de sinistros importados:", data);
    toast({
      title: "Importação concluída",
      description: `${data.length} sinistro(s) importado(s) com sucesso`,
    });
  };

  return (
    <PageLayout
      title="Sinistros"
      description="Gestão de sinistros e ocorrências"
      onImportData={handleImportData}
    >
      <div className="flex justify-end mb-6">
        <Button onClick={handleNewSinistro} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Sinistro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          icon={FileText}
          value="30"
          label="Total de Sinistros"
          iconBgColor="bg-primary/10"
          iconColor="text-primary"
        />
        <KPICard
          icon={CheckCircle}
          value="15"
          label="Sinistros Aprovados"
          iconBgColor="bg-success/10"
          iconColor="text-success"
        />
        <KPICard
          icon={AlertTriangle}
          value="8"
          label="Em Análise"
          iconBgColor="bg-chart-1/10"
          iconColor="text-chart-1"
        />
        <KPICard
          icon={AlertTriangle}
          value="R$ 1.008.200,00"
          label="Valor Total"
          iconBgColor="bg-warning/10"
          iconColor="text-warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SinistrosStatusChart />
        <SinistrosTipoChart />
      </div>
      <Card className="shadow-card">
        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por número, associado, tipo..." 
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Número</TableHead>
                  <TableHead className="font-semibold">Associado</TableHead>
                  <TableHead className="font-semibold">Veículo</TableHead>
                  <TableHead className="font-semibold">Tipo</TableHead>
                  <TableHead className="font-semibold">Valor</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Data</TableHead>
                  <TableHead className="font-semibold">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.map((row) => (
                  <TableRow key={row.numero} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{row.numero}</TableCell>
                    <TableCell>{row.associado}</TableCell>
                    <TableCell>{row.veiculo}</TableCell>
                    <TableCell>{row.tipo}</TableCell>
                    <TableCell className="text-primary font-semibold">{row.valor}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={
                          row.status === "Aprovado" ? "bg-success text-white hover:bg-success/90" :
                          row.status === "Em Análise" ? "bg-chart-1 text-white hover:bg-chart-1/90" :
                          "bg-warning text-white hover:bg-warning/90"
                        }
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.data}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(row.numero)}
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
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
    </PageLayout>
  );
};

export default Sinistros;
