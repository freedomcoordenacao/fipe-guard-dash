import { useEffect, useState } from "react";
import KPICard from "@/components/KPICard";
import ContractsChart from "@/components/ContractsChart";
import RevenueChart from "@/components/RevenueChart";
import RecentContractsTable from "@/components/RecentContractsTable";
import { Users, Car, FileText, AlertCircle, Database, Tag, CheckCircle } from "lucide-react";
import { parseFipeData, calculateFipeStats, formatNumber, FipeStats } from "@/utils/fipeDataProcessor";

const Index = () => {
  const [fipeStats, setFipeStats] = useState<FipeStats>({
    totalVeiculos: 0,
    totalMarcas: 0,
    veiculosAceitos: 0,
    percentualAceitos: 0
  });

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
  return (
    <main className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Visão geral da sua operação de proteção veicular</p>
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

      {/* Recent Contracts Table */}
      <RecentContractsTable />
    </main>
  );
};

export default Index;
