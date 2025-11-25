import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Database, Tag, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import KPICard from "@/components/KPICard";
import ImportExcelDialog from "@/components/ImportExcelDialog";
import { parseFipeData, calculateFipeStats, formatNumber, type FipeStats } from "@/utils/fipeDataProcessor";
import PageLayout from "@/components/PageLayout";

const Fipe = () => {
  const [fipeStats, setFipeStats] = useState<FipeStats>({
    totalVeiculos: 0,
    totalMarcas: 0,
    veiculosAceitos: 0,
    percentualAceitos: 0
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load FIPE data on mount
  useEffect(() => {
    const loadFipeData = async () => {
      try {
        const response = await fetch('/fipe-data.txt');
        const text = await response.text();
        const vehicles = parseFipeData(text);
        const stats = calculateFipeStats(vehicles);
        setFipeStats(stats);
      } catch (error) {
        console.error('Error loading FIPE data:', error);
      }
    };

    loadFipeData();
  }, []);

  const handleImportFipeData = (data: any[]) => {
    try {
      // Map the imported data to FipeVehicle format
      const vehicles = data.map(row => ({
        codigoTabelaReferencia: row['codigoTabelaReferencia'] || '',
        codigoTipoVeiculo: row['codigoTipoVeiculo'] || '',
        TipoVeiculo: row['TipoVeiculo'] || '',
        codigoMarca: row['codigoMarca'] || '',
        Marca: row['Marca'] || '',
        codigoModelo: row['codigoModelo'] || '',
        Modelo: row['Modelo'] || '',
        AnoModelo: row['AnoModelo'] || '',
        Combustivel: row['Combustivel'] || '',
        CodigoFipe: row['CodigoFipe'] || '',
        Valor: row['Valor'] || '',
        Aceito: row['Aceito'] || '',
        RB: row['RB'] || '',
        ValeParaPerdaTotal: row['ValeParaPerdaTotal'] || '',
        ValePraQualquerBatida: row['ValePraQualquerBatida'] || '',
        ValorDaFranquia: row['ValorDaFranquia'] || '',
        DanosMateriais: row['DanosMateriais'] || '',
        ValorProtecao: row['ValorProtecao'] || '',
        UF: row['UF'] || '',
        MES: row['MES'] || ''
      }));

      const stats = calculateFipeStats(vehicles);
      setFipeStats(stats);
      setIsDialogOpen(false);
      toast.success(`Dados FIPE importados com sucesso! ${formatNumber(stats.totalVeiculos)} veículos processados.`);
    } catch (error) {
      console.error('Error importing FIPE data:', error);
      toast.error("Erro ao importar dados FIPE. Verifique o formato do arquivo.");
    }
  };

  return (
    <PageLayout
      title="Tabela FIPE"
      description="Visualize e gerencie os dados da Tabela FIPE"
    >
      <div className="mb-6">
        <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
          <FileSpreadsheet className="w-4 h-4" />
          Importar Dados FIPE
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
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

      <ImportExcelDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onImport={handleImportFipeData}
        title="Importar Dados da Tabela FIPE"
        description="Selecione um arquivo Excel (.xlsx) ou CSV com os dados da Tabela FIPE. As colunas obrigatórias são: Modelo, Marca e Aceito?"
        requiredColumns={['Modelo', 'Marca', 'Aceito?']}
      />
    </PageLayout>
  );
};

export default Fipe;
