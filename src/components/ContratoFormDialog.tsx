import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contratoSchema = z.object({
  numero: z.string().min(5, "Número do contrato obrigatório"),
  associado: z.string().min(3, "Nome do associado obrigatório"),
  veiculo: z.string().min(3, "Veículo obrigatório"),
  valor: z.string().min(1, "Valor mensal obrigatório"),
  vencimento: z.string().min(8, "Data de vencimento obrigatória"),
});

type ContratoFormData = z.infer<typeof contratoSchema>;

interface ContratoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ContratoFormData) => void;
}

export default function ContratoFormDialog({ open, onOpenChange, onSubmit }: ContratoFormDialogProps) {
  const form = useForm<ContratoFormData>({
    resolver: zodResolver(contratoSchema),
    defaultValues: {
      numero: "",
      associado: "",
      veiculo: "",
      valor: "",
      vencimento: "",
    },
  });

  const handleSubmit = (data: ContratoFormData) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo Contrato</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do Contrato</FormLabel>
                  <FormControl>
                    <Input placeholder="CT-2024-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="associado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Associado</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do associado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="veiculo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Veículo</FormLabel>
                  <FormControl>
                    <Input placeholder="Honda Civic 2020" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="valor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Mensal</FormLabel>
                  <FormControl>
                    <Input placeholder="R$ 250,00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vencimento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vencimento</FormLabel>
                  <FormControl>
                    <Input placeholder="15/07/2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Cadastrar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
