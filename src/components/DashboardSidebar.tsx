import { BarChart3, Users, Car, FileText, AlertCircle, DollarSign, Settings, TrendingUp, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const mainMenuItems = [
  { icon: BarChart3, label: "Dashboard", path: "/" },
  { icon: TrendingUp, label: "Ranking", path: "/ranking" },
  { icon: Users, label: "Associados", path: "/associados" },
  { icon: Car, label: "Veículos", path: "/veiculos" },
  { icon: FileText, label: "Contratos", path: "/contratos" },
  { icon: AlertCircle, label: "Sinistros", path: "/sinistros" },
  { icon: DollarSign, label: "Financeiro", path: "/financeiro" },
  { icon: Database, label: "FIPE", path: "/fipe" },
];

const systemMenuItems = [
  { icon: Settings, label: "Configurações", path: "/configuracoes" },
];

const DashboardSidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="bg-sidebar w-64 min-h-screen shadow-elevated flex flex-col py-6">
      {/* Logo */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Car className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-sidebar-foreground">Proteção</h2>
            <p className="text-xs text-sidebar-foreground/70">Veicular</p>
          </div>
        </div>
      </div>

      {/* Menu Principal */}
      <div className="flex-1">
        <div className="px-4 mb-2">
          <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-2">
            Menu Principal
          </h3>
        </div>
        <nav className="space-y-1 px-4">
          {mainMenuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sistema */}
      <div className="mt-auto">
        <div className="px-4 mb-2">
          <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-2">
            Sistema
          </h3>
        </div>
        <nav className="space-y-1 px-4">
          {systemMenuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
