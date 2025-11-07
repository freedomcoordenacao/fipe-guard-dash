import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 245 },
  { name: "Fev", value: 268 },
  { name: "Mar", value: 289 },
  { name: "Abr", value: 312 },
  { name: "Mai", value: 335 },
  { name: "Jun", value: 358 },
];

const AssociadosChart = () => {
  return (
    <Card className="shadow-card">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-chart-1" />
          <h3 className="text-lg font-semibold text-foreground">Evolução de Associados</h3>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
              formatter={(value: number) => [value, 'Associados']}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AssociadosChart;
