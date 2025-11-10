import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { tipo: "Colisão", quantidade: 12, valor: 65000 },
  { tipo: "Roubo", quantidade: 8, valor: 720000 },
  { tipo: "Danos Terceiros", quantidade: 6, valor: 28000 },
  { tipo: "Incêndio", quantidade: 2, valor: 180000 },
  { tipo: "Outros", quantidade: 2, valor: 15000 },
];

const SinistrosTipoChart = () => {
  return (
    <Card className="shadow-card">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Sinistros por Tipo</h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="tipo" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
              formatter={(value: number, name: string) => {
                if (name === 'quantidade') return [value, 'Quantidade'];
                return [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor Total'];
              }}
            />
            <Bar dataKey="quantidade" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SinistrosTipoChart;
