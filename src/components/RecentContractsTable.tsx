import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const recentContracts = [
  { associado: "João Silva", veiculo: "Honda Civic 2020", status: "Ativo", data: "15/06/2024" },
  { associado: "Maria Santos", veiculo: "Toyota Corolla 2021", status: "Ativo", data: "14/06/2024" },
  { associado: "Pedro Costa", veiculo: "Volkswagen Gol 2019", status: "Pendente", data: "13/06/2024" },
  { associado: "Ana Paula", veiculo: "Chevrolet Onix 2022", status: "Ativo", data: "12/06/2024" },
  { associado: "Carlos Oliveira", veiculo: "Fiat Argo 2020", status: "Ativo", data: "11/06/2024" },
];

const RecentContractsTable = () => {
  return (
    <Card className="shadow-card">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Contratos Recentes</h3>
        
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Associado</TableHead>
                <TableHead className="font-semibold">Veículo</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentContracts.map((contract, index) => (
                <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{contract.associado}</TableCell>
                  <TableCell className="text-muted-foreground">{contract.veiculo}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={contract.status === "Ativo" ? "default" : "secondary"}
                      className={contract.status === "Ativo" ? "bg-success text-white hover:bg-success/90" : ""}
                    >
                      {contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{contract.data}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};

export default RecentContractsTable;
