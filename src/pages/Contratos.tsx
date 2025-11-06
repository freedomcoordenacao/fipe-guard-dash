import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const sampleData = [
  { numero: "CT-2024-001", associado: "João Silva", veiculo: "Honda Civic 2020", valor: "R$ 250,00", status: "Ativo", vencimento: "15/07/2024" },
  { numero: "CT-2024-002", associado: "Maria Santos", veiculo: "Toyota Corolla 2021", valor: "R$ 280,00", status: "Ativo", vencimento: "20/07/2024" },
  { numero: "CT-2024-003", associado: "Pedro Costa", veiculo: "Volkswagen Gol 2019", valor: "R$ 180,00", status: "Pendente", vencimento: "10/07/2024" },
];

const Contratos = () => {
  return (
    <PageLayout
      title="Contratos"
      description="Gestão de contratos de proteção"
    >
      <Card className="shadow-card">
        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por número, associado..." 
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Número</TableHead>
                  <TableHead className="font-semibold">Associado</TableHead>
                  <TableHead className="font-semibold">Veículo</TableHead>
                  <TableHead className="font-semibold">Valor Mensal</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Vencimento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.map((row) => (
                  <TableRow key={row.numero} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{row.numero}</TableCell>
                    <TableCell>{row.associado}</TableCell>
                    <TableCell>{row.veiculo}</TableCell>
                    <TableCell className="text-primary font-semibold">{row.valor}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={row.status === "Ativo" ? "default" : "secondary"}
                        className={row.status === "Ativo" ? "bg-success text-white hover:bg-success/90" : ""}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.vencimento}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
};

export default Contratos;
