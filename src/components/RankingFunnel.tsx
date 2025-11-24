import { Card } from "@/components/ui/card";
import { Trophy, Medal } from "lucide-react";

interface RankingItem {
  position: number;
  name: string;
  value: number;
  percentage?: number;
}

interface RankingFunnelProps {
  data: RankingItem[];
  title: string;
  unit?: string;
}

const RankingFunnel = ({ data, title, unit = "" }: RankingFunnelProps) => {
  // Calculate width for each level based on value
  const maxValue = Math.max(...data.map(item => item.value));
  
  const getWidthPercentage = (value: number) => {
    return Math.max((value / maxValue) * 100, 20); // Minimum 20% width
  };

  const getPositionIcon = (position: number) => {
    if (position === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (position === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (position === 3) return <Medal className="w-5 h-5 text-orange-600" />;
    return null;
  };

  const getPositionColor = (position: number) => {
    if (position <= 3) return "bg-primary/10 border-primary/30";
    if (position <= 6) return "bg-chart-2/10 border-chart-2/30";
    return "bg-muted border-border";
  };

  return (
    <Card className="p-6 shadow-card">
      <h4 className="text-sm font-semibold text-muted-foreground mb-6 text-center">
        {title}
      </h4>
      
      <div className="space-y-3">
        {data.slice(0, 10).map((item) => {
          const width = getWidthPercentage(item.value);
          
          return (
            <div
              key={item.position}
              className="flex items-center gap-3 animate-fade-in"
              style={{ animationDelay: `${item.position * 50}ms` }}
            >
              {/* Position number */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm flex-shrink-0">
                {item.position}
              </div>

              {/* Funnel bar */}
              <div className="flex-1 relative">
                <div
                  className={`h-12 rounded-lg border-2 transition-all duration-500 flex items-center justify-between px-4 ${getPositionColor(item.position)}`}
                  style={{ width: `${width}%` }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {getPositionIcon(item.position)}
                    <span className="text-sm font-medium text-foreground truncate">
                      {item.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-sm font-bold text-foreground">
                      {item.value.toLocaleString('pt-BR')} {unit}
                    </span>
                    {item.percentage && (
                      <span className="text-xs text-muted-foreground">
                        ({item.percentage}%)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RankingFunnel;
