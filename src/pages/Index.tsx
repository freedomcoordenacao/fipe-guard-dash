import KPICard from "@/components/KPICard";
import ContractsChart from "@/components/ContractsChart";
import RevenueChart from "@/components/RevenueChart";
import RecentContractsTable from "@/components/RecentContractsTable";
import { Users, Car, FileText, AlertCircle, Database, Tag, CheckCircle } from "lucide-react";

const Index = () => {
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
              value="45.892"
              label="Veículos Tabela FIPE"
              trend="Base atualizada"
              iconBgColor="bg-chart-2/10"
              iconColor="text-chart-2"
            />
            <KPICard
              icon={Tag}
              value="87"
              label="Total de Marcas"
              trend="Nacionais e importadas"
              iconBgColor="bg-chart-3/10"
              iconColor="text-chart-3"
            />
            <KPICard
              icon={CheckCircle}
              value="12.543"
              label="Veículos Aceitos"
              trend="27% da tabela FIPE"
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
