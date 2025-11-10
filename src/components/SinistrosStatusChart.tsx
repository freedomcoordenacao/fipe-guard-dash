import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Em Análise", value: 8, color: "hsl(var(--chart-1))" },
  { name: "Aprovado", value: 15, color: "hsl(var(--success))" },
  { name: "Pendente", value: 5, color: "hsl(var(--warning))" },
  { name: "Rejeitado", value: 2, color: "hsl(var(--destructive))" },
];

const SinistrosStatusChart = () => {
  return (
    <Card className="shadow-card">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Status dos Sinistros</h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
              formatter={(value: number) => [value, 'Sinistros']}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SinistrosStatusChart;
