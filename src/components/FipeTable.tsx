import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileSpreadsheet, Filter, Download, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const sampleData = [
  { marca: "ZONTES", modelo: "V 310", ano: "32000", valor: "R$ 30.190" },
  { marca: "ZONTES", modelo: "V 350", ano: "2025", valor: "R$ 30.612" },
  { marca: "ZONTES", modelo: "V 350", ano: "32000", valor: "R$ 34.000" },
  { marca: "ZEEKR", modelo: "001 Flagship (Elétrico)", ano: "2025", valor: "R$ 415.690" },
  { marca: "ZEEKR", modelo: "001 Flagship (Elétrico)", ano: "32000", valor: "R$ 502.487" },
  { marca: "ZEEKR", modelo: "001 Premium (Elétrico)", ano: "2025", valor: "R$ 379.647" },
  { marca: "ZEEKR", modelo: "001 Premium (Elétrico)", ano: "32000", valor: "R$ 430.100" },
  { marca: "ZEEKR", modelo: "X Flagship (Elétrico)", ano: "2025", valor: "R$ 293.820" },
  { marca: "ZEEKR", modelo: "X Flagship (Elétrico)", ano: "32000", valor: "R$ 335.794" },
  { marca: "ZEEKR", modelo: "X Premium (Elétrico)", ano: "2025", valor: "R$ 244.309" },
];

const FipeTable = () => {
  const total = "R$ 7.660.745.620";

  return (
    <Card className="shadow-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileSpreadsheet className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Tabela FIPE - Nacional</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Marca</TableHead>
                <TableHead className="font-semibold">Modelo</TableHead>
                <TableHead className="font-semibold">Ano</TableHead>
                <TableHead className="font-semibold text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.map((row, index) => (
                <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{row.marca}</TableCell>
                  <TableCell>{row.modelo}</TableCell>
                  <TableCell>{row.ano}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">{row.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-between items-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">Mostrando 10 de 49.240 registros</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Total:</span>
            <span className="text-lg font-bold text-primary">{total}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FipeTable;
