import { BarChart3, Users, Car, FileText, AlertCircle, DollarSign, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const mainMenuItems = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: Users, label: "Associados" },
  { icon: Car, label: "Veículos" },
  { icon: FileText, label: "Contratos" },
  { icon: AlertCircle, label: "Sinistros" },
  { icon: DollarSign, label: "Financeiro" },
];

const systemMenuItems = [
  { icon: Settings, label: "Configurações" },
];

const DashboardSidebar = () => {
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
          {mainMenuItems.map((item, index) => (
            <button
              key={index}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left",
                item.active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
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
          {systemMenuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
