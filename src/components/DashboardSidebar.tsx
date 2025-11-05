import { BarChart3, Car, MapPin, Calendar, Calculator, FileText, Map, Printer } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: Car, label: "Veículos" },
  { icon: Car, label: "Frotas" },
  { icon: Car, label: "Proteção" },
  { icon: MapPin, label: "Localização" },
  { icon: Calendar, label: "Agenda" },
  { icon: Calculator, label: "Calculadora" },
  { icon: FileText, label: "Relatórios" },
  { icon: Map, label: "Mapas" },
  { icon: Printer, label: "Impressão" },
];

const DashboardSidebar = () => {
  return (
    <aside className="bg-sidebar w-20 min-h-screen shadow-elevated flex flex-col items-center py-6 gap-4">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200",
            item.active
              ? "bg-primary text-primary-foreground shadow-lg"
              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
          title={item.label}
        >
          <item.icon className="w-6 h-6" />
        </button>
      ))}
    </aside>
  );
};

export default DashboardSidebar;
