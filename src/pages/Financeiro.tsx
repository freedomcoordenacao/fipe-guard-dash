import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import KPICard from "@/components/KPICard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, TrendingDown, CreditCard } from "lucide-react";
import RevenueChart from "@/components/RevenueChart";
import ExpensesChart from "@/components/ExpensesChart";
import { useToast } from "@/hooks/use-toast";

const transactionsData = [
  { data: "15/06/2024", descricao: "Mensalidade - João Silva", tipo: "Receita", valor: "R$ 250,00" },
  { data: "14/06/2024", descricao: "Sinistro - Maria Santos", tipo: "Despesa", valor: "R$ 5.500,00" },
  { data: "13/06/2024", descricao: "Mensalidade - Pedro Costa", tipo: "Receita", valor: "R$ 180,00" },
  { data: "12/06/2024", descricao: "Comissão Corretor", tipo: "Despesa", valor: "R$ 1.200,00" },
];

const Financeiro = () => {
  const { toast } = useToast();

  const handleImportData = (data: any[]) => {
    console.log("Dados financeiros importados:", data);
    toast({
      title: "Importação concluída",
      description: `${data.length} transação(ões) importada(s) com sucesso`,
    });
  };

  return (
    <PageLayout
      title="Financeiro"
      description="Gestão financeira e fluxo de caixa"
      onImportData={handleImportData}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          icon={DollarSign}
          value="R$ 328.450"
          label="Receita Mensal"
          trend="+15,3% vs mês anterior"
          iconBgColor="bg-success/10"
          iconColor="text-success"
        />
        <KPICard
          icon={TrendingDown}
          value="R$ 142.890"
          label="Despesas Mensais"
          trend="+5,2% vs mês anterior"
          iconBgColor="bg-error/10"
          iconColor="text-error"
        />
        <KPICard
          icon={TrendingUp}
          value="R$ 185.560"
          label="Lucro Líquido"
          trend="+22,8% vs mês anterior"
          iconBgColor="bg-chart-1/10"
          iconColor="text-chart-1"
        />
        <KPICard
          icon={CreditCard}
          value="R$ 45.220"
          label="A Receber"
          iconBgColor="bg-warning/10"
          iconColor="text-warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart />
        <ExpensesChart />
      </div>

      <Card className="shadow-card">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Transações Recentes</h3>
          
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Data</TableHead>
                  <TableHead className="font-semibold">Descrição</TableHead>
                  <TableHead className="font-semibold">Tipo</TableHead>
                  <TableHead className="font-semibold text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionsData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{row.data}</TableCell>
                    <TableCell>{row.descricao}</TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        row.tipo === "Receita" ? "bg-success/10 text-success" : "bg-error/10 text-error"
                      }`}>
                        {row.tipo}
                      </span>
                    </TableCell>
                    <TableCell className={`text-right font-semibold ${
                      row.tipo === "Receita" ? "text-success" : "text-error"
                    }`}>
                      {row.valor}
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

export default Financeiro;
