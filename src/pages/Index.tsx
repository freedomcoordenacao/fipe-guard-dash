import { useEffect, useState } from "react";
import KPICard from "@/components/KPICard";
import ContractsChart from "@/components/ContractsChart";
import RevenueChart from "@/components/RevenueChart";
import ExpensesChart from "@/components/ExpensesChart";
import AssociadosChart from "@/components/AssociadosChart";
import VeiculosProtegidosChart from "@/components/VeiculosProtegidosChart";
import ContratosStatusChart from "@/components/ContratosStatusChart";
import SinistrosStatusChart from "@/components/SinistrosStatusChart";
import ImportExcelDialog from "@/components/ImportExcelDialog";
import { Button } from "@/components/ui/button";
import { Users, Car, FileText, AlertCircle, Database, Tag, CheckCircle, Upload } from "lucide-react";
import { parseFipeData, calculateFipeStats, formatNumber, FipeStats, FipeVehicle } from "@/utils/fipeDataProcessor";
import { toast } from "sonner";

const Index = () => {
  const [fipeStats, setFipeStats] = useState<FipeStats>({
    totalVeiculos: 0,
    totalMarcas: 0,
    veiculosAceitos: 0,
    percentualAceitos: 0
  });
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  useEffect(() => {
    // Load and process FIPE data
    fetch('/fipe-data.txt')
      .then(res => res.text())
      .then(data => {
        const vehicles = parseFipeData(data);
        const stats = calculateFipeStats(vehicles);
        setFipeStats(stats);
      })
      .catch(err => console.error('Error loading FIPE data:', err));
  }, []);

  const handleImportFipeData = (data: any[]) => {
    try {
      // Map Excel data to FipeVehicle format
      const vehicles: FipeVehicle[] = data.map(row => ({
        codigoTabelaReferencia: row.codigoTabelaReferencia || '',
        codigoTipoVeiculo: row.codigoTipoVeiculo || '',
        TipoVeiculo: row.TipoVeiculo || '',
        codigoMarca: row.codigoMarca || '',
        Marca: row.Marca || '',
        codigoModelo: row.codigoModelo || '',
        Modelo: row.Modelo || '',
        AnoModelo: row.AnoModelo || '',
        Combustivel: row.Combustivel || '',
        CodigoFipe: row.CodigoFipe || '',
        Valor: row.Valor || '',
        Aceito: row['Aceito?'] || row.Aceito || '',
        RB: row.RB || '',
        ValeParaPerdaTotal: row['Vale para perda total'] || row.ValeParaPerdaTotal || '',
        ValePraQualquerBatida: row['Vale pra qualquer batida'] || row.ValePraQualquerBatida || '',
        ValorDaFranquia: row['Valor da Franquia:'] || row.ValorDaFranquia || '',
        DanosMateriais: row['Danos materiais a terceiros: 100k'] || row.DanosMateriais || '',
        ValorProtecao: row['Valor Proteção'] || row.ValorProtecao || '',
        UF: row.UF || '',
        MES: row['MÊS'] || row.MES || ''
      }));

      const stats = calculateFipeStats(vehicles);
      setFipeStats(stats);
      setIsImportDialogOpen(false);
      toast.success(`Dados FIPE importados com sucesso! ${formatNumber(stats.totalVeiculos)} veículos processados.`);
    } catch (error) {
      console.error('Error importing FIPE data:', error);
      toast.error('Erro ao importar dados FIPE. Verifique o formato do arquivo.');
    }
  };
  return (
    <main className="container mx-auto px-6 py-8">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Visão geral da sua operação de proteção veicular</p>
            </div>
            <Button 
              onClick={() => setIsImportDialogOpen(true)}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              Importar Dados FIPE
            </Button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard
              icon={Users}
              value="1.284"
              label="Total de Associados"
              trend="+12,5% vs mês anterior"
              iconBgColor="bg-chart-1/10"
              iconColor="text-chart-1"
            />
            <KPICard
              icon={Car}
              value="1.432"
              label="Veículos Protegidos"
              trend="+8,2% vs mês anterior"
              iconBgColor="bg-success/10"
              iconColor="text-success"
            />
            <KPICard
              icon={FileText}
              value="1.265"
              label="Contratos Ativos"
              trend="+15,3% vs mês anterior"
              iconBgColor="bg-chart-1/10"
              iconColor="text-chart-1"
            />
            <KPICard
              icon={AlertCircle}
              value="23"
              label="Sinistros Pendentes"
              trend="+3,8% vs mês anterior"
              iconBgColor="bg-warning/10"
              iconColor="text-warning"
            />
          </div>

          {/* FIPE Data KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <KPICard
              icon={Database}
              value={formatNumber(fipeStats.totalVeiculos)}
              label="Veículos Tabela FIPE"
              trend="Base atualizada"
              iconBgColor="bg-chart-2/10"
              iconColor="text-chart-2"
            />
            <KPICard
              icon={Tag}
              value={formatNumber(fipeStats.totalMarcas)}
              label="Total de Marcas"
              trend="Nacionais e importadas"
              iconBgColor="bg-chart-3/10"
              iconColor="text-chart-3"
            />
            <KPICard
              icon={CheckCircle}
              value={formatNumber(fipeStats.veiculosAceitos)}
              label="Veículos Aceitos"
              trend={`${fipeStats.percentualAceitos}% da tabela FIPE`}
              iconBgColor="bg-success/10"
              iconColor="text-success"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ContractsChart />
            <RevenueChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ExpensesChart />
            <AssociadosChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <VeiculosProtegidosChart />
            <ContratosStatusChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SinistrosStatusChart />
          </div>

          <ImportExcelDialog
            open={isImportDialogOpen}
            onOpenChange={setIsImportDialogOpen}
            onImport={handleImportFipeData}
            title="Importar Dados da Tabela FIPE"
            description="Selecione um arquivo Excel (.xlsx) ou CSV com os dados da Tabela FIPE. As colunas esperadas são: Modelo, Marca, Aceito?, etc."
          />
    </main>
  );
};

export default Index;
