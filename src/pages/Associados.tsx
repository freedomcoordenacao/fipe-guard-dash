import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const sampleData = [
  { id: "001", nome: "João Silva", cpf: "123.456.789-00", telefone: "(11) 98765-4321", status: "Ativo" },
  { id: "002", nome: "Maria Santos", cpf: "987.654.321-00", telefone: "(11) 91234-5678", status: "Ativo" },
  { id: "003", nome: "Pedro Costa", cpf: "456.789.123-00", telefone: "(11) 99876-5432", status: "Pendente" },
];

const Associados = () => {
  return (
    <PageLayout
      title="Associados"
      description="Gestão completa de associados"
    >
      <Card className="shadow-card">
        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar associado por nome, CPF..." 
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Nome</TableHead>
                  <TableHead className="font-semibold">CPF</TableHead>
                  <TableHead className="font-semibold">Telefone</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>{row.nome}</TableCell>
                    <TableCell>{row.cpf}</TableCell>
                    <TableCell>{row.telefone}</TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === "Ativo" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}>
                        {row.status}
                      </span>
                    </TableCell>
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

export default Associados;
