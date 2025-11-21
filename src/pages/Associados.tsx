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
import { useState } from "react";
import AssociadoFormDialog from "@/components/AssociadoFormDialog";

const sampleData = [
  { id: "001", nome: "João Silva", cpf: "123.456.789-00", email: "joao.silva@email.com", telefone: "(11) 98765-4321", veiculos: 2, status: "Ativo" },
  { id: "002", nome: "Maria Santos", cpf: "987.654.321-00", email: "maria.santos@email.com", telefone: "(11) 91234-5678", veiculos: 1, status: "Ativo" },
  { id: "003", nome: "Pedro Costa", cpf: "456.789.123-00", email: "pedro.costa@email.com", telefone: "(11) 99876-5432", veiculos: 3, status: "Pendente" },
];

const Associados = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleNovoAssociado = (data: any) => {
    console.log("Novo associado:", data);
    toast({
      title: "Associado cadastrado",
      description: "Associado cadastrado com sucesso",
    });
  };

  const handleVerDetalhes = (nome: string) => {
    toast({
      title: "Ver Detalhes",
      description: `Visualizando detalhes de ${nome}`,
    });
  };

  const handleImportData = (data: any[]) => {
    console.log("Dados de associados importados:", data);
    toast({
      title: "Importação concluída",
      description: `${data.length} associado(s) importado(s) com sucesso`,
    });
  };

  return (
    <PageLayout
      title="Associados"
      description="Gestão completa de associados"
      onImportData={handleImportData}
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={() => setDialogOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Associado
          </Button>
        </div>
        
        <AssociadoFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleNovoAssociado}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AssociadosChart />
          <VeiculosProtegidosChart />
        </div>

        <Card className="shadow-card">
          <div className="p-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar associado por nome, CPF..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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
                {sampleData
                  .filter((row) => {
                    const search = searchTerm.toLowerCase();
                    return (
                      row.nome.toLowerCase().includes(search) ||
                      row.cpf.includes(search) ||
                      row.email.toLowerCase().includes(search) ||
                      row.status.toLowerCase().includes(search)
                    );
                  })
                  .map((row) => (
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
      </div>
    </PageLayout>
  );
};

export default Associados;
