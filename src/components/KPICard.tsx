import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface KPICardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  trend?: string;
  iconBgColor?: string;
  iconColor?: string;
}

const KPICard = ({ icon: Icon, value, label, trend, iconBgColor = "bg-primary/10", iconColor = "text-primary" }: KPICardProps) => {
  return (
    <Card className="shadow-card hover:shadow-elevated transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 ${iconBgColor} rounded-lg`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-foreground mb-2">{value}</h3>
        <p className="text-sm text-muted-foreground mb-2">{label}</p>
        {trend && (
          <p className="text-xs font-medium text-success">{trend}</p>
        )}
      </div>
    </Card>
  );
};

export default KPICard;
