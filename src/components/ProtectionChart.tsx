import { Card } from "@/components/ui/card";
import { PieChart } from "lucide-react";

const protectionData = [
  { label: "Não", value: 19730, color: "bg-error", percentage: 38 },
  { label: "Não possui", value: 16209, color: "bg-warning", percentage: 31 },
  { label: "Sim", value: 13196, color: "bg-success", percentage: 25 },
  { label: "Erro", value: 86, color: "bg-primary", percentage: 0.2 },
  { label: "Divergente", value: 16, color: "bg-chart-5", percentage: 0.03 },
];

const ProtectionChart = () => {
  return (
    <Card className="shadow-card">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <PieChart className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Proteção - Pense Perto</h3>
        </div>
        
        <div className="space-y-4">
          {protectionData.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-sm ${item.color}`} />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-primary">{item.value.toLocaleString('pt-BR')}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProtectionChart;
