import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Database, Tag, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import KPICard from "@/components/KPICard";
import ImportExcelDialog from "@/components/ImportExcelDialog";
import { parseFipeData, calculateFipeStats, formatNumber, type FipeStats, type FipeVehicle } from "@/utils/fipeDataProcessor";
import PageLayout from "@/components/PageLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BrazilMap from "@/components/BrazilMap";

const Fipe = () => {
  const [vehicles, setVehicles] = useState<FipeVehicle[]>([]);
  const [fipeStats, setFipeStats] = useState<FipeStats>({
    totalVeiculos: 0,
    totalMarcas: 0,
    veiculosAceitos: 0,
    percentualAceitos: 0
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filters
  const [selectedMarca, setSelectedMarca] = useState<string>("all");
  const [selectedModelo, setSelectedModelo] = useState<string>("all");
  const [selectedAnoModelo, setSelectedAnoModelo] = useState<string>("all");
  const [selectedCombustivel, setSelectedCombustivel] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // Load FIPE data on mount
  useEffect(() => {
    const loadFipeData = async () => {
      try {
        const response = await fetch('/fipe-data.txt');
        const text = await response.text();
        const loadedVehicles = parseFipeData(text);
        setVehicles(loadedVehicles);
        const stats = calculateFipeStats(loadedVehicles);
        setFipeStats(stats);
      } catch (error) {
        console.error('Error loading FIPE data:', error);
      }
    };

    loadFipeData();
  }, []);

  // Get unique values for filters
  const marcas = useMemo(() => {
    const unique = [...new Set(vehicles.map(v => v.Marca))].filter(Boolean).sort();
    return unique;
  }, [vehicles]);

  const modelos = useMemo(() => {
    let filtered = vehicles;
    if (selectedMarca !== "all") {
      filtered = filtered.filter(v => v.Marca === selectedMarca);
    }
    const unique = [...new Set(filtered.map(v => v.Modelo))].filter(Boolean).sort();
    return unique;
  }, [vehicles, selectedMarca]);

  const anosModelo = useMemo(() => {
    let filtered = vehicles;
    if (selectedMarca !== "all") {
      filtered = filtered.filter(v => v.Marca === selectedMarca);
    }
    if (selectedModelo !== "all") {
      filtered = filtered.filter(v => v.Modelo === selectedModelo);
    }
    const unique = [...new Set(filtered.map(v => v.AnoModelo))].filter(Boolean).sort((a, b) => Number(b) - Number(a));
    return unique;
  }, [vehicles, selectedMarca, selectedModelo]);

  const combustiveis = useMemo(() => {
    let filtered = vehicles;
    if (selectedMarca !== "all") {
      filtered = filtered.filter(v => v.Marca === selectedMarca);
    }
    if (selectedModelo !== "all") {
      filtered = filtered.filter(v => v.Modelo === selectedModelo);
    }
    if (selectedAnoModelo !== "all") {
      filtered = filtered.filter(v => v.AnoModelo === selectedAnoModelo);
    }
    const unique = [...new Set(filtered.map(v => v.Combustivel))].filter(Boolean).sort();
    return unique;
  }, [vehicles, selectedMarca, selectedModelo, selectedAnoModelo]);

  // Filtered vehicles for table
  const filteredVehicles = useMemo(() => {
    let filtered = vehicles;

    if (selectedState) {
      filtered = filtered.filter(v => v.UF === selectedState);
    }
    if (selectedMarca !== "all") {
      filtered = filtered.filter(v => v.Marca === selectedMarca);
    }
    if (selectedModelo !== "all") {
      filtered = filtered.filter(v => v.Modelo === selectedModelo);
    }
    if (selectedAnoModelo !== "all") {
      filtered = filtered.filter(v => v.AnoModelo === selectedAnoModelo);
    }
    if (selectedCombustivel !== "all") {
      filtered = filtered.filter(v => v.Combustivel === selectedCombustivel);
    }

    return filtered.slice(0, 100); // Limit to 100 rows for performance
  }, [vehicles, selectedState, selectedMarca, selectedModelo, selectedAnoModelo, selectedCombustivel]);

  // Reset dependent filters when parent filter changes
  const handleMarcaChange = (value: string) => {
    setSelectedMarca(value);
    setSelectedModelo("all");
    setSelectedAnoModelo("all");
    setSelectedCombustivel("all");
  };

  const handleModeloChange = (value: string) => {
    setSelectedModelo(value);
    setSelectedAnoModelo("all");
    setSelectedCombustivel("all");
  };

  const handleAnoModeloChange = (value: string) => {
    setSelectedAnoModelo(value);
    setSelectedCombustivel("all");
  };

  const handleImportFipeData = (data: any[]) => {
    try {
      const importedVehicles = data.map(row => ({
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

      setVehicles(importedVehicles);
      const stats = calculateFipeStats(importedVehicles);
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

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Marca</label>
              <Select value={selectedMarca} onValueChange={handleMarcaChange}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Todas as marcas" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  <SelectItem value="all">Todas as marcas</SelectItem>
                  {marcas.map((marca) => (
                    <SelectItem key={marca} value={marca}>
                      {marca}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Modelo</label>
              <Select value={selectedModelo} onValueChange={handleModeloChange}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Todos os modelos" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  <SelectItem value="all">Todos os modelos</SelectItem>
                  {modelos.map((modelo) => (
                    <SelectItem key={modelo} value={modelo}>
                      {modelo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Ano Modelo</label>
              <Select value={selectedAnoModelo} onValueChange={handleAnoModeloChange}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Todos os anos" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  <SelectItem value="all">Todos os anos</SelectItem>
                  {anosModelo.map((ano) => (
                    <SelectItem key={ano} value={ano}>
                      {ano}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Combustível</label>
              <Select value={selectedCombustivel} onValueChange={setSelectedCombustivel}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Todos os combustíveis" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  <SelectItem value="all">Todos os combustíveis</SelectItem>
                  {combustiveis.map((combustivel) => (
                    <SelectItem key={combustivel} value={combustivel}>
                      {combustivel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map and Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Brazil Map */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Filtrar por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <BrazilMap 
              selectedState={selectedState} 
              onStateSelect={setSelectedState} 
            />
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">
              Veículos FIPE
              {selectedState && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  - Estado: {selectedState}
                </span>
              )}
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({filteredVehicles.length} {filteredVehicles.length === 100 ? "+" : ""} registros)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-auto max-h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="sticky top-0 bg-muted">Marca</TableHead>
                    <TableHead className="sticky top-0 bg-muted">Modelo</TableHead>
                    <TableHead className="sticky top-0 bg-muted">Ano Modelo</TableHead>
                    <TableHead className="sticky top-0 bg-muted">Combustível</TableHead>
                    <TableHead className="sticky top-0 bg-muted text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle, index) => (
                      <TableRow key={`${vehicle.CodigoFipe}-${index}`}>
                        <TableCell className="font-medium">{vehicle.Marca}</TableCell>
                        <TableCell>{vehicle.Modelo}</TableCell>
                        <TableCell>{vehicle.AnoModelo}</TableCell>
                        <TableCell>{vehicle.Combustivel}</TableCell>
                        <TableCell className="text-right">{vehicle.Valor}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        Nenhum veículo encontrado com os filtros selecionados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
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
