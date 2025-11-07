import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, Car, Shield, Plus, Eye } from "lucide-react";
import KPICard from "@/components/KPICard";
import AssociadosChart from "@/components/AssociadosChart";
import VeiculosProtegidosChart from "@/components/VeiculosProtegidosChart";
import { useToast } from "@/hooks/use-toast";

const sampleData = [
  { id: "001", nome: "João Silva", cpf: "123.456.789-00", email: "joao.silva@email.com", telefone: "(11) 98765-4321", veiculos: 2, status: "Ativo" },
  { id: "002", nome: "Maria Santos", cpf: "987.654.321-00", email: "maria.santos@email.com", telefone: "(11) 91234-5678", veiculos: 1, status: "Ativo" },
  { id: "003", nome: "Pedro Costa", cpf: "456.789.123-00", email: "pedro.costa@email.com", telefone: "(11) 99876-5432", veiculos: 3, status: "Pendente" },
];

const Associados = () => {
  const { toast } = useToast();

  const handleNovoAssociado = () => {
    toast({
      title: "Novo Associado",
      description: "Funcionalidade será implementada",
    });
  };

  const handleVerDetalhes = (nome: string) => {
    toast({
      title: "Ver Detalhes",
      description: `Visualizando detalhes de ${nome}`,
    });
  };

  return (
    <PageLayout
      title="Associados"
      description="Gestão completa de associados"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard
          icon={Users}
          value="358"
          label="Total de Associados"
          trend="+12% vs mês anterior"
          iconBgColor="bg-chart-1/10"
          iconColor="text-chart-1"
        />
        <KPICard
          icon={Car}
          value="587"
          label="Veículos Protegidos"
          trend="+8% vs mês anterior"
          iconBgColor="bg-chart-2/10"
          iconColor="text-chart-2"
        />
        <KPICard
          icon={Shield}
          value="98.5%"
          label="Taxa de Renovação"
          trend="+2.3% vs mês anterior"
          iconBgColor="bg-success/10"
          iconColor="text-success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AssociadosChart />
        <VeiculosProtegidosChart />
      </div>
      <Card className="shadow-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar associado por nome, CPF..." 
                  className="pl-10"
                />
              </div>
            </div>
            <Button onClick={handleNovoAssociado} className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Associado
            </Button>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Nome</TableHead>
                  <TableHead className="font-semibold">CPF</TableHead>
                  <TableHead className="font-semibold">E-mail</TableHead>
                  <TableHead className="font-semibold">Telefone</TableHead>
                  <TableHead className="font-semibold">Veículos</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>{row.nome}</TableCell>
                    <TableCell>{row.cpf}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.telefone}</TableCell>
                    <TableCell>
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-chart-2/10 text-chart-2">
                        {row.veiculos} {row.veiculos === 1 ? 'veículo' : 'veículos'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === "Ativo" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}>
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleVerDetalhes(row.nome)}
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

export default Associados;
