import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface KPICardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  trend?: string;
}

const KPICard = ({ icon: Icon, value, label, trend }: KPICardProps) => {
  return (
    <Card className="shadow-card hover:shadow-elevated transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          {trend && (
            <span className="text-xs text-muted-foreground">{trend}</span>
          )}
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </Card>
  );
};

export default KPICard;
