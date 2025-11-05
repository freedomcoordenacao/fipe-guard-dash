import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import KPICard from "@/components/KPICard";
import ProtectionChart from "@/components/ProtectionChart";
import FipeTable from "@/components/FipeTable";
import FilterPanel from "@/components/FilterPanel";
import { Car, Tag, Shield, Wrench, DollarSign } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1">
        <DashboardHeader />
        
        <main className="container mx-auto px-6 py-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <KPICard
              icon={Car}
              value="49,24 Mil"
              label="# Automóveis"
            />
            <KPICard
              icon={Tag}
              value="211"
              label="# Marcas"
            />
            <KPICard
              icon={Shield}
              value="R$ 8,38 Mi"
              label="R$ Soma de Valor Proteção"
            />
            <KPICard
              icon={Wrench}
              value="R$ 99,44 Mi"
              label="R$ Soma de Valor da Franquia"
            />
            <KPICard
              icon={DollarSign}
              value="R$ 7,66 Bi"
              label="Soma de Valor FIPE"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Chart */}
            <div className="lg:col-span-1">
              <ProtectionChart />
            </div>

            {/* Middle Column - Table */}
            <div className="lg:col-span-1">
              <FipeTable />
            </div>

            {/* Right Column - Filters */}
            <div className="lg:col-span-1">
              <FilterPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
