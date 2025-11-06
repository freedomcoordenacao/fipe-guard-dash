import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const sampleData = [
  { placa: "ABC-1234", marca: "Honda", modelo: "Civic", ano: "2020", fipe: "R$ 85.000", associado: "João Silva" },
  { placa: "DEF-5678", marca: "Toyota", modelo: "Corolla", ano: "2021", fipe: "R$ 92.000", associado: "Maria Santos" },
  { placa: "GHI-9012", marca: "Volkswagen", modelo: "Gol", ano: "2019", fipe: "R$ 45.000", associado: "Pedro Costa" },
];

const Veiculos = () => {
  return (
    <PageLayout
      title="Veículos"
      description="Gestão de veículos protegidos"
    >
      <Card className="shadow-card">
        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por placa, marca, modelo..." 
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Placa</TableHead>
                  <TableHead className="font-semibold">Marca</TableHead>
                  <TableHead className="font-semibold">Modelo</TableHead>
                  <TableHead className="font-semibold">Ano</TableHead>
                  <TableHead className="font-semibold">Valor FIPE</TableHead>
                  <TableHead className="font-semibold">Associado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.map((row) => (
                  <TableRow key={row.placa} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{row.placa}</TableCell>
                    <TableCell>{row.marca}</TableCell>
                    <TableCell>{row.modelo}</TableCell>
                    <TableCell>{row.ano}</TableCell>
                    <TableCell className="text-primary font-semibold">{row.fipe}</TableCell>
                    <TableCell>{row.associado}</TableCell>
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

export default Veiculos;
