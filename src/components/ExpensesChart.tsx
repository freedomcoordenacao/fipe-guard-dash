import { Card } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 98000 },
  { name: "Fev", value: 115000 },
  { name: "Mar", value: 102000 },
  { name: "Abr", value: 128000 },
  { name: "Mai", value: 118000 },
  { name: "Jun", value: 142000 },
];

const ExpensesChart = () => {
  return (
    <Card className="shadow-card">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingDown className="w-5 h-5 text-error" />
          <h3 className="text-lg font-semibold text-foreground">Despesas Mensais (R$)</h3>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
              formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Despesas']}
            />
            <Bar 
              dataKey="value" 
              fill="hsl(var(--error))" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ExpensesChart;
